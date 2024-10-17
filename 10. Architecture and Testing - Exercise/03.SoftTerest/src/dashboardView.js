import { getAllIdeas } from "./dataService.js";

let context = null;

export async function showDashboardView(ctx) {
    context = ctx;    
    context.refs.main.replaceChildren();
    context.refs.dashboardDiv.replaceChildren();
    
    const allIdeas = await getAllIdeas(context);
    const hasIdea = !!allIdeas[0]._id;    
    
    if(hasIdea) {
        allIdeas.forEach(idea => context.refs.dashboardDiv.innerHTML += createIdeaTemp(idea));
        context.refs.dashboardDiv.querySelectorAll("a").forEach(link => link.addEventListener('click', context.onNavigate));
    } else {
        context.refs.dashboardDiv.innerHTML = "<h1>No ideas yet! Be the first one :)</h1>";
    }
    
    context.refs.main.appendChild(context.refs.dashboardDiv);    
}

function createIdeaTemp(idea) {
    const ideaTemp = ` 
        <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${idea.title}</p>
            </div>
            <img class="card-image" src=${idea.img} alt="Card image cap">
            <a class="btn" data-idea-id =${idea._id} href="details">Details</a>
        </div>`
    
    return ideaTemp;
}