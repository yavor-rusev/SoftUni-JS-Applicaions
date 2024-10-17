import { api } from "../utility/requester.js";

const endpoints = {
    furniture: "/data/catalog",
    myFurniture: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`
}

async function getAllFurniture() {
    return await api.get(endpoints.furniture);
}

async function createFurniture(item) {
    return await api.post(endpoints.furniture, item);
}

async function getFurnitureDetails(itemId) {
    return await api.get(endpoints.furniture + "/" + itemId);
}

async function updateFurniture(itemId, item) {
    return await api.update(endpoints.furniture + "/" + itemId, item);
}

async function deleteFurniture(itemId) {
    return await api.del(endpoints.furniture + "/" + itemId);
}

async function getMyFurniture(userId) {    
    return await api.get(endpoints.myFurniture(userId));
}

export const dataService = {
    getAllFurniture,
    createFurniture,
    getFurnitureDetails,
    updateFurniture,
    deleteFurniture,
    getMyFurniture
}




/*
•	Create Furniture (POST): http://localhost:3030/data/catalog
•	All Furniture (GET): http://localhost:3030/data/catalog
•	Furniture Details (GET): http://localhost:3030/data/catalog/:id
•	Update Furniture (PUT): http://localhost:3030/data/catalog/:id
•	Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id
•	My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
*/