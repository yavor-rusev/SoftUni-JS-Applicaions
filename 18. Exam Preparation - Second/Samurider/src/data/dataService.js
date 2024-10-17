import { get, post, put, del } from "../data/request.js";
import { page } from "../common/lib.js";

const endpoints = {
    allMotorcycles: "/data/motorcycles?sortBy=_createdOn%20desc",
    addMotorcycle: "/data/motorcycles",
    details: "/data/motorcycles/",
    edit: "/data/motorcycles/",
    delete: "/data/motorcycles/"
}

export async function getAllMotorcycles() {
    return await get(endpoints.allMotorcycles);
}

export async function addMotorcycle(data) {    
    return post(endpoints.addMotorcycle, data);
}

export async function getMotorcycleDetails(id) {
    return get(endpoints.details + id);
}

export async function editMotorcycleDetails(id, data) {
    return put(endpoints.edit + id, data);
}

export async function deleteMotorcycle(ctx) {    
    const consent = confirm("Are you sure?");

    if(consent) {
        const itemId = ctx.params.id;
        await del(endpoints.delete + itemId);
        page.redirect("/dashboard")
    }
}

