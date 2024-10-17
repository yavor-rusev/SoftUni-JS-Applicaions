import { html, render, page } from "../common/lib.js";
import { createSubmitHandler, updateNav } from "../common/util.js";
import { loginUser } from "../user/userService.js";


const loginTemplate = (handler) => html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${handler}>
                <input type="text" name="email" id="email" placeholder="email" />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    </section>
`;

export function showLoginView(ctx) {
    const handler = createSubmitHandler(onLogin);
    render(loginTemplate(handler));
}

async function onLogin(data, form) {
    const {email, password} = data;    
    await loginUser(email, password);

    form.reset();
    updateNav();
    page.redirect("/");
}