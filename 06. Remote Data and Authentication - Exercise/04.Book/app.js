const URL = 'http://localhost:3030/jsonstore/collections/books';

const tbodyRef = document.querySelector('tbody');
tbodyRef.replaceChildren();

document.getElementById('loadBooks').addEventListener('click', onLoadAllBooks);

const formRef = document.querySelector('form');
formRef.addEventListener('submit', manageBook);

const titleInputRef = document.querySelector('input[name="title"]');
const authorInputRef = document.querySelector('input[name="author"]');
const formButtonRef = document.querySelector('form button');

let bookId = '';
let titleToEdit = '';
let authorToEdit = '';

async function manageBook(event) {
    event.preventDefault();
    let currMethod = '';
    let currUrl = '';

    let formData = new FormData(formRef);
    let bookInfo = Object.fromEntries(formData);    

    if (!bookInfo.author || !bookInfo.title) {
        return
    }
    
    if (formButtonRef.textContent === "Submit") {
        currMethod = "POST";
        currUrl = URL;
    } else if (formButtonRef.textContent === "Save") {
        formRef.children[0].textContent = "FORM";
        formButtonRef.textContent = "Submit";

        if (bookInfo.title === titleToEdit && bookInfo.author === authorToEdit) {
            formRef.reset();            
            return;
        }
    
        currUrl = URL + "/" + bookId;
        currMethod = "PUT";        
    }

    try {
        await fetch(currUrl, {
            method: currMethod,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookInfo)
        })

        formRef.reset();
        onLoadAllBooks();

    } catch (error) {
        return;
    }
}

async function onLoadAllBooks(event) {
    try {
        let response = await fetch(URL);
        let data = await response.json();

        tbodyRef.replaceChildren();

        Object.entries(data).forEach(([id, bookInfo]) => {
            let tr = createRow(id, bookInfo);
            tbodyRef.appendChild(tr);
        })

    } catch (err) {
        return
    }
}

async function onEditBook(event) {
    bookId = event.target.dataset.id;
    titleToEdit = event.target.parentElement.parentElement.children[0].textContent;
    authorToEdit = event.target.parentElement.parentElement.children[1].textContent;

    formRef.children[0].textContent = "Edit FORM";
    titleInputRef.value = titleToEdit;
    authorInputRef.value = authorToEdit;
    formButtonRef.textContent = "Save";
}

async function onDelete(event) {
    let id = event.target.dataset.id;
    await fetch(URL + "/" + id, { method: "DELETE" });
    onLoadAllBooks();
}


function createRow(id, bookInfo) {
    let tr = document.createElement('tr');

    let titleTd = document.createElement('td');
    titleTd.textContent = bookInfo.title;

    let authorTd = document.createElement('td');
    authorTd.textContent = bookInfo.author;

    let actionTd = document.createElement('td');

    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.dataset.id = id;
    editBtn.addEventListener('click', onEditBook);
    actionTd.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = id;
    deleteBtn.addEventListener('click', onDelete);
    actionTd.appendChild(deleteBtn);

    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(actionTd);

    return tr;
}



