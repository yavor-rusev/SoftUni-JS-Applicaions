import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { getMotorcycleDetails, editMotorcycleDetails} from "../data/dataService.js"


const editTemplate = (item, handler) => html`
    <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
            <h2>Edit Motorcycle</h2>
            <form class="edit-form" @submit=${handler}>
                <input
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model"
                    .value=${item.model}
                />
                <input
                    type="text"
                    name="imageUrl"
                    id="moto-image"
                    placeholder="Moto Image"
                    .value=${item.imageUrl}
                />
                <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year"
                    .value=${item.year}
                />
                <input
                    type="number"
                    name="mileage"
                    id="mileage"
                    placeholder="mileage"
                    .value=${item.mileage}
                />
                <input
                    type="number"
                    name="contact"
                    id="contact"
                    placeholder="contact"
                    .value=${item.contact}
                />
                <textarea
                    id="about"
                    name="about"
                    placeholder="about"
                    rows="10"
                    cols="50"
                    .value=${item.about}
                ></textarea>
                <button type="submit">Edit Motorcycle</button>
            </form>
        </div>
    </section>`;

export async function showEditView(ctx) {
    const itemId = ctx.params.id;
    const item = await getMotorcycleDetails(itemId);

    const handler = createSubmitHandler(onEdit);
    render(editTemplate(item, handler));

    async function onEdit(data, form) { 
        const { model, imageUrl,  year,  mileage, contact, about} = data;

        const item = await editMotorcycleDetails(itemId, { model, imageUrl,  year,  mileage, contact, about});
        page.redirect(`/details/${itemId}`);        
    }
}

