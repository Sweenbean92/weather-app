import React, { useState } from "react";
const api = {
    key: "906c759df0c1d54b1c40389e5e8bb7fc",
    base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className="app">
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>

                {(typeof weather.main != "undefined") ? (
                    <div className="details-box">
                        <div className="location-box">
                            <div className="location">{weather.name} {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}

            </main>
        </div>

    );
}

export default App;