import { loginUser } from "./userService.js";
import {setUserData} from "./util.js";

let context = null;

export function showLoginView(ctx) {
    document.querySelector('main').replaceChildren();

    context = ctx;
    context.refs.main.appendChild(context.refs.loginDiv);

    const form = context.refs.main.querySelector('form');
    form.addEventListener('submit', onLogin);
}

async function onLogin(event) {
    event.preventDefault();   
   
    const form = event.currentTarget
    const formData = new FormData(form);    
    const {email, password } = Object.fromEntries(formData.entries());    

    if(email.length < 3 || password.length < 3) {
        return alert("Email and password should be at least 3 characters long!")
    }    

    const userData = await loginUser(context.endpoints.login, {email, password });
    setUserData(userData);

    form.reset();
    context.updateNav();
    context.goTo("/home");    
}