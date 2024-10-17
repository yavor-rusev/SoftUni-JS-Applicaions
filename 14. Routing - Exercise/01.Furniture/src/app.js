import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

import { userHelper } from "./utility/userHelper.js";
import { showDashboardView } from "./view/dashboardView.js";
import { showLoginView } from "./view/loginView.js";
import { showRegisterView } from "./view/registerView.js";
import { onLogout } from "./view/logoutView.js";
import { showDetailsView } from "./view/detailsView.js";
import { onDelete } from "./view/deleteView.js";
import { showCreateView } from "./view/createView.js";
import { showMyFurnitureView } from "./view/myFurnitureView.js";
import { showEditView } from "./view/editView.js";

const root = document.querySelector('div[class="container"]');
const guestNav = document.getElementById("guest");
const userNav = document.getElementById("user");

window.addEventListener("popstate", (event) => console.log("popstate -> ", event));
window.addEventListener("hashchange", (event) => console.log("hashchange-> ", event));

updateNav();

// sloji confirmation prozorec na delete-a

page(updateCTX);

page("/", showDashboardView);
page("/index.html", showDashboardView);
page("/dashboard", showDashboardView);
page("/details/:id", showDetailsView);
page("/create", showCreateView);
page("/register", showRegisterView);
page("/login", showLoginView);
page("/logout", onLogout);
page("/my-furniture", showMyFurnitureView);
page("/edit/:id", showEditView);
page("/delete/:id", onDelete);

page.start();

function myRenderer(template) {
    render(template, root);    
}

function updateCTX(ctx, next) {    
    ctx.myRenderer = myRenderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next();
}

function goTo(path) {
    page.redirect(path);
}

function updateNav() {    
    const userData = userHelper.getUserData();    

    if(userData) {
        userNav.style.display = "inline-block";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "inline-block";
    }
}


