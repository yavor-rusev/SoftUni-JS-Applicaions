import { html, render } from "../common/lib.js";
import { getAllItems } from "../data/dataService.js";

const dashboardTemplate = (items) => html`
    <h2>Collection</h2>
    <section id="tattoos">          
        ${!items.length ? 
            html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>` :
            html`${items.map(item => cardTemplate(item))}`        
        }         
    </section>        
`;

const cardTemplate = (item) => html`
    <div class="tattoo">
        <img src="${item.imageUrl}" alt="example1" />
        <div class="tattoo-info">
            <h3 class="type">${item.type}</h3>
            <span>Uploaded by </span>
            <p class="user-type">${item.userType}</p>
            <a class="details-btn" href="/details/${item._id}" >Learn More</a>
        </div>
    </div>
`;

export async function showDashboardView(ctx) {
    const items = await getAllItems();    
    render(dashboardTemplate(items));
}


