"use strict";

import './css/styles.css';
const _ = require("lodash");
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function printCountries(countries) {
    let countriesListHTML = "";
    if (countries.length === 1) {
        countriesListHTML += `
        <div>
            <img src="${countries[0].flags.svg}"/><h3>${countries[0].name.official}</h3> 
            <p>Capital: ${countries[0].capital}</p>
            <p>Population: ${countries[0].population}</p>
            <p>Languages: ${Object.values(countries[0].languages)}</p>  
        </div>                   
    `
    } else if (countries.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
        countries.forEach((country) => {
            countriesListHTML += `
        <div>
            <img src="${country.flags.svg}"/><h4>${country.name.official}</h4> 
        </div>
        `
        })
    }
        countryList.innerHTML = countriesListHTML;
};

searchBox.addEventListener("input", _.debounce(() => {
    searchBox.textContent.trim();
   fetchCountries(searchBox.value).then(countries => {printCountries(countries)});
}, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
}));

