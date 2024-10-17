import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { paginator } from "../partials/pagination.js";
import { getUserData} from "../common/util.js";
import { getMyMemberships, getTheseTeamsMembers, getMyMembershipsForPaginator } from "../data/dataService.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {import("../common/types.js").Membership[]} membershipsForPage 
 * @param {import("../common/types.js").TeamMember[]} pageTeamsMembers 
 * @param {number} pageNumber 
 * @param {number} countOfPages 
 * @returns {TemplateResult}
 */
const myTeamsTemplate = (membershipsForPage, pageTeamsMembers, pageNumber, countOfPages) => html`
    <section id="my-teams">        
        ${membershipsForPage.length 
            ? html`
                <article class="pad-med">
                    <h1>My Teams</h1>
                </article>

                <article class="layout narrow">
                    <div class="pad-small"><a href="/create-team" class="action cta">Create Team</a></div>
                </article>

                ${membershipsForPage.map(membership => cardTemplate(membership, pageTeamsMembers))}

                ${paginator("/my-teams", pageNumber, countOfPages)}`

            : html`${notMemberTemplate()}`
        }        
    </section>
`;


/** 
 * @param {import("../common/types.js").Membership} membership 
 * @param {import("../common/types.js").TeamMember[]} pageTeamsMembers 
 * @returns {TemplateResult}
 */
const cardTemplate = (membership, pageTeamsMembers) => html`
    <article class="layout">
        <img src="${membership.team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${membership.team.name}</h2>
            <p>${membership.team.description}</p>
            <span class="details">${pageTeamsMembers.filter(team => team.teamId === membership.team._id).length} Members</span>
            <div><a href="/team-details/${membership.team._id}" class="action" >See details</a></div>
        </div>
    </article>   
`;


/** 
 * @returns {TemplateResult}
 */
const notMemberTemplate = () => html`
    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/browse-teams">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create-team" class="action cta">Create Team</a></div>
    </article>
`;


/** 
 * @param {PageJS.Context} ctx 
 */
export async function showMyTeamsView(ctx) {
    loading();

    const query = ctx.querystring;
    const pageNumber = Number(query?.replace("page=", "")) || 1;
    const pageSize = 3;
    
    const userId = getUserData()._id;    

    try{
        const myMemberships = await getMyMemberships(userId);          
        const countOfPages = Math.ceil(Number(myMemberships.length) / Number(pageSize));        
        
        const membershipsForPage = await getMyMembershipsForPaginator(userId, pageNumber, pageSize);        
        
        const teamsIdsArray = membershipsForPage.map(membership => membership.team._id);         
        const pageTeamsMembers = await getTheseTeamsMembers(teamsIdsArray);        
        
        render(myTeamsTemplate(membershipsForPage, pageTeamsMembers, pageNumber, countOfPages));

    } catch(err) {        
        showOverlay(err.message, "/");
    }    
}