import { get, post } from "../index.js"

export const getPromotionById = (promotionId) => {
    let url = `/rnb/pvt/calculatorconfiguration/${promotionId}`
    return get(url);
}