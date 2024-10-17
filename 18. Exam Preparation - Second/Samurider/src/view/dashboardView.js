import { html, render } from "../common/lib.js";
import {getAllMotorcycles} from "../data/dataService.js";

const dashboardTemplate = (items) => html`
    <h2>Available Motorcycles</h2>
    <section id="dashboard">   
        ${!items.length ? 
            html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` :
            html`${items.map(item => cardTemplate(item))}`        
        }       
    </section>   
`;

const cardTemplate = (item) => html`
    <div class="motorcycle">
        <img src="${item.imageUrl}" alt="example1" />
        <h3 class="model">${item.model}</h3>
        <p class="year">Year: ${item.year}</p>
        <p class="mileage">Mileage: ${item.mileage} km.</p>
        <p class="contact">Contact Number: ${item.contact}</p>
        <a class="details-btn" href="/details/${item._id}" data-ownerId=${item._ownerId} >More Info</a>
    </div>
`;

export async function showDashboardView(ctx) {    
    const items = await getAllMotorcycles();    
    render(dashboardTemplate(items));
}
