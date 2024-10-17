import { html, render } from "../common/lib.js";

/**
 * Middleware for Page.js.
     - Renders loading section while REST requests are awaited. 
 */
export function loading() {    
    const previousPage = window.location.pathname;    
    render(html`<section id="loading" data-previous-page=${previousPage} ><div><p>Loading&hellip;</p></div></section>`);     
}