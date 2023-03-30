import { get, post } from "../index.js"

export const getById = (couponId) => {
    let url = `/rnb/pvt/coupon/${couponId}`;
    return get(url);
}

export const create = (couponCode, utmSource, utmCampaign = null, maxItemsPerClient = 0, expirationIntervalPerUse = "0.00:00:00", isArchived = false) => {
    let url = `/rnb/pvt/coupon`;
    let data = {
        couponCode,
        utmSource,
        utmCampaign,
        maxItemsPerClient,
        expirationIntervalPerUse,
        isArchived
    }
    return post(url, data);
}

export const removeCoupon = async (coupon) => {
    return post(`/rnb/pvt/archive/coupon/${coupon}`);
}
