import { html, render } from "../common/lib.js";
import { isOwner } from "../common/util.js";
import { getMotorcycleDetails } from "../data/dataService.js";


const detailsTemplate = (item, userIsOwner) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
            <div id="details-description">
                <p class="year">Year: ${item.year}</p>
                <p class="mileage">Mileage: ${item.mileage} km.</p>
                <p class="contact">Contact Number: ${item.contact}</p>
                <p id = "motorcycle-description">${item.about}</p>
            </div>
            <div id="action-buttons">
                ${userIsOwner ? html`                    
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${item._id}" id="delete-btn">Delete</a>
                </div>`: ""}        
            </div>
        </div>
    </section>
`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const item = await getMotorcycleDetails(itemId);
    
    const ownerId = item._ownerId;    
    const userIsOwner = isOwner(ownerId);
    
    render(detailsTemplate(item, userIsOwner));
}
