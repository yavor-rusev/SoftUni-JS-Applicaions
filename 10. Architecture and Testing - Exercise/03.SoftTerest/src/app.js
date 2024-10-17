import { getUserData} from "./util.js";
import { showHomeView } from "./homeView.js";
import { showRegisterView } from "./registerView.js";
import { showLoginView } from "./loginView.js";
import { logoutUser } from "./userService.js";
import { showDashboardView } from "./dashboardView.js";
import { showDetailsView } from "./detailsView.js";
import { showCreateView } from "./createView.js";
import { onDelete } from "./dataService.js";

const body = document.querySelector('body');
const nav = document.querySelector('nav');
const viewDivs = document.querySelectorAll('body>div');
const [homeDiv, registerDiv, loginDiv, dashboardDiv, detailsDiv, createDiv] = viewDivs;
const footer = document.querySelector('footer');

const routes = {
    "/": showHomeView,
    "/home": showHomeView,
    "/register": showRegisterView,
    "/login": showLoginView,
    "/logout": logoutUser,
    "/dashboard": showDashboardView,
    "/details": showDetailsView,
    "/delete": onDelete,
    "/create": showCreateView,
    "*": () => console.log("Page not found")
}

const endpoints = {
    register: "users/register",
    login: "users/login",
    logout: "users/logout",
    allIdeas: "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    singleIdea: "data/ideas"
}

const ctx = {
    endpoints,
    refs: { homeDiv, registerDiv, loginDiv, dashboardDiv, detailsDiv, createDiv },
    updateNav,
    onNavigate,
    goTo
}

start();

function start() {    
    viewDivs.forEach(div => div.remove());
    footer.remove();

    const main = document.createElement("main");
    ctx.refs.main = main;
    
    homeDiv.querySelector("a").addEventListener('click', onNavigate);
    registerDiv.querySelector("a").addEventListener('click', onNavigate);
    loginDiv.querySelector("a").addEventListener('click', onNavigate);

    body.appendChild(main);
    body.appendChild(footer);

    nav.addEventListener('click', onNavigate);
    updateNav();
    goTo("/");
}

function updateNav() {    
    const userLinks = document.querySelectorAll('nav a[data-permission="user"]');
    const guestLinks = document.querySelectorAll('nav a[data-permission="guest"]');
    const userIsLogged = getUserData();

    if (userIsLogged) {
        userLinks.forEach(link => link.style.display = "");
        guestLinks.forEach(link => link.style.display = "none");
    } else {
        userLinks.forEach(link => link.style.display = "none");
        guestLinks.forEach(link => link.style.display = "");
    }
}

function onNavigate(event) {
    event.preventDefault();   

    if (event.target.tagName !== "A" && event.target.tagName !== "IMG") {
        return;
    }

    let linkHref = "*";
    let ideaId = null;
    

    if (event.target.tagName === "A") {
        linkHref = event.target.href;

        if (event.target.textContent === "Details" || event.target.textContent === "Delete") {
            ideaId = event.target.dataset.ideaId;
        }

    } else if (event.target.tagName === "IMG") {
        linkHref = event.target.parentElement.href;
    }

    const linkPath = new URL(linkHref).pathname;  
    goTo(linkPath, ideaId);
}

function goTo(linkPath, ideaId) {    
    const handler = routes[linkPath];
    handler(ctx, ideaId);
}





