import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { paginator } from "../partials/pagination.js";
import { hasUser } from "../common/util.js";
import { getTeamsForPaginator, getTeamsCount, getAllMembers } from "../data/dataService.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {import("../common/types.js").Team[]} teams 
 * @param {import("../common/types.js").Membership[]} allMembers 
 * @param {boolean} userIsLogged 
 * @param {number} pageNumber 
 * @param {number} countOfPages 
 * @returns {TemplateResult}
 */
const dashboardTemplate = (teams, allMembers ,userIsLogged, pageNumber, countOfPages) => html`
    <section id="browse">
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

        ${userIsLogged 
            ? html`<article class="layout narrow">
                        <div class="pad-small"><a href="/create-team" class="action cta">Create Team</a></div>
                    </article>`
            : ""
        }        

        ${teams.length 
            ? teams.map(team => cardTemplate(team, allMembers))
            : ""
        }

        ${paginator("/browse-teams", pageNumber, countOfPages)}
    </section>
`;


/** 
 * @param {import("../common/types.js").Team} team 
 * @param {import("../common/types.js").Membership[]} allMembers 
 * @returns {TemplateResult}
 */
const cardTemplate = (team, allMembers) => html`
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${allMembers.filter(m => m.teamId === team._id).length} Members</span>
            <div><a href="/team-details/${team._id}" class="action" >See details</a></div>
        </div>        
    </article>
`;


/** 
 * @param {PageJS.Context} ctx
 */
export async function showBrowseTeamsView(ctx) {
    loading();
    
    const query = ctx.querystring;
    const pageNumber = Number(query?.replace("page=", "")) || 1;
    const pageSize = 3;    

    try{
        const teams = await getTeamsForPaginator(pageNumber, pageSize);                 
        const allMembers = await getAllMembers();       
        
        const allTeamsCount = await getTeamsCount();
        const countOfPages = Math.ceil(Number(allTeamsCount) / Number(pageSize));
        
        const userIsLogged = hasUser();   
        render(dashboardTemplate(teams, allMembers ,userIsLogged, pageNumber, countOfPages));

    } catch(err) {        
        showOverlay(err.message, "/");
    }     
}
