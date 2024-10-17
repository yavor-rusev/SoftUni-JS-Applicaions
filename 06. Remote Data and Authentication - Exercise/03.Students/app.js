const URL = 'http://localhost:3030/jsonstore/collections/students';
window.addEventListener('load', showStudents);

const formRef = document.getElementById('form');
formRef.addEventListener('submit', uploadStudent);

async function showStudents() {
    try {
        const tbodyRef = document.querySelector('tbody');
        tbodyRef.replaceChildren();

        let data = await collectData();
        Object.values(data).forEach(rec => {
            let tr = createRow(rec);
            tbodyRef.appendChild(tr);
        })
    } catch (er) {
        return collectData();
    }

}

function createRow(data) {
    let tr = document.createElement('tr');

    let firstNameTd = document.createElement('td');
    firstNameTd.textContent = data.firstName;
    tr.appendChild(firstNameTd);

    let lastNameTd = document.createElement('td');
    lastNameTd.textContent = data.lastName;
    tr.appendChild(lastNameTd);

    let facultyNumberTd = document.createElement('td');
    facultyNumberTd.textContent = data.facultyNumber;
    tr.appendChild(facultyNumberTd);

    let gradeTd = document.createElement('td');
    gradeTd.textContent = Number(data.grade).toFixed(2);
    tr.appendChild(gradeTd);

    return tr;
}

async function collectData() {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
}

async function uploadStudent(event) {
    event.preventDefault();
    let formData = new FormData(formRef);
    let studentData = Object.fromEntries(formData.entries());


    if (Number(studentData.facultyNumber) !== Math.trunc(Number(studentData.facultyNumber))) {
        return
    }    
    
    if (isNaN(studentData.grade)) {
        return
    }

    if(studentData.grade < 2 || studentData.grade > 6) {
        return
    }

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
    }

    await fetch(URL, options);

    showStudents();
}

