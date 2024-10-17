import { page } from "./common/lib.js";
import { updateNav } from "./common/util.js";
import { logoutUser } from "./user/userService.js";
import { showCreateView } from "./view/createTeamView.js";
import { showBrowseTeamsView } from "./view/browseTeamsView.js";
import { showMyTeamsView } from "./view/myTeamsView.js";
import { showHomeView } from "./view/homeView.js";
import { showLoginView } from "./view/loginView.js";
import { showRegisterView } from "./view/registerView.js";
import { showTeamDetailsView } from "./view/teamDetailsView.js";
import { showEditTeamView } from "./view/editTeamView.js";


page("/", showHomeView);
page("/index.html", showHomeView);
page("/login", showLoginView); 
page("/register", showRegisterView);
page("/logout", logoutUser);
page("/team-details/logout", logoutUser);
page("/edit-team/logout", logoutUser);
page("/browse-teams", showBrowseTeamsView);
page("/my-teams", showMyTeamsView);
page("/create-team",  showCreateView);
page("/team-details/:id", showTeamDetailsView);
page("/edit-team/:id", showEditTeamView);

page.start();
updateNav();
