import { getOrder } from '../modules/vtex/orders/orders.js'
import { readdir, stat, pathResolve, renameFile, extNameFile } from '../lib/files.js';
import { openJson, removeJson } from '../lib/json.js';
import { getPromotionById } from '../modules/vtex/rates and benefits/calculatorConfiguration.js';
import { create as createCuponVTEX } from '../modules/vtex/rates and benefits/coupon.js';
import { Patch as MDpatch, Search as MDSearch } from '../modules/vtex/masterdata/index.js';
import { getProductSpecifications } from '../modules/vtex/catalog/products.js'


const executingOrder = async (order) => {
    //verifico se é pedido com giftcard e se nunca foi lido.
    if (order && order.items.find(x => x.giftCard != undefined && x.giftCard.active == true) != undefined) {
        //verifico se não está no MD
        let result = await MDSearch('PD', "orderId", `orderId=${order.orderId}`);
        if (result.length == 0) {
            return true;
        } else {
            console.log(`Order ${order.orderId} já existe no MD.`, result);
        }
    }
    return false;
}

const createOrders = async () => {
    let dirHandles = './data/handles';
    let dirOrders = './data/orders';

    readdir(dirHandles, (error, fileNames) => {
        if (error) throw error;
        fileNames.forEach((filename) => {
            const filepath = pathResolve(dirHandles, filename);
            stat(filepath, async function (error, _stat) {
                try {
                    if (error) throw error;
                    let operation = false;

                    // check if the current path is a file json
                    if (_stat.isFile() && extNameFile(filename) == ".json") {
                        const fileJson = openJson(dirHandles, filename);
                        if (fileJson) {
                            let orderId = filename.replace(".json", "");
                            let order = await mountOrder(orderId);
                            if (await executingOrder(order)) {
                                if (createOrder(order)) {
                                    renameFile(`${dirHandles}\\${filename}`, `${dirOrders}\\${filename}`, () => { });
                                    operation = true;
                                }
                            } else {
                                console.warn(`OrderId ${orderId} não aprovado.`);
                                operation = removeJson(dirHandles, filename);
                            }
                        } else {
                            console.log("Erro ao abrir o arquivo de handles = " + filename);
                        }
                    }
                } catch (ex) {
                    console.log(
                        'importOrders.catch',
                        ex
                    );
                }
            });
        });
    });
}

const mountOrder = async (orderId) => {
    let order = await getOrder(orderId);
    if (!order) {
        return false;
    }

    for (let i = 0; i < order.items.length; i++) {
        let item = order.items[i];
        let specifications = await getProductSpecifications(item.productId);
        let giftCard = specifications.find(x => x.Name == "GiftCard");
        let promotionId = specifications.find(x => x.Name == "promotionId");
        if (giftCard != undefined && giftCard.Value.length > 0 && giftCard.Value[0] == "Sim" && promotionId != undefined && promotionId.Value.length > 0 && promotionId.Value[0].length > 0) {
            let promotion = await getPromotion(promotionId.Value[0].trim());
            item.giftCard = {
                active: true,
                promotionId: promotion.promotionId,
                coupon: mountCoupon(order),
                utmSource: promotion.utmSource,
                couponValue: promotion.value
            }
        }
    }

    return order;
}

const mountCoupon = (order) => {
    return order.clientProfileData.firstName.substr(0, 1) + order.sequence + Math.floor(Math.random() * 100);
}

const getPromotion = async (promotionId) => {
    let promotion = await getPromotionById(promotionId);
    if (promotion && promotion.utmSource) {
        return {
            promotionId,
            utmSource: promotion.utmSource,
            value: promotion.nominalDiscountValue
        }
    }
    return null;
}

const createOrder = async (order) => {
    //para gravar o cupom na vtex e no masterdata, verifica se o pedido possui um produto de giftcard. Se sim, então continua a operação.
    if (!await executingOrder(order)) {
        console.log(`createOrder: order not appoved = ${order.orderId}`);
        return false;
    }
    let retorno = false;
    //associa o cupom a promoção do item comprado
    let itemsGiftCards = order.items.filter(x => x.giftCard != undefined && x.giftCard.active == true);
    if (itemsGiftCards != undefined) {
        for (let i = 0; i < itemsGiftCards.length; i++) {
            let item = itemsGiftCards[i];
            //cria o cupom na vtex
            let cuponCreated = await createCupon(item.giftCard.coupon, item.giftCard.utmSource);
            //cria o pedido no Master Data      
            if (cuponCreated) {
                await createOrderMD(order);
                console.log(`${order.orderId} gravada com sucesso no MD.`);
                retorno = true;
            } else {
                retorno = false;
                console.log(`createOrder: Erro ao criar o cupom = ${order.orderId}`);
            }
        }
    } else {
        console.log(`createOrder: itemsGiftCard not found = ${order.orderId}`);
    }
    return retorno;
}

const createCupon = async (coupon, utmSource) => {
    let result = await createCuponVTEX(coupon, utmSource);
    if (result && result.couponCode != undefined && result.couponCode.length > 0) {
        return true;
    } else {
        return false;
    }
}

const createOrderMD = async (order) => {
    let itemsGiftCards = order.items.filter(x => x.giftCard != undefined && x.giftCard.active == true);
    for (let i = 0; i < itemsGiftCards.length; i++) {
        let item = itemsGiftCards[i];

        let subtotal = order.totals.find(x => x.id == "Items").value / 100;

        let data = {
            orderId: order.orderId,
            cartaoPresente: true,
            firstName: order.clientProfileData.firstName,
            lastName: order.clientProfileData.lastName,
            orderStatus: order.status,
            giftcards: item.giftCard.coupon,
            total: order.value / 100,
            subtotal: subtotal,
            email: order.clientProfileData.email,
            couponValue: item.giftCard.couponValue
        }
        await MDpatch("PD", order.orderId, data);
    }
}

export const create = async (orderId = null) => {
    if (orderId != null) {
        let order = await mountOrder(orderId);
        if (await executingOrder(order)) {
            await createOrder(order);
        } else {
            console.warn(`OrderId ${orderId} não aprovado.`);
        }

    } else {
        await createOrders();
    }
}

