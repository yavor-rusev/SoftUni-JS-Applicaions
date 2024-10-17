import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.getElementById('allCats');

onload();

function onload() {
    render(ulTemplate(cats), root);
}

function ulTemplate(cats) {
    return html`<ul>${cats.map(cat => liTemplate(cat))}</ul>`;
}

function liTemplate(cat) {
    return html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${onClick} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>`
}

function onClick(event) {
    const detailsDiv = event.target.parentElement.querySelector('div');
    
    if(detailsDiv.style.display == "none") {
        detailsDiv.style.display = "block";
        event.target.textContent = "Hide status code"
    } else {
        detailsDiv.style.display = "none";
        event.target.textContent = "Show status code"
    }
}

