"use strict";

import './css/styles.css';
const _ = require("lodash");
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


const countryListElement = country => {
    countryInfo.innerHTML = "";
    countryList.insertAdjacentHTML(
      'beforeend', 
    `
    <li><img src="${country.flags.svg}"/><h4>${country.name.official}</h4></li>
    `
  );
};

const countryInfoDetails = countries => {
    countryList.innerHTML = "";
    countryInfo.innerHTML = `
        <img src="${countries[0].flags.svg}"/><h3>${countries[0].name.official}</h3>
        <p><span class=""bold">Capital:</span> ${countries[0].capital}</p>
        <p><span class=""bold">Population:</span> ${countries[0].population}</p>
        <p><span class=""bold">Languages:</span> ${Object.values(countries[0].languages)}</p>                 
    `;
};


function printCountries(countries) {
    let countriesListHTML = "";
    if (countries.length === 1) {
        countriesListHTML += countryInfoDetails(countries);
    } else if (countries.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
        countries.forEach((country) => {
            countriesListHTML += countryListElement(country);
        }) 
    } 
};

searchBox.addEventListener("input", _.debounce(() => {
    fetchCountries(searchBox.value.trim())
        .then(countries => { printCountries(countries) });
    countryList.insertAdjacentHTML('beforeend', countriesListHTML);
    countryInfo.innerHTML = countriesListHTML;
}, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
}));


searchBox.addEventListener("keydown", (event) => {
    if (searchBox.textContent = "" || event.code === "Backspace" || event.code === "Delete") {
        countriesListHTML = "";
    }
});
  

// function printCountries(countries) {
//     let countriesListHTML = "";
//     if (countries.length === 1) {
//         countriesListHTML += `
//             <img src="${countries[0].flags.svg}"/><h3>${countries[0].name.official}</h3> 
//             <p>Capital: ${countries[0].capital}</p>
//             <p>Population: ${countries[0].population}</p>
//             <p>Languages: ${Object.values(countries[0].languages)}</p>                   
//     `
//     } else if (countries.length >= 10) {
//         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//     } else {
//         countries.forEach((country) => {
//             countriesListHTML += `
//             <img src="${country.flags.svg}"/><h4>${country.name.official}</h4> 
//         `
//         })
//     }
//         countryList.innerHTML = countriesListHTML;
// };

// searchBox.addEventListener("input", _.debounce(() => {
//     fetchCountries(searchBox.value.trim())
//         .then(countries => { printCountries(countries) });
// }, DEBOUNCE_DELAY, {
//     leading: false,
//     trailing: true,
// }));

// function clearOutput(){
//     if (searchBox.textContent = "") {
//         countriesListHTML = "";
//     }
// return
// };
