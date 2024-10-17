function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onRefresh);

    const authorInputRef = document.querySelector('input[name="author"]');
    const contentInputRef = document.querySelector('input[name="content"]');
    
    const URL = 'http://localhost:3030/jsonstore/messenger';

    async function onRefresh() {
        const response = await fetch(URL);
        const data = await response.json();

        const textAreaRef = document.getElementById('messages');
        textAreaRef.textContent = "";

        Object.values(data).forEach((rec, i) => {
            if (i === 0) {
                textAreaRef.textContent += `${rec.author}: ${rec.content}`; 
            } else {
                textAreaRef.textContent += `\n${rec.author}: ${rec.content}`; 
            }                       
        })
    }

    async function onSubmit() {
        let author = authorInputRef.value.trim();
        let content = contentInputRef.value.trim();        

        let data = {author, content};

        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }

        await fetch(URL, options);        
    }
}

attachEvents();
