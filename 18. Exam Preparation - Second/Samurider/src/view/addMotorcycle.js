import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { addMotorcycle } from "../data/dataService.js";


const addTemplate = (handler) => html`
    <section id="create">
        <h2>Add Motorcycle</h2>
        <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${handler}>
                <input
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model"
                />
                <input
                    type="text"
                    name="imageUrl"
                    id="moto-image"
                    placeholder="Moto Image"
                />
                <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year"
                />
                <input
                    type="number"
                    name="mileage"
                    id="mileage"
                    placeholder="mileage"
                />
                <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="contact"
                />
                <textarea
                    id="about"
                    name="about"
                    placeholder="about"
                    rows="10"
                    cols="50"
                ></textarea>
                <button type="submit">Add Motorcycle</button>
            </form>
        </div>
    </section>
`;

export function showAddMotorcycleView(ctx) {
    const handler = createSubmitHandler(onCreate);
    render(addTemplate(handler));
}

async function onCreate(data, form) {
    const {model, imageUrl, year, mileage, contact, about} = data;
    await addMotorcycle({model, imageUrl, year, mileage, contact, about});

    page.redirect("/dashboard");
    form.reset();
}