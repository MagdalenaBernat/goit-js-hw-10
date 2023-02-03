export { fetchCountries };
import Notiflix from 'notiflix';

const searchBox = document.querySelector("#search-box");   
    
    
const COUNTRIES_API_URL = "https://restcountries.com";
const API_VERSION = "v3.1";

function fetchCountries(name) {
    return fetch(`${COUNTRIES_API_URL}/${API_VERSION}/name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => {
            if (response.ok) {
                return response.json();
    } else if(response.status === 404) {
       Notiflix.Notify.failure('Oops, there is no country with that name');
    return Promise.reject('error 404')
    } else {
      return Promise.reject('some other error: ' + response.status)
    }
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
};
