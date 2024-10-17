import { goTo } from "../common/goTo.js";
import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { createSubmitHandler } from "../common/util.js";
import { getTeamDetails, editTeamDetails} from "../data/dataService.js";
import { showOverlay } from "./overlay.js";


/**
 * @param {import("../common/types.js").Team} team 
 * @param {Function} handler 
 * @param {string} errorMessage 
 * @returns {TemplateResult}
 */
const editTemplate = (team, handler, errorMessage) => html`
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form id="edit-form" class="main-form pad-large" @submit=${handler} >
                ${errorMessage
                    ? html`<div class="error">${errorMessage}</div>`
                    : ""
                }
                
                <label>Team name: <input type="text" name="name" .value=${team.name} ></label>
                <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl} ></label>
                <label>Description: <textarea name="description" .value=${team.description} ></textarea></label>
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>
`;


/**
 * @type {PageJS.Context}
 */
let context = null;


/**
 * @type {string}
 */
let teamId = null;


/**
 * @param {PageJS.Context} ctx 
 */
export async function showEditTeamView(ctx) {
    loading();
    
    teamId = ctx.params.id;
    
    try{
        const team = await getTeamDetails(teamId);    

        const handler = createSubmitHandler(onEdit);
        render(editTemplate(team, handler, null));

        context = ctx;
        context.handler = handler;    
        context.team = team;

    } catch(err) {            
        showOverlay(err.message, `/team-details/${teamId}`, true); 
    } 
}


/** 
 * @param {import("../common/types.js").TeamInfo} data 
 * @param {HTMLFormElement} form 
 */
async function onEdit(data, form) { 
    if(!data.name || !data.logoUrl || !data.description ) {
        return render(editTemplate(context.team, context.handler, "All fields are required!"));
    }

    if(data.name.length < 4) {
        return render(editTemplate(context.team, context.handler, " Team name should be at least 4 characters long!"));
    }

    if(data.description.length < 10) {
        return render(editTemplate(context.team, context.handler, "Description should be at least 10 characters long!"));
    }
    
    loading();

    try{        
        const { name, logoUrl, description } = data;

        if(name !== context.team.name || logoUrl !== context.team.logoUrl || description !== context.team.description) {
            const editedTeam = await editTeamDetails(context.team._id, { name, logoUrl, description }); 
            
            goTo(`/team-details/${editedTeam._id}`);            
               
        } else {
            goTo(`/team-details/${teamId}`);            
        }
        
        form.reset();

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage); 
    }     
}


