import { clearUserData, setUserData, updateNav } from "../common/util.js";
import { get, post } from "../data/request.js";
import { page } from "../common/lib.js";


const endpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout"
}


/**
 * @param {string} email 
 * @param {string} password 
 */
export async function loginUser(email, password) {
    const result = await post(endpoints.login, { email, password }); 
    setUserData(result);
}


/** 
 * @param {string} email 
 * @param {string} username 
 * @param {string} password 
 */
export async function registerUser(email, username, password) {
    const result = await post(endpoints.register, { email, username, password });
    setUserData(result);
}


export async function logoutUser() {  
    const promise = get(endpoints.logout);    

    clearUserData();   
    updateNav();
    
    await promise;    
    page.redirect("/");
}

