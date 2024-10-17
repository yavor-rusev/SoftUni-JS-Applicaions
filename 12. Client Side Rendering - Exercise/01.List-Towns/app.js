import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const towns = formData.get("towns").split(", ");

    const ulTemplate = (towns) => html`
    <ul>${towns.map(town => html`<li>${town}</li>`)}</ul>`

    render(ulTemplate(towns), root);
}

