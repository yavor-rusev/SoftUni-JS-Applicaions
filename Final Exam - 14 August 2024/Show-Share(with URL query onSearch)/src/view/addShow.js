import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { addItem } from "../data/dataService.js";

const addTemplate = (handler) => html`
    <section id="create">
        <div class="form">
            <h2>Add Show</h2>
            <form class="create-form" @submit=${handler} >
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="TV Show title"
                />
                <input
                    type="text"
                    name="image-url"
                    id="image-url"
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    name="genre"
                    id="genre"
                    placeholder="Genre"
                />
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                />
                <textarea
                    id="details"
                    name="details"
                    placeholder="Details"
                    rows="2"
                    cols="10"
                ></textarea>
                <button type="submit">Add Show</button>
            </form>
        </div>
    </section>
`;

export function showAddView(ctx) {
    const handler = createSubmitHandler(onAdd);
    render(addTemplate(handler));
}

async function onAdd(data, form) {
    const {title, ["image-url"]: imageUrl, genre, country, details} = data;    
    await addItem({title, imageUrl, genre, country, details});

    page.redirect("/dashboard");
    form.reset();
}

