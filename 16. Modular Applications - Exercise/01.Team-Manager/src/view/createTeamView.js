import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { createSubmitHandler } from "../common/util.js";
import { approveMembershipRequest, createTeam, sendMembershipRequest } from "../data/dataService.js";
import { goTo } from "../common/goTo.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {Function} handler 
 * @param {string} errorMessage 
 * @returns {TemplateResult}
 */
const createTemplate = (handler, errorMessage ) => html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form id="create-form" class="main-form pad-large" @submit=${handler} >
                ${errorMessage
                    ? html`<div class="error">${errorMessage}</div>`
                    : ""
                }
                
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>        
    </section>
`;


/**
 * @type {PageJS.Context}
 */
let context = null;


/**
 * @param {PageJS.Context} ctx 
 */
export function showCreateView(ctx) {
    const handler = createSubmitHandler(onCreate);
    render(createTemplate(handler, null));

    context = ctx;
    context.handler = handler;
}


/** 
 * @param {import("../common/types.js").TeamInfo} data 
 * @param {HTMLFormElement} form 
 */
async function onCreate(data, form) {
    if(!data.name || !data.logoUrl || !data.description ) {
        return render(createTemplate(context.handler, "All fields are required!"));
    }

    if(data.name.length < 4) {
        return render(createTemplate(context.handler, " Team name should be at least 4 characters long!"));
    }

    if(data.description.length < 10) {
        return render(createTemplate(context.handler, "Description should be at least 10 characters long!"));
    }

    loading();     

    const {name, logoUrl, description } = data;
    
    try {        
        const newTeam = await createTeam({name, logoUrl, description });        
        
        const ownerMembershipRequest = await sendMembershipRequest(newTeam._id);           
        await approveMembershipRequest(ownerMembershipRequest._id);     

        goTo(`/team-details/${newTeam._id}`);
        form.reset();
    
    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage);
    } 
}