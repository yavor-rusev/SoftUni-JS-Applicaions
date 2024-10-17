import {html, render as renderBase, TemplateResult} from "../../node_modules/lit-html/lit-html.js";
import {classMap} from "../../node_modules/lit-html/directives/class-map.js";
import {styleMap} from "../../node_modules/lit-html/directives/style-map.js";
import page from "../../node_modules/page/page.mjs";


/**
 * @type {HTMLElement}
 */
const root = document.querySelector("main");

/**
 * Renders lit-html result template to root HTML element.
 * @param {TemplateResult} templateResult 
 */
function render(templateResult) {
    renderBase(templateResult, root);
}

export {
    html,
    render,
    TemplateResult,
    classMap,
    styleMap, 
    page
}