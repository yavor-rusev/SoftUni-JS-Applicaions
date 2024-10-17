import { html, render, page } from "../common/lib.js";
import { getUserData, isOwner } from "../common/util.js";
import { getItemDetails } from "../data/dataService.js";
import { get, post } from "../data/request.js";


const detailsTemplate = (item, userIsOwner, totalLikesForThisTattoo, hasLoggedUser, userHasLikedTattoo, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <img
                id="details-img"
                src="${item.imageUrl}"
                alt="example1"
            />
            <div>
                <div id="info-wrapper">
                    <p id="details-type">${item.type}</p>
                    <div id="details-description">
                        <p id="user-type">${item.userType}</p>
                        <p id="description">${item.description}</p>
                    </div>
                    <h3>Like tattoo:<span id="like">${totalLikesForThisTattoo}</span></h3>
                    <!--Edit and Delete are only for creator-->
                    
                    ${hasLoggedUser ? html`
                        <div id="action-buttons">
                            <!-- If user is owner -->
                            ${userIsOwner ?
                                // Buttons for owner 
                                html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                    <a href="/delete/${item._id}" id="delete-btn">Delete</a>`: 
                                // Buttons for not-owner 
                                html`${userHasLikedTattoo 
                                // if user has liked the item already 
                                    ? "" 
                                    // if user has not liked the item already   
                                    : html`<a href="javascript:void(0)" id="like-btn" @click=${onLike} >Like</a>`}
                                `}
                        </div>` : ""
                    }                      
                </div>
            </div>
        </div>
    </section>
`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemDetails(itemId);   

    const ownerId = item._ownerId;
    const userIsOwner = isOwner(ownerId);

    const userId = getUserData()?._id;
    const hasLoggedUser = !!userId;

    const tattooId = itemId;
    
    const totalLikesForThisTattoo = await get(`/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`);
    const userLikesForThisTattoo = await get(`/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    const userHasLikedTattoo = !!userLikesForThisTattoo;    

    render(detailsTemplate(item, userIsOwner, totalLikesForThisTattoo, hasLoggedUser, userHasLikedTattoo, onLike));

    async function onLike(event) {
        event.preventDefault();        
        
        const likeRecord = await post("/data/likes", { tattooId });
        page.redirect(`/details/${item._id}`)
    }
}


