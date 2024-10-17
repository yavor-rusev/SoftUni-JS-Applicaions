import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { getItemDetails, editItemDetails} from "../data/dataService.js";

const editTemplate = (item, handler) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Show</h2>
            <form class="edit-form" @submit=${handler} >
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="TV Show title"
                    .value=${item.title}
                />
                <input
                    type="text"
                    name="image-url"
                    id="image-url"
                    placeholder="Image URL"
                    .value=${item.imageUrl}
                />
                <input
                    type="text"
                    name="genre"
                    id="genre"
                    placeholder="Genre"
                    .value=${item.genre}
                />
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    .value=${item.country}
                />
                <textarea
                    id="details"
                    name="details"
                    placeholder="Details"
                    rows="2"
                    cols="10"
                    .value=${item.details}
                ></textarea>
                <button type="submit">Edit Show</button>
            </form>
        </div>
    </section>
`;

export async function showEditView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemDetails(itemId);

    const handler = createSubmitHandler(onEdit);
    render(editTemplate(item, handler));

    async function onEdit(data, form) { 
        const { title, ["image-url"]: imageUrl, genre, country, details} = data;
        await editItemDetails(itemId, { title, imageUrl, genre, country, details});
        
        page.redirect(`/details/${itemId}`);        
    }
}

