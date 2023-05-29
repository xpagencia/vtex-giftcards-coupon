import { importFeed as importFeedVTEX } from '../modules/vtex/orders/feed.js'
import { saveJson } from '../lib/json.js';

const saveHandle = (element) => {
    try {
        saveJson("./data/handles", `${element.orderId}.json`, element);
        return true;
    } catch (ex) {
        return false;
    }
}

export const importFeed = async (status) => {
    const data = {
        "filter": {
            "status": status,
            "type": "FromWorkflow"
        },
    }
    return await importFeedVTEX(data, saveHandle);
}
