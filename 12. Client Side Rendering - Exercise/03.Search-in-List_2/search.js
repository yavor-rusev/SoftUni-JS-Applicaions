import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const root = document.getElementById('towns');
const resultRoot = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);

onload(towns);

function onload(towns) {
   render(ulTemplate(towns), root);
}

function search(event) {
   const text = event.target.parentElement.querySelector('input').value;   
   const matches = towns.filter(town => town.includes(text));
     
   render(ulTemplate(towns, text), root);

   const activeElements = root.querySelectorAll('[class="active"]');   
   resultRoot.textContent = `${activeElements.length} matches found`;
}

function ulTemplate(towns, text) {
   return html`<ul>${towns.map(town => liTemplate(town, text))}</ul>`;
}

function liTemplate(town, text) {
   const isActive = town.includes(text);
   return html`<li class=${isActive ? "active" : ""}>${town}</li>`
}
