import { page } from "./common/lib.js";
import { updateNav } from "./common/util.js";
import { logoutUser } from "./user/userService.js";
import { showAddView } from "./view/addShow.js";
import { showDashboardView } from "./view/dashboardView.js";
import { showHomeView } from "./view/homeView.js";
import { showLoginView } from "./view/loginView.js";
import { showRegisterView } from "./view/registerView.js";
import { showDetailsView } from "./view/detailsView.js";
import { showEditView } from "./view/editView.js";
import { deleteItem } from "./data/dataService.js";
import { showSearchView } from "./view/searchView.js";
import { parseQuery } from "./common/util.js";


page("/", showHomeView);
page("/index.html", showHomeView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/logout", logoutUser);
page("/dashboard", showDashboardView);
page("/add",  showAddView);
page("/details/:id", showDetailsView); 
page("/edit/:id", showEditView);
page("/delete/:id", deleteItem);
page("/search", parseQuery, showSearchView);

page.start();

updateNav();






