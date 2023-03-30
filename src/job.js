import { importFeed } from "./components/importFeed.js";
import { create as createGiftCard } from "./components/createGiftCard.js"
import { removeCoupons } from "./components/removeCoupon.js"
import lojaSelecionada from "./lib/selecao-loja.js";

export const jobFeed = async () => {
    //leitura dos pedidos faturados
    //gravação da order na data/orders
    //confirmação da leitura da order para a VTEX
    console.log('\x1b[32m', `Job feed start: ${lojaSelecionada.VTEX.accountName} - ${new Date().toISOString()}`, '\x1b[0m');
    await importFeed(["invoiced"]);
    console.info('\x1b[32m', `Finish Job: ${new Date().toISOString()}`);
    console.log('\x1b[0m', ``);
}

export async function jobOrders(orderId) {
    console.log('\x1b[32m', `Job order start: ${lojaSelecionada.VTEX.accountName} - ${new Date().toISOString()} - ${orderId}`, '\x1b[0m');
    await createGiftCard(orderId);
    console.info('\x1b[32m', `Finish Job: ${new Date().toISOString()}`);
    console.log('\x1b[0m', ``);
}

export const jobRemoveCupon = async (cupomPrazoDias) => {
    console.log('\x1b[32m', `Job order start: ${lojaSelecionada.VTEX.accountName} - ${new Date().toISOString()} - ${cupomPrazoDias}`, '\x1b[0m');
    await removeCoupons(cupomPrazoDias);
    console.info('\x1b[32m', `Finish Job: ${new Date().toISOString()}`);
    console.log('\x1b[0m', ``);

}

export default jobFeed;