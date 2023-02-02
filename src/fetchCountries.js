"use strict";

export { fetchCountries, fetchSelectedCountry };


const COUNTRIES_API_URL = "https://restcountries.com/v3.1/name/{name}";
// selected country URL pattern: https://restcountries.com/v2/{service}?fields={field},{field},{field}
const SELECTED_COUNTRY = "https://restcountries.com/v2/{all}?fields={name.official},{capital},{population},{flags.svg},{languages}";

function fetchCountries(name){
    fetch(COUNTRIES_API_URL)
        .then((response) => response.json())
        .then((countries) => {
            if (searchBox.textContent.value != fetchCountries.textContent.value) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else {
                printCountries();
            };
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
};

function fetchSelectedCountry(){
    fetch(SELECTED_COUNTRY)
        .then((response) => response.json())
        .then((oneCountry) => {
            if (searchBox.textContent.value != fetchCountries.textContent.value) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else {
                printCountryInfo();
            };
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
};