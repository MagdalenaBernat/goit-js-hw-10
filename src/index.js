"use strict";

import './css/styles.css';
const _ = require("lodash");
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
let countriesListHTML = "";
let li = "";
let img = "";
let heading = "";

const countryListElement = country => {
    li = document.createElement('li');
    img = document.createElement('img');
    heading = document.createElement('h4');
    img.src = country.flags.svg;
    heading.innerHTML = country.name.official;
    li.appendChild(img);
    li.appendChild(heading);
    countryList.appendChild(li);
};

const countryInfoDetails = countries => {
    clearCode();
    countryInfo.innerHTML = `
        <img src="${countries[0].flags.svg}"/><h3>${countries[0].name.official}</h3>
        <p><span class="bold">Capital:</span> ${countries[0].capital}</p>
        <p><span class="bold">Population:</span> ${countries[0].population}</p>
        <p><span class="bold">Languages:</span> ${Object.values(countries[0].languages)}</p>                 
    `;

};

const clearCode = () => { countryList.innerHTML = "" };

function printCountries(countries) {
    countriesListHTML = "";
    if (countries) {
        if (countries.length === 1) {
            clearCode();
            countryInfoDetails(countries);
        } else if (countries.length >= 10) {
            countryInfo.innerHTML = "";
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            clearCode();
            countryInfo.innerHTML = "";
            // let li = "";
            // let img = "";
            // let heading = "";
            countries.forEach((country) => {
                countryListElement(country);
            })
        }
    }
};

searchBox.addEventListener("input", _.debounce(() => {
    fetchCountries(searchBox.value.trim())
        .then(countries => {
            if (countries) {
            printCountries(countries)  
            }
        });
}, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
}));


searchBox.addEventListener("keydown", (event) => {
    if (searchBox.textContent = "" || event.code === "Backspace" || event.code === "Delete") {
        clearCode();
    }
});
