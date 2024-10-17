import { get, post, update, del } from './requester.js';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { tableTemplate, rowTemplate } from './templates.js';

const root = document.querySelector("body");

export async function showAddView() {
    render(tableTemplate(), root);
}

export async function loadAllBooks() {
    const tbody = document.querySelector("tbody");
    const books = await get("jsonstore/collections/books");
    render(html`${Object.entries(books).map((book) => rowTemplate(...book))}`, tbody);
}

export async function showEditView(event) {    
    render(tableTemplate("edit", event), root);   
}

export async function onSubmit(event) {
    event.preventDefault();    

    if(event.target.tagName !="FORM") {
        return
    }

    const formName = event.currentTarget.querySelector('h3').textContent;
    
    if (formName == "Add book") {
        const form = event.currentTarget;
        const formData = new FormData(form);
        const { title, author } = Object.fromEntries(formData.entries());

        if (!title || !author) {
            return alert("Empty field are NOT allowed!")
        }

        await post("jsonstore/collections/books", { author, title });
        loadAllBooks();
        form.reset();

    } else if (formName == "Edit book") {
        const formData = new FormData(event.currentTarget);
        const { title, author } = Object.fromEntries(formData.entries());

        if (!title || !author) {
            return alert("Empty field are NOT allowed!")
        }

        const bookId = event.currentTarget.querySelector('[type="submit"]').dataset.bookId;
        await update(`jsonstore/collections/books/${bookId}`, { author, title });

        showAddView();
        loadAllBooks();          
    }
}

export async function onDelete(event) {
    const bookId = event.currentTarget.parentElement.dataset.bookId;
    await del(`jsonstore/collections/books/${bookId}`);
    loadAllBooks();
}










