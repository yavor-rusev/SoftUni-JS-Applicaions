import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { addItem } from "../data/dataService.js";

const addTemplate = (handler) => html`
    <section id="create">
        <div class="form">
            <h2>Add tattoo</h2>
            <form class="create-form" @submit="${handler}" >
                <input
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Tattoo Type"
                />
                <input
                    type="text"
                    name="image-url"
                    id="image-url"
                    placeholder="Image URL"
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    rows="2"
                    cols="10"
                ></textarea>
                <select id="user-type" name="user-type">
                    <option value="" disabled selected>Select your role</option>
                    <option value="Tattoo Artist">Tattoo Artist</option>
                    <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                    <option value="First Time in Tattoo">First Time in Tattoo</option>
                    <option value="Tattoo Collector">Tattoo Collector</option>
                </select>
                <button type="submit">Add tattoo</button>
            </form>
        </div>
    </section>
`;

export function showAddView(ctx) {
    const handler = createSubmitHandler(onAdd);
    render(addTemplate(handler));
}

async function onAdd(data, form) {
    const { type, ["image-url"]: imageUrl, description, ["user-type"] : userType } = data;
        
    await addItem({ type, imageUrl, description, userType});

    page.redirect("/dashboard");
    form.reset();
}