function attachEvents() {
    const URL = 'http://localhost:3030/jsonstore/phonebook';

    const ulRef = document.getElementById('phonebook');

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    const personInputRef = document.getElementById('person');
    const phoneInputRef = document.getElementById('phone');

    async function onLoad(event) {
        ulRef.textContent = "";

        const response = await fetch(URL);
        const data = await response.json();

        Object.entries(data).forEach(([key, rec]) => {
            let li = document.createElement('li');
            li.textContent = `${rec.person}: ${rec.phone}`;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.dataset.id = key;
            deleteBtn.addEventListener('click', onDelete);

            li.appendChild(deleteBtn);
            ulRef.appendChild(li);
        })
    }

    async function onDelete(event) {
        let recUrl = URL + "/" + event.target.dataset.id;
        let option = { method: 'DELETE' };

        await fetch(recUrl, option);
        onLoad();
    }

    async function onCreate(event) {
        let person = personInputRef.value.trim();
        let phone = phoneInputRef.value.trim();

        if (!person || !phone) {
            return;
        }

        let data = {
            person,
            phone
        }

        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        await fetch(URL, option);

        personInputRef.value = "";
        phoneInputRef.value = "";

        onLoad();
    }
}

attachEvents();