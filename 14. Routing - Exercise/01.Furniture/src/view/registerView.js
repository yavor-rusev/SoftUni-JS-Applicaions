import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";

const registerTemplate = () => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    context.updateNav();
    context.myRenderer(registerTemplate()); 
}

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const trimmedData = [...formData.entries()].map(([k, v]) => [k, v.trim()]);
    const {email, password, rePass} = Object.fromEntries(trimmedData);
   
    if(!email || !password || !rePass) {
        return alert("All fields are required!")
    }

    if(password !== rePass) {
        return alert("Passwords should match!")
    }

    const userData = await userService.registerUser({email, password});
    userHelper.setUserData(userData);

    context.updateNav();
    context.goTo("/");    
}