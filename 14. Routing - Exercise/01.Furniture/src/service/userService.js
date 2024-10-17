import { api } from "../utility/requester.js";

const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout"
}

async function registerUser(data) {
    return await api.post(endpoints.register, data);
}

async function loginUser(data) {
    return await api.post(endpoints.login, data);   
}

async function logoutUser() {
    return await api.get(endpoints.logout);
}

export const userService = {
    registerUser,
    loginUser,
    logoutUser
}





