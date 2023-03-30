import { get, post, patch } from "../index.js"

export async function Post(entity, data) {
    let document = await post(`/dataentities/${entity}/documents`, data, "");
    return document;
}

export async function Patch(entity, id, data) {
    let document = await patch(`/dataentities/${entity}/documents/${id}`, data, "");
    return document;
}

export async function Search(entity, fields, where, resources) {

    let params = `_fields=${fields}&_where=${where}`;
    resources = (resources) ? { "REST-Range": `resources=${resources}` } : undefined;
    let documents = await get(`/dataentities/${entity}/search`, params, undefined, resources);
    return documents;
}

export default Search;