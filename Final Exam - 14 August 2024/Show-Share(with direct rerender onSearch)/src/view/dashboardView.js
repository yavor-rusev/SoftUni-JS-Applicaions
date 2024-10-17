import { html, render } from "../common/lib.js";
import { getAllItems } from "../data/dataService.js";

const dashboardTemplate = (items) => html`
    <h2>Users Recommendations</h2>
    <section id="shows">      
        ${!items.length 
            // <!-- Display an h2 if there are no posts -->
            ? html`<h2 id="no-show">No shows Added.</h2>`
            // <!-- Display a div with information about every post (if any)--> 
            : html`${items.map(item => cardTemplate(item))}`        
        }        
    </section>    
`;

const cardTemplate = (item) => html`
    <div class="show">
        <img src="${item.imageUrl}" alt="example1" />
        <div class="show-info">
            <h3 class="title">${item.title}</h3>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="country-of-origin">Country of Origin: ${item.country}</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </div>
    </div>
`;

export async function showDashboardView(ctx) {
    const items = await getAllItems();    
    render(dashboardTemplate(items));
}

