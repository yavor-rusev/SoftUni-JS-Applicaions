import { html, render } from "../common/lib.js";
import { createSubmitHandler } from "../common/util.js";
import { getSearchedItems } from "../data/dataService.js";

const searchTemplate = (handler, query, searchedItems) => html`
    <section id="search">
        <div class="form">
            <h2>Search</h2>
            <form class="search-form" @submit=${handler} >
                <input
                    type="text"
                    name="search"
                    id="search-input"
                />
                <button class="button-list">Search</button>
            </form>
        </div>
        <h4>Results:</h4>
        ${query 
            ? html`
                <div class="search-result">
                    ${!searchedItems.length 
                        ? html`<p class="no-result">There is no TV show with this title</p>` 
                        : html`${searchedItems.map(item => cardTemplate(item))}` }                
                </div>`
            : ""
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
            <a class="details-btn" href="/details/${item._id}" >Details</a>
        </div>
    </div>
`

export function showSearchView(ctx) {   
    const handler = createSubmitHandler(onSearch);     
    render(searchTemplate(handler));

    async function onSearch(data, form) {        
        const query = data.search;        
        const searchedItems = await getSearchedItems(query);       
    
        render(searchTemplate(handler, query, searchedItems));
    }    
}


