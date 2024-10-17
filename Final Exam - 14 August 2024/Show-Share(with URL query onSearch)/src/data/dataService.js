import { get, post, put, del } from "../data/request.js";
import { page } from "../common/lib.js";


const endpoints = {
    allItems: "/data/shows?sortBy=_createdOn%20desc",
    addItem: "/data/shows",
    itemDetails: "/data/shows/",
    editItem: "/data/shows/",
    deleteItem: "/data/shows/",
    searchedItems: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`
}

export async function getAllItems() {
    return await get(endpoints.allItems);
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

export async function getSearchedItems(query) {
    return get(endpoints.searchedItems(query));    
}

export async function deleteItem(ctx) {    
    const consent = confirm("Are you sure?");

    if(consent) {
        const itemId = ctx.params.id;
        await del(endpoints.deleteItem + itemId);

        page.redirect("/dashboard");
    }
}

