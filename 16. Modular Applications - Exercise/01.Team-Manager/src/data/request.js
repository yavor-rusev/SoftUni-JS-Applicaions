import { clearUserData, getUserData, updateNav } from "../common/util.js";
import { goTo } from "../common/goTo.js";

const host = "http://localhost:3030";

/**
 * Configures method, headers and body for REST request, and sends it.
 * @param {string} method 
 * @param {string} url 
 * @param {any=} data 
 * @returns {Promise<any>}
 * @throws {Error} - Throws error if response status is not ok.
 */
export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            if (response.status == 403 && userData) {
                clearUserData();
                updateNav();                
            }

            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return await response.json();
        }
    } catch (err) {        
        throw err;
    }
}

/** @type {(url: string) => Promise<any>} */
export const get = (url) => request("GET", url);

/** @type {(url: string, data: any) => Promise<any>} */
export const post = (url, data) => request("POST", url, data);

/** @type {(url: string, data: any) => Promise<any>} */
export const put = (url, data) => request("PUT", url, data);

/** @type {(url: string) => Promise<any>} */
export const del = (url) => request("DELETE", url);