const apiKey = '7c14ca54390ee6b0f076e75a8d532a75'; 

function saveInput() {
    const city = document.getElementById("wetterInput").value.trim();
    if (city) {
        localStorage.setItem("wetterName", city);
        displayInput();
        getWeather(city); 
    } else {
        alert("Bitte geben Sie eine Stadt ein!");
    }
}

function loadInput() {
    const savedInput = localStorage.getItem("wetterName");
    if (savedInput) {
        document.getElementById("wetterInput").value = savedInput;
        getWeather(savedInput); 
    }
    displayInput();
}

function displayInput() {
    const savedInput = localStorage.getItem("wetterName");
    document.getElementById("output").innerText = savedInput ? `Wetter in ${savedInput} wird geladen...` : "Keine Eingabe";
}

function clearInput() {
    document.getElementById("wetterInput").value = "";
    localStorage.removeItem("wetterName");
    document.getElementById("output").innerText = "Keine Eingabe";
}

async function getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("output").innerHTML = `
                <h2>Wetter in ${city}:</h2>
                <p>Temperatur: ${data.main.temp} °C</p>
                <p>Beschreibung: ${data.weather[0].description}</p>
            `;
        } else {
            document.getElementById("output").innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById("output").innerText = "Fehler beim Abrufen der Wetterdaten.";
        console.error("Fehler:", error);
    }
}

window.onload = loadInput;

document.getElementById("wetterInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        saveInput(); 
    }
});