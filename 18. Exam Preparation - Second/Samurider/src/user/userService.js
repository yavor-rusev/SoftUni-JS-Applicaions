import { clearUserData, setUserData, updateNav } from "../common/util.js";
import { get, post } from "../data/request.js";
import { page } from "../common/lib.js";

// TODO Adapt user profile to exam peruirements (identity, extra properties, etc.)

const endpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout"
}

export async function loginUser(email, password) {    
    const result = await post(endpoints.login, { email, password });
    setUserData(result);

    // updateNav();
    // page.redirect("/");
}

export async function registerUser(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
    
    // updateNav();
    // page.redirect("/");
}

export async function logoutUser() {
    const promise = get(endpoints.logout);   

    clearUserData();
    updateNav();
    
    await promise;
    page.redirect("/");
}

