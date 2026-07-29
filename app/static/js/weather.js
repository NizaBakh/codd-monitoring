async function loadWeather() {

    try {

        const response = await fetch("/api/weather/current");

        if (!response.ok) return;

        const w = await response.json();

        weatherTemp.innerHTML = `${Math.round(w.temperature)}°C`;

        weatherDesc.innerHTML = w.description.replace(/^.\s/, "");

        weatherIcon.innerHTML = w.description.split(" ")[0];

        popupCity.innerHTML = "📍 " + w.city;

        popupTemp.innerHTML = w.temperature + "°C";

        popupFeels.innerHTML = w.feels_like + "°C";

        popupHumidity.innerHTML = w.humidity + "%";

        popupWind.innerHTML = w.wind + " м/с";

        popupClouds.innerHTML = w.clouds + "%";

        popupRain.innerHTML = w.precipitation + " мм";

        popupVisibility.innerHTML = w.visibility.toFixed(1) + " км";

    }

    catch(e){

        console.error(e);

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    loadWeather();

    setInterval(loadWeather,300000);

    const box=document.getElementById("weatherBox");

    const popup=document.getElementById("weatherPopup");

    let weatherOpened = false;

    box.addEventListener("click", function (e) {

        e.stopPropagation();

        weatherOpened = !weatherOpened;

        popup.style.display = weatherOpened ? "block" : "none";

    });

    document.addEventListener("click", function () {

        popup.style.display = "none";

        weatherOpened = false;

    });

  

});