import { get, post, put, del } from "../data/request.js";
import { page } from "../common/lib.js";

const endpoints = {
    allItems: "/data/tattoos?sortBy=_createdOn%20desc",
    addItem: "/data/tattoos",
    itemDetails: "/data/tattoos/",
    editItem: "/data/tattoos/",
    deleteItem: "/data/tattoos/"
}

export async function getAllItems() {
    return await get(endpoints.allItems);
}

export async function getItemsCount() {
    return await get(endpoints.allItems + "&count"); 
}

export async function addItem(data) {    
    return await post(endpoints.addItem, data);
}

export async function getItemDetails(id) {    
    return await get(endpoints.itemDetails + id);
}

export async function editItemDetails(id, data) {
    return await put(endpoints.editItem + id, data);
}

export async function deleteItem(ctx) {    
    const consent = confirm("Are you sure?");

    if(consent) {
        const itemId = ctx.params.id;
        await del(endpoints.deleteItem + itemId);
        page.redirect("/dashboard");
    }
}

