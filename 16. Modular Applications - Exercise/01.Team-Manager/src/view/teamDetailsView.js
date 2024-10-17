import { goTo } from "../common/goTo.js";
import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { isOwner, hasUser, getUserData } from "../common/util.js";
import { getTeamDetails, getTeamMemberships, sendMembershipRequest, approveMembershipRequest, stopMembership } from "../data/dataService.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {boolean} userIsLogged 
 * @param {boolean} userIsOwner 
 * @param {string} userHasMembershipStatus 
 * @param {string} userMembershipId 
 * @param {import("../common/types.js").MemberStatus[]} approvedMemberships 
 * @param {import("../common/types.js").MemberStatus[]} pendingRequests 
 * @returns {TemplateResult}
 */
const teamTemplate = (team, userIsLogged, userIsOwner, userHasMembershipStatus, userMembershipId, approvedMemberships, pendingRequests) => html`
    <section id="team-home">
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${approvedMemberships.length} Members</span>
                ${userIsLogged
                    ? html`<div>
                                ${userIsOwner
                                    ? html`<a href="/edit-team/${team._id}" class="action">Edit team</a>`                                    
                                    : html`${assignMemberhipButton(team, userHasMembershipStatus, userMembershipId)}`                                   
                                }                                                   
                            </div>`
                    : "" 
                }                
            </div> 
            
            ${membersTemplate(team, approvedMemberships, userIsOwner)}
            
            ${userIsOwner
                ? html`${requestsTemplate(team, pendingRequests)}`
                : ""
            }
            
        </article>
    </section>
`;


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {string} userHasMembershipStatus 
 * @param {string} userMembershipId 
 * @returns {TemplateResult}
 */
function assignMemberhipButton(team, userHasMembershipStatus, userMembershipId) {
    if(!userHasMembershipStatus) {
        return html`<a href="#" class="action" data-team-id=${team._id} @click=${onJoinTeam} >Join team</a>`

    } else if(userHasMembershipStatus === "member") {
        return html`<a href="#" class="action invert" data-user-membership-id=${userMembershipId} @click=${/*** @param {Event} event*/(event) => onStopMembership(event, team)} >Leave team</a>`
    
    } else if (userHasMembershipStatus === "pending") {
        return html`Membership pending. <a href="#" data-user-membership-id=${userMembershipId} @click=${/*** @param {Event} event*/(event) => onStopMembership(event, team)} >Cancel request</a>`
    }
}


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {import("../common/types.js").MemberStatus[]} approvedMemberships 
 * @param {boolean} userIsOwner 
 * @returns {TemplateResult}
 */
const membersTemplate = (team, approvedMemberships, userIsOwner) => html`
    <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
            ${userIsOwner 
                ? html`${approvedMemberships.map(membership => memberCardIfOwner(team, membership))}`
                : html`${approvedMemberships.map(membership => html`<li>${membership.user.username}</li>`)}`
            }            
        </ul>
    </div>
`;


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {import("../common/types.js").MemberStatus} membership 
 * @returns {TemplateResult}
 */
const memberCardIfOwner = (team, membership) => html`
    <li>${membership.user._id === team._ownerId 
            ? html`${membership.user.username}`
            : html`${membership.user.username}<a href="#" class="tm-control action" data-user-membership-id=${membership._id} @click=${/*** @param {Event} event*/(event) => onStopMembership(event, team)} >Remove from team</a>`            
            }        
    </li>
`;


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {import("../common/types.js").MemberStatus[]} pendingRequests 
 * @returns {TemplateResult}
 */
const requestsTemplate = (team, pendingRequests) => html`
    <div class="pad-large">
        <h3>Membership Requests</h3>
        <ul class="tm-members">
            ${pendingRequests.map(request => requestCard(team, request))}
        </ul>
    </div>
`;


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {import("../common/types.js").MemberStatus} request 
 * @returns {TemplateResult}
 */
const requestCard = (team, request) => html`
        <li>${request.user.username}
            <a href="#" class="tm-control action" data-user-membership-id=${request._id} @click=${/*** @param {Event} event*/(event) => onApproveMembership(event, team)} >Approve</a>
            <a href="#" class="tm-control action" data-user-membership-id=${request._id} @click=${/*** @param {Event} event*/(event) => onStopMembership(event, team)} >Decline</a>
        </li>
`;


/**
 * @param {PageJS.Context} ctx 
 */
export async function showTeamDetailsView(ctx) {    
    loading();    

    const teamId = ctx.params.id;        
    
    try {        
        const team = await getTeamDetails(teamId);        
        
        const teamAllMemberships = await getTeamMemberships(teamId);       
        const approvedMemberships = teamAllMemberships.filter(m => m.status === "member");
        const pendingRequests = teamAllMemberships.filter(m => m.status === "pending");    
        
        const userIsLogged = hasUser();       
        const userIsOwner = isOwner(team._ownerId);    

        const currentUser = getUserData();
        const userHasMembershipStatus = teamAllMemberships.find(m => m._ownerId === currentUser?._id)?.status;    
        const userMembershipId = teamAllMemberships.find(m => m._ownerId === currentUser?._id)?._id;   
        
        render(teamTemplate(team, userIsLogged, userIsOwner, userHasMembershipStatus, userMembershipId, approvedMemberships, pendingRequests));
    
    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;                   
        showOverlay(err.message, previousPage); 
    }
}


/** 
 * @param {Event} event 
 */
async function onJoinTeam(event) {
    event.preventDefault();
    loading();

    /**
     * @type {string}
     */
    // @ts-ignore
    const teamId = event.target.dataset.teamId;

    try{        
        await sendMembershipRequest(teamId);        

        goTo(`/team-details/${teamId}`);

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage, true); 
    }    
}


/** 
 * @param {Event} event 
 * @param {import("../common/types.js").Team} team 
 */
async function onStopMembership(event, team) {    
    event.preventDefault();
    loading();

    try{
        /**
        * @type {string}
        */
        // @ts-ignore        
        const membershipId = event.target.dataset.userMembershipId;   
        await stopMembership(membershipId);        

        goTo(`/team-details/${team._id}`);

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage, true); 
    }    
}


/** 
 * @param {Event} event
 * @param {import("../common/types.js").Team} team 
 */
async function onApproveMembership(event, team) {
    event.preventDefault();
    loading();

    try{
        /**
        * @type {string}
        */
        // @ts-ignore         
        const membershipId = event.target.dataset.userMembershipId;    
        await approveMembershipRequest(membershipId);        
        
        goTo(`/team-details/${team._id}`);

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage, true);
    }    
}


