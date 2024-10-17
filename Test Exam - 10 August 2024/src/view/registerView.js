import { html, render, page } from "../common/lib.js";
import { createSubmitHandler, updateNav } from "../common/util.js";
import { registerUser } from "../user/userService.js";

const registerTemplate = (handler) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${handler} >
                <input
                    type="text"
                    name="email"
                    id="register-email"
                    placeholder="email"
                />
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="password"
                />
                <input
                    type="password"
                    name="re-password"
                    id="repeat-password"
                    placeholder="repeat password"
                />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`;

export function showRegisterView(ctx) {
    const handler = createSubmitHandler(onRegister);
    render(registerTemplate(handler));
}

async function onRegister(data, form) {
    if(data["password"] !== data["re-password"]) {
        return alert("The two passwords are NOT the same");
    }

    const {email, password} = data;
    await registerUser(email, password);

    form.reset();
    updateNav();
    page.redirect("/");
}