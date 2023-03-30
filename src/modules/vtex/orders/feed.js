import { get, post, patch } from "../index.js"

export async function getFeedConfiguration() {
    let feed = null;
    try {
        feed = await get(`/orders/feed/config`, "");
        if (feed.error) {
            console.log("\x1b[33m", `Feed configuration: ${feed.error.response.status}-${feed.error.response.statusText}`);
            feed = null;
        }
    } catch (ex) {
        feed = null;
    }
    return feed;
}

export async function postFeedConfiguration(data) {
    let url = `/orders/feed/config`;
    let dataDefault = {
        "filter": {
            "status": [
                "on-order-completed",
                "payment-pending",
                "payment-approved",
                "ready-for-handling",
                "start-handling",
                "handling",
                "order-accepted",
                "cancellation-requested",
                "canceled",
                "invoiced"
            ],
            "type": "FromWorkflow"
        },
        "queue": {
            "visibilityTimeoutInSeconds": 60,
            "messageRetentionPeriodInSeconds": 345600
        },
        "quantity": 0,
        "approximateAgeOfOldestMessageInSeconds": 1.2676545496642742
    }
    data = { ...dataDefault, ...data };
    //console.log(data);
    return await post(url, data, "");
}


export const getFeedOrderStatus = async () => {
    return await get("/orders/feed", "maxlot=10");
}

export const commitItemFeedOrderStatus = async (handle) => {
    let json = {
        handles: [
            handle
        ]
    };
    return await post("/orders/feed", json);
}

export const importFeed = async (status, callEvent) => {
    // leia o feed
    // roda a função de callEvent
    // confirma o feed para a vtex

    await postFeedConfiguration(status);
    let handles = await getFeedOrderStatus(status);
    for (let i = 0; i < handles.length; i++) {
        let element = handles[i];
        let handle = element.handle;
        if (callEvent != undefined) {
            if (callEvent(element)) {
                await commitItemFeedOrderStatus(handle);
            }
        } else {
            await commitItemFeedOrderStatus(handle);
        }
    };
    return true;
}