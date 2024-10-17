import { html, render, TemplateResult } from "../common/lib.js";
import { hasUser } from "../common/util.js";


/** 
 * @param {boolean} userIsLogged 
 * @returns {TemplateResult}
 */
const homeTemplate = (userIsLogged) => html`
    <section id="home">
        <article class="hero layout">
            <img src="./assets/team.png" class="left-col pad-med">
            <div class="pad-med tm-hero-col">
                <h2>Welcome to Team Manager!</h2>
                <p>Want to organize your peers? Create and manage a team for free.</p>
                <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                ${userIsLogged 
                    ? html`<a href="/browse-teams" class="action cta">Browse Teams</a>`
                    : html`<a href="/register" class="action cta">Sign Up Now</a>`
                }                
            </div>
        </article>
    </section>
`;


export function showHomeView() {
    const userIsLogged = hasUser();
    render(homeTemplate(userIsLogged));
}

