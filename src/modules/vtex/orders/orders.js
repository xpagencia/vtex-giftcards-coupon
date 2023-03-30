import { get } from "../index.js"

export async function getOrder(orderId) {
    if (orderId != undefined) {
        let order = await get(`/oms/pvt/orders/${orderId}`, "");
        return order;
    } else {
        return null;
    }
}

export async function listOrders(params, page, per_page) {
    let url = `/oms/pvt/orders`;
    params = `orderBy=creationDate,desc&per_page=${per_page}&page=${page}&${params}`;
    return await get(url, params);
}

export async function getEmailMapping(emailAlternativo) {
    let url = "http://conversationtracker.vtex.com.br/api/pvt/emailMapping";
    let params = `an=${lojaSelecionada.VTEX.accountName}&alias=${emailAlternativo}`;
    let request = await get(url, params, true);
    return request;
}
