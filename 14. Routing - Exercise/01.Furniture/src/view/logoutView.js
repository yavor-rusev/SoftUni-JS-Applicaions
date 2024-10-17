import { userHelper } from "../utility/userHelper.js";
import { userService } from "../service/userService.js";

export async function onLogout(ctx) {    
    await userService.logoutUser();
    userHelper.removeUserData();

    ctx.updateNav();
    ctx.goTo("/");
}