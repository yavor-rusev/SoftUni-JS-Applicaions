import { html, TemplateResult } from "../common/lib.js";


/**
 * Generates a paginator component with navigation links for previous, next, and specific page numbers. * 
 * @param {string} catalogName - The base URL for the catalog to paginate.
 * @param {number} pageNumber - The current page number. Defaults to 1 if not provided.
 * @param {number} countOfPages - The total number of pages to generate links for.
 * @returns {TemplateResult}  A Lit-HTML template result containing the pagination UI.
 */
export const paginator = (catalogName, pageNumber, countOfPages) => {
    if(!pageNumber) {
        pageNumber = 1;
    }

    const pageLinksArray = new Array(countOfPages).fill(0); 

    return html`        
        <div style="display: flex; justify-content: center; align-items: center">
            ${pageNumber > 1 ? html`<a href="${catalogName}?page=${pageNumber - 1}" style="margin: 5px" >&lt; Prev</a>` : null}
            ${pageLinksArray.map((_, index) => pageIndexTemplate(index + 1, pageNumber, catalogName))}
            ${pageNumber < countOfPages ? html`<a href="${catalogName}?page=${pageNumber + 1}" style="margin: 5px" >Next &gt;</a>` : null}            
        </div>        
    `;
}


/**
 * Creates a template for an individual page index in the pagination component.
 * @param {number} index - The page index to display.
 * @param {number} pageNumber - The currently active page number.
 * @param {string} catalogName - The base URL for the catalog to paginate.
 * @returns {TemplateResult}  A Lit-HTML template result displaying the page index as a link or highlighted span.
 */
const pageIndexTemplate = (index, pageNumber, catalogName) => {
    return html`
            ${index == pageNumber 
               ? html`<span style="margin: 5px" >${index}</span>` 
               : html`<a href="${catalogName}?page=${index}" style="margin: 5px" >${index}</a>`
            }`    
}

