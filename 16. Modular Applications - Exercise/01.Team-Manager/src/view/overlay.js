import { goTo } from "../common/goTo.js";


/**
 * @type {HTMLDivElement}
 */
const overlayDiv = document.querySelector(".overlay");
const para = overlayDiv.querySelector("p");
const a = overlayDiv.querySelector("a");
a.addEventListener("click", onClick);


/**
 * @type {string}
 */
let redirectPath = null;


/**
 * Show modal with error message on failed request.
 * @param {string} message 
 * @param {string} previousPage 
 * @param {true=} failedDetailsActualization 
 */
export function showOverlay(message, previousPage, failedDetailsActualization) {    
    if(message === "Invalid access token") {
        a.textContent = 'Go to "Login"';
        previousPage = "/login";    
            
    } else{
        if(message === "Failed to fetch") {
            message = "Network error";
        }
        
        if(previousPage === "/" || previousPage === "/index.html"){
            a.textContent = 'Go to "Home screen"';
        }
    
        if(previousPage === "/login"){
            a.textContent = "Login again";
        }
    
        if(previousPage === "/register"){
            a.textContent = "Register again";
        }
    
        if(previousPage === "/browse-teams"){
            a.textContent = `Back to "Browse teams"`;
        }
    
        if(previousPage === "/my-teams"){
            a.textContent = `Back to "My teams"`;
        }
    
        if(previousPage === "/create-team" || previousPage.includes("/edit-team")){
            a.textContent = "Try again";
        }
    
        if(previousPage.includes("/team-details")){
            if(failedDetailsActualization) {
                a.textContent = 'Back to "Team details"';
            } else {
                a.textContent = `Back to "Browse teams"`;
                previousPage = "/browse-teams";
            }
        }  
    }    
    
    
    para.textContent = message;     
    overlayDiv.style.display = "block";
        
    redirectPath = previousPage;
}


/** 
 * @param {Event} event 
 */
function onClick(event) {    
    event.preventDefault();    
         
    overlayDiv.style.display = "none";
    goTo(redirectPath);         
}


