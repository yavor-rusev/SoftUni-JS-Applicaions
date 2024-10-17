import { userHelper } from "./userHelper.js";

const BASE_URL = "http://localhost:3030";

async function requester(method, endpoint, data) {
    const url = BASE_URL + endpoint;
    const userData = userHelper.getUserData();

    const options = {
        method,
        headers: {}
    }    

    if (userData) {
        options.headers["X-Authorization"] = userHelper.getUserToken();
    }

    if (data != undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {        
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status == 403) {
                userHelper.removeUserData();
            }

            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        alert(error);
        throw error;
    }
}

const get = (endpoint) => requester("GET", endpoint);
const post = (endpoint, data) => requester("POST", endpoint, data);
const update = (endpoint, data) => requester("PUT", endpoint, data);
const del = (endpoint) => requester("DELETE", endpoint);

export const api = {
    get,
    post,
    update,
    del
}



