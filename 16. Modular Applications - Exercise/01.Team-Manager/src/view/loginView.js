import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { createSubmitHandler, updateNav, emailIsValid } from "../common/util.js";
import { loginUser } from "../user/userService.js";
import { goTo } from "../common/goTo.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {Function} handler 
 * @param {string} errorMessage 
 * @returns {TemplateResult}
 */
const loginTemplate = (handler, errorMessage) => html`
    <section id="login">
        <article class="narrow">
            <header class="pad-med">
                <h1>Login</h1>
            </header>
            <form id="login-form" class="main-form pad-large" @submit=${handler} >
                ${errorMessage
        ? html`<div class="error">${errorMessage}</div>`
        : ""
    }
                
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input class="action cta" type="submit" value="Sign In">
            </form>
            <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
            </footer>
        </article>
    </section>
`;


/**
 * @type {PageJS.Context}
 */
let context = null;


/** 
 * @param {PageJS.Context} ctx 
 */
export function showLoginView(ctx) {
    const handler = createSubmitHandler(onLogin);
    render(loginTemplate(handler, null));

    context = ctx;
    context.handler = handler;
}


/** 
 * @param {{email: string, password: string}} data 
 * @param {HTMLFormElement} form   
 */
async function onLogin(data, form) {
    if(!data.email || !data.password ) {
        return render(loginTemplate(context.handler, "All fields are required!"));
    }

    if(!emailIsValid(data.email)) {
        return render(loginTemplate(context.handler, "Invalid email!"));
    }   

    if(data.password.length < 3) {
        return render(loginTemplate(context.handler, "Password should be at least 3 characters long!"));
    }

    loading();

    const { email, password } = data;

    try{
        await loginUser(email, password );

        form.reset();
        updateNav();
        goTo("/my-teams");

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage);       
    }    
}