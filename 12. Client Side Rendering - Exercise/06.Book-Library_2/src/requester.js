const BASE_URL = "http://localhost:3030/";

async function request(method, endpoint, data) {    
    const URL = BASE_URL + endpoint;    

    const options = {
        method,
        headers: {}
    }  

    if(data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try{
        const response = await fetch(URL, options);

        if(!response.ok) {            
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

const get = (endpoint) => request("GET", endpoint);
const post = (endpoint, data) => request("POST", endpoint, data);
const update = (endpoint, data) => request("PUT", endpoint, data);
const del = (endpoint) => request("DELETE", endpoint);

export {
    get,
    post,
    update,
    del
}