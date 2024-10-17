function solve() {
    const departBth = document.getElementById('depart');
    const arriveBth = document.getElementById('arrive');
    const infoRef = document.querySelector('#info span');

    let stopsInfo = {
        name: "",
        next: "depot"
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopsInfo.next}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            stopsInfo.name = data.name;
            stopsInfo.next = data.next;
            infoRef.textContent = `Next stop ${stopsInfo.name}`;

            departBth.disabled = true;
            arriveBth.disabled = false;

        } catch (err) {
            infoRef.textContent = "Error";
            departBth.disabled = true;
            arriveBth.disabled = true;
        }
    }

    function arrive() {
        infoRef.textContent = `Arriving at ${stopsInfo.name}`;
        departBth.disabled = false;
        arriveBth.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();