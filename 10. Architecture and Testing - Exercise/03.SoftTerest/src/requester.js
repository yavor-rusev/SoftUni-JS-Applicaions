import { getUserData, getUserToken, resetUserData } from "./util.js";

const BASE_URL = "http://localhost:3030/";

async function request(method, endpoint, data) {
    const URL = BASE_URL + endpoint;
    const userData = getUserData();

    const options = {
        method,
        headers: {}
    }    

    if(userData) {
        options.headers["X-Authorization"] = getUserToken();
    }

    if(data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try{
        const response = await fetch(URL, options);

        if(!response.ok) {
            if(response.status === 403) {
                if(userData) {
                    resetUserData();
                }                
            }
            
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        alert(error);
        throw error;
    }
}

const get = (url) => request("GET", url);
const post = (url, data) => request("POST", url, data);
const update = (url, data) => request("PUT", url, data);
const del = (url) => request("DELETE", url);

export {
    get,
    post,
    update,
    del
}