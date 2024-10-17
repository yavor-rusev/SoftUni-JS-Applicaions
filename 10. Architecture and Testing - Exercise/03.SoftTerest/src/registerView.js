import { registerUser } from "./userService.js";
import { setUserData } from "./util.js";

let context = null;

export function showRegisterView(ctx) {   
    document.querySelector('main').replaceChildren();

    context = ctx;
    context.refs.main.appendChild(context.refs.registerDiv);

    const form = context.refs.main.querySelector('form');
    form.addEventListener('submit', onRegister);
}

async function onRegister(event) {
    event.preventDefault();
    
    const form = event.currentTarget
    const formData = new FormData(form);
    const { email, password, repeatPassword } = Object.fromEntries(formData.entries());

    if (email.length < 3 || password.length < 3 || repeatPassword.length < 3) {
        return alert("Email and password should be at least 3 characters long!");
    }

    if (password !== repeatPassword) {
        return alert("Two passwords should be the same!");
    }

    const userData = await registerUser(context.endpoints.register, { email, password });
    setUserData(userData);

    form.reset();
    context.updateNav();
    context.goTo("/home");
}