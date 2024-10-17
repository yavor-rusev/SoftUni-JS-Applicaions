import { html, render, TemplateResult } from "../common/lib.js";
import { loading } from "../partials/loading.js";
import { createSubmitHandler, updateNav, emailIsValid } from "../common/util.js";
import { registerUser } from "../user/userService.js";
import { goTo } from "../common/goTo.js";
import { showOverlay } from "./overlay.js";


/** 
 * @param {Function} handler 
 * @param {string} errorMessage 
 * @returns {TemplateResult}
 */
const registerTemplate = (handler, errorMessage) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form id="register-form" class="main-form pad-large" @submit=${handler} >
                ${errorMessage
                    ? html`<div class="error">${errorMessage}</div>`
                    : ""
                }
                
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
            <footer class="pad-small">
                Already have an account? <a href="/login" class="invert">Sign in here</a>
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
export function showRegisterView(ctx) {
    const handler = createSubmitHandler(onRegister);    
    render(registerTemplate(handler, null));

    context = ctx;
    context.handler = handler;
}


/** 
 * @param {{email: string, username: string, password: string, repass: string}} data 
 * @param {HTMLFormElement} form   
 */
async function onRegister(data, form) {
    if(!data.email || !data.username || !data.password || !data.repass) {
        return render(registerTemplate(context.handler, "All fields are required!"));
    }

    if(!emailIsValid(data.email)) {
        return render(registerTemplate(context.handler, "Invalid email!"));
    }

    if(data.username.length < 3) {
        return render(registerTemplate(context.handler, "Username should be at least 3 characters long!"));
    }

    if(data.password.length < 3) {
        return render(registerTemplate(context.handler, "Password should be at least 3 characters long!"));
    }

    if(data.password !== data.repass) {
        return render(registerTemplate(context.handler, "The two passwords are NOT the same"));
    }    
    
    loading();
    
    const {email, username, password} = data;

    try{
        await registerUser(email, username, password);

        form.reset();
        updateNav();
        goTo("/my-teams");

    } catch(err) {
        const previousPage = document.getElementById("loading").dataset.previousPage;        
        showOverlay(err.message, previousPage);
    }
}