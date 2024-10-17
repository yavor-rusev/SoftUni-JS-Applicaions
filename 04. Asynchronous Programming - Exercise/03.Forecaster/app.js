function attachEvents() {
    const userInputRef = document.getElementById('location');
    document.getElementById('submit').addEventListener('click', getCityCode);

    let forecastMainDivRef = document.getElementById('forecast');
    let currentForecastContainerRef = document.getElementById('current');
    let upcomingForecastContainerRef = document.getElementById('upcoming');

    const url = "http://localhost:3030/jsonstore/forecaster/locations";

    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    async function getCityCode() {
        if (forecastMainDivRef.textContent === "Error") {
            forecastMainDivRef.innerHTML =
                '<div id="current"><div class="label">Current conditions</div></div>' +
                '<div id="upcoming"><div class="label">Three-day forecast</div></div>';

            forecastMainDivRef = document.getElementById('forecast');
            currentForecastContainerRef = document.getElementById('current');
            upcomingForecastContainerRef = document.getElementById('upcoming');
        };

        forecastMainDivRef.style.display = "block";

        try {
            const response = await fetch(url);
            const data = await response.json();

            let userInput = userInputRef.value;

            let cityCode = data.find(city => city.name === userInput).code;

            currentForecastContainerRef.innerHTML = '<div class="label">Current conditions</div>';
            upcomingForecastContainerRef.innerHTML = '<div class="label">Three-day forecast</div>';

            todayForcast(cityCode);
            upcomingForcast(cityCode);
        } catch (err) {
            forecastMainDivRef.textContent = "Error";
        }
    }

    async function todayForcast(cityCode) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${cityCode}`;

        const response = await fetch(url);
        const data = await response.json();

        let todayForcastContainer = createTodayForcast(data);
        currentForecastContainerRef.appendChild(todayForcastContainer);
    }

    async function upcomingForcast(cityCode) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`;

        const response = await fetch(url);
        const data = await response.json();

        let threeDaysDivContainer = e("div", "forecast-info");

        let treeDaysDataArray = data.forecast;
        treeDaysDataArray.forEach(forecastObj => {
            let oneDaySpanContainer = createOneDaySpanContainer(forecastObj);
            threeDaysDivContainer.appendChild(oneDaySpanContainer);
        });

        upcomingForecastContainerRef.appendChild(threeDaysDivContainer);
    }

    function createOneDaySpanContainer(forecastObj) {
        let oneDaySpanContainer = e("span", "upcoming");

        let symbolSpan = e("span", "symbol", symbols[forecastObj.condition]);
        oneDaySpanContainer.appendChild(symbolSpan);
        let temperatureSpan = e("span", "forecast-data", `${forecastObj.low}${symbols.Degrees}/${forecastObj.high}${symbols.Degrees}`);
        oneDaySpanContainer.appendChild(temperatureSpan);
        let weatherSpan = e("span", "forecast-data", forecastObj.condition);
        oneDaySpanContainer.appendChild(weatherSpan);

        return oneDaySpanContainer;
    }

    function createTodayForcast(data) {
        let div = e("div", "forecasts");

        let symbolSpan = e("span", "condition", symbols[data.forecast.condition], "symbol");
        div.appendChild(symbolSpan);

        let conditionSpan = e("span", "condition");

        let nameSpan = e("span", "forecast-data", data.name);
        conditionSpan.appendChild(nameSpan);
        let temperatureSpan = e("span", "forecast-data", `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`);
        conditionSpan.appendChild(temperatureSpan);
        let weatherSpan = e("span", "forecast-data", data.forecast.condition);
        conditionSpan.appendChild(weatherSpan);

        div.appendChild(conditionSpan);

        return div;
    }

    function e(type, firstClass, content, secondClass) {
        let el = document.createElement(type);
        el.classList.add(firstClass);

        if (content) {
            el.innerHTML = content;
        }

        if (secondClass) {
            el.classList.add(secondClass);
        }

        return el;
    }
}

attachEvents();