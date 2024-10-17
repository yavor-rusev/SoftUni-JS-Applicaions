function getInfo() {
    const stopIdRef = document.getElementById('stopId');
    const stopNameRef = document.getElementById('stopName');
    const busesListRef = document.getElementById('buses');

    let stopId = stopIdRef.value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    manageData();

    async function manageData() {
        stopNameRef.innerHTML = "";
        busesListRef.innerHTML = "";

        try {
            let response = await fetch(url);
            let data = await response.json();

            stopNameRef.textContent = data.name;

            let busesAsMatrix = Object.entries(data.buses);

            busesAsMatrix.forEach(([bus, time]) => {
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${time} minutes`;
                busesListRef.appendChild(li);
            })
        } catch (err) {
            stopNameRef.textContent = 'Error';
        }
    }
}