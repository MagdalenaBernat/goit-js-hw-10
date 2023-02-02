"use strict";

import './css/styles.css';
const _ = require("lodash");
import Notiflix from 'notiflix';
import { fetchCountries, fetchSelectedCountry } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function printCountries(countries) {
    let countriesListHTML = "";

    countries.forEach((country) => {
        countriesListHTML += `
        <ul>
            <li>
                <h4>${country.flags.svg} ${country.name.official}</h3> 
            </li>                   
        <ul>
        `
    })
    countryList.innerHTML = countriesListHTML;
};

function printCountryInfo(oneCountry) {
    let countryInfoHTML = "";
    country.forEach((country) => {
        countryInfoHTML += `
        <li>
            <h3>${country.flags.svg} ${country.name.official}</h3> 
            <p>"Capital: " ${country.capital}</p>
            <p>"Population: " ${country.population}</p>
            <p>"Languages: " ${country.languages}</p>  
        </li>                   
    `
    })
    countryInfo.innerHTML = countryInfoHTML;
};

searchBox.addEventListener("keydown", _.debounce(() => {
    searchBox.textContent.trim();
    fetchCountries();
}, 300, {
    leading: false,
    trailing: true,
}));



function wrongCountryName () {
    if (searchBox.textContent.value != fetchCountries.textContent.value) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }
};

const matchedCountries = () => {
    if (printCountries.value >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (printCountries.value >= 2 && printCountries.value > 10) {
        printCountries();
    } else if (printCountries.value = 1) {
        printCountryInfo();
    };
};

