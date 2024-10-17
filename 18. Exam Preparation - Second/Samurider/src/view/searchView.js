import { html, render } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { get } from "../data/request.js";

const searchTemplate = (handler, query, searchedItems) => html`
    <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${handler}>
                <input
                type="text"
                name="search"
                id="search-input"
                />
                <button class="button-list">Search</button>
            </form>
        </div>
            <h4 id="result-heading">Results:</h4>
            ${query ? 
                html`
                <div class="search-result">
                    ${!searchedItems.length ?
                    html`<h2 class="no-avaliable">No result.</h2>` :
                    html`${searchedItems.map(item => cardTemplate(item))}` }                
                </div>`:
                ""}       
    </section>
`;

const cardTemplate = (item) => html`
    <div class="motorcycle">
        <img src="${item.imageUrl}" alt="example1" />
        <h3 class="model">${item.model}</h3>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>`

export function showSearchView(ctx) {
    const handler = createSubmitHandler(onSearch);
    render(searchTemplate(handler));

    async function onSearch(data, form) {        
        const query = data.search;
        const searchedItems = await getSearchedItems(query);       
    
        render(searchTemplate(handler, query, searchedItems));
    }

    async function getSearchedItems(query) {
        return get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);      
    }
}

