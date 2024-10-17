
import { setUserData } from "./util.js";
import { uploadIdea } from "./dataService.js";

let context = null;

export function showCreateView(ctx) {   
    document.querySelector('main').replaceChildren();

    context = ctx;
    context.refs.main.appendChild(context.refs.createDiv);

    const form = context.refs.main.querySelector('form');
    form.method = "";
    form.action = "";
    form.addEventListener('submit', onCreate);
}

async function onCreate(event) {
    event.preventDefault();    

    const form = event.currentTarget
    const formData = new FormData(form);
    const { title, description, imageURL } = Object.fromEntries(formData.entries());   

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return alert("Incorrect input!");
    }   

    await uploadIdea(context, { title, description, imageURL});   

    form.reset();    
    context.goTo("/dashboard");
}