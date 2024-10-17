import { getIdeaDetails } from "./dataService.js";
import { getUserData } from "./util.js";

export async function showDetailsView(ctx, ideaId) {   
    const context = ctx;    
    context.refs.main.replaceChildren();

    const ideaDetails = await getIdeaDetails(ctx, ideaId);

    const detailsTemp = createDeatailsTemp(ideaDetails);
    context.refs.detailsDiv.innerHTML = detailsTemp;
    const deleteLink = context.refs.detailsDiv.querySelector("a");
    

    const userData = await getUserData();
    let isOwner = false;
    
    if(userData) {
        isOwner = userData._id === ideaDetails._ownerId;
    }    

    if(!isOwner) {
        deleteLink.remove();        
    } else {
        deleteLink.addEventListener('click', ctx.onNavigate);
    }    

    context.refs.main.appendChild(context.refs.detailsDiv);    
}

function createDeatailsTemp(ideaDetails) {
    const detailsTemp = `
        <img class="det-img" src=${ideaDetails.img} />
        <div class="desc">
            <h2 class="display-5">${ideaDetails.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${ideaDetails.description}</p>
        </div>
        <div class="text-center">
            <a class="btn detb" data-idea-id =${ideaDetails._id} href="delete">Delete</a>
        </div>`

    return detailsTemp;
}