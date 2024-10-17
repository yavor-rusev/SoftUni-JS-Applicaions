import {post, get} from "./requester.js";
import { resetUserData, hideDeleteButton } from "./util.js";


export async function loginUser(url, data) {
    return await post(url, data);
}

export async function registerUser(url, data) {    
    return await post(url, data);
}

export async function logoutUser(ctx) {    
    await get(ctx.endpoints.logout);
    resetUserData(ctx);    
    hideDeleteButton(ctx);
}
