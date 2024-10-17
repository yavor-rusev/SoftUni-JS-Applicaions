import { html } from '../node_modules/lit-html/lit-html.js';
import { showEditView, loadAllBooks, onSubmit, onDelete } from './view.js';

export function tableTemplate(formType, event) {    
    return html`
        <button @click=${loadAllBooks} id="loadBooks">LOAD ALL BOOKS</button> 
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>  
            </tbody>
        </table>
        ${formType == "edit" ? editFormTemplate(event) : addFormTemplate()}`
}

export function addFormTemplate() {
    return html`
            <form @submit=${onSubmit} id="add-form">
                <h3>Add book</h3>
                <label>TITLE</label>
                <input type="text" name="title" placeholder="Title...">
                <label>AUTHOR</label>
                <input type="text" name="author" placeholder="Author...">
                <input type="submit" value="Submit">          
            </form>           
            `;
}

export function editFormTemplate(event) {    
    const { title, author } = JSON.parse(event.target.parentElement.dataset.bookData);
    const bookId = event.target.parentElement.dataset.bookId;
   
    return html`
            <form @submit=${onSubmit} id="edit-form">
                <input type="hidden" name="id">
                <h3>Edit book</h3>
                <label>TITLE</label>
                <input .value=${title} type="text" name="title" placeholder="Title...">
                <label>AUTHOR</label>
                <input .value=${author} type="text" name="author" placeholder="Author...">
                <input data-book-id=${bookId} type="submit" value="Save">
            </form>`
}

export function rowTemplate(bookId, bookData) {
    return html`
        <tr>
            <td>${bookData.title}</td>
            <td>${bookData.author}</td>
            <td data-book-data=${JSON.stringify(bookData)} data-book-id=${bookId}>
                <button @click=${showEditView}>Edit</button>
                <button @click=${onDelete}>Delete</button>
            </td>
        </tr>`
}