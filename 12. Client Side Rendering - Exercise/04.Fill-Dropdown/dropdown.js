import { html, render} from './node_modules/lit-html/lit-html.js';

const URL = "http://localhost:3030/jsonstore/advanced/dropdown";
const root = document.getElementById('menu');
document.querySelector("form").addEventListener("submit", onSubmit);

onLoad();

async function onLoad() {
    const items = Object.values(await getItems());   
    render(items.map(item => optionTemplate(item)), root);
}

function optionTemplate(item) {
    return html`<option value=${item._id}>${item.text}</option>`;
}

async function getItems() {    
    const response = await fetch(URL);
    const items = await response.json();
    return items;
}

async function onSubmit(event) {
    event.preventDefault();  
    const input = document.getElementById("itemText");
    const itemText = input.value;
    input.value = "";
    
    await addItem(itemText);
    onLoad()
}

async function addItem(itemText) {   
    try{
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({"text": itemText})
        });
        
        const data = await response.json();
        return data;

    } catch(error) {
        return alert(error.message)
    }   
}