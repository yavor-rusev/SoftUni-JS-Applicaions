import { html, render } from "../common/lib.js";
import { isOwner } from "../common/util.js";
import { getItemDetails } from "../data/dataService.js";


const detailsTemplate = (item, userIsOwner) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <div id="details-text">
                <p id="details-title">${item.title}</p>
                <div id="info-wrapper">
                    <div id="description">
                        <p id="details-description">${item.details}</p>
                    </div>
                </div>            

                <!--Edit and Delete are only for creator-->                
                <div id="action-buttons"> 
                    ${userIsOwner 
                        ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                <a href="/delete/${item._id}" id="delete-btn">Delete</a>` 
                        : ""
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
    
    render(detailsTemplate(item, userIsOwner));
}

