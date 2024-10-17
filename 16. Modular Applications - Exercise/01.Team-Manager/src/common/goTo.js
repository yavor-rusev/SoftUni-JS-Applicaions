import { page } from "./lib.js";


/**
 * Navigates through Page.js.
 * @param {string} path - Expects endpoint
 */
export function goTo(path) {
    page.redirect(path);
}

