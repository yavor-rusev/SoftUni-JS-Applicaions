import { html, render, page } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { getItemDetails, editItemDetails} from "../data/dataService.js"

const editTemplate = (item, handler) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit tattoo</h2>
            <form class="edit-form" @submit=${handler} >
                <input
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Tattoo Type"
                    .value=${item.type}
                />
                <input
                    type="text"
                    name="image-url"
                    id="image-url"
                    placeholder="Image URL"
                    .value=${item.imageUrl}
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    rows="2"
                    cols="10"
                    .value=${item.description}
                ></textarea>
                <select id="user-type" name="user-type" .value=${item.userType} >
                    <option value="" disabled selected>Select your role</option>
                    <option value="Tattoo Artist">Tattoo Artist</option>
                    <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                    <option value="First Time in Tattoo">First Time in Tattoo</option>
                    <option value="Tattoo Collector">Tattoo Collector</option>
                </select>
                <button type="submit">Edit</button>
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
        const {type, ["image-url"]: imageUrl, description, ["user-type"] : userType} = data;
        await editItemDetails(itemId, { type, imageUrl, description, userType});

        page.redirect(`/details/${itemId}`);        
    }
}


