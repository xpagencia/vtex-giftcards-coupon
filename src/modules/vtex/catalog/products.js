import { get, post, patch } from "../index.js"

export async function GetProductAndSkuIds(posI, posF, categoryId = 0, productId = 0) {
    let qsCategoryId = categoryId && categoryId > 0 ? `&categoryId=${categoryId}` : "";
    let qsProductId = productId && productId > 0 ? `&productId=${productId}` : "";
    let qsParams = `_from=${posI}&_to=${posF}${qsCategoryId}${qsProductId}`;
    let url = `/catalog_system/pvt/products/GetProductAndSkuIds`;
    //console.log(`${url}?${qsParams}`);
    let documents = await get(url, qsParams);
    return documents;
}

export const getProductSpecifications = async (productId) => {
    let url = `/catalog_system/pvt/products/${productId}/specification`;
    return await get(url);
}