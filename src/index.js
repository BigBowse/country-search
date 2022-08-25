import './css/styles.css';
import NewsApiService from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryMarkup from './templates/country.hbs';
import countriesMarkup from './templates/countries.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const newsApiService = new NewsApiService();

function onSearch(e) {
    clearCountryContainer();
  
    newsApiService.query = e.target.value.trim();
    newsApiService.fetchCountries().then(appendCountryMarkup);
  }

function clearCountryContainer() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function appendCountryMarkup(country) {
  if (country.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (country.length <= 10 || country.length > 1) {
    const markupAllCountries = countriesMarkup(country);
    refs.countryList.insertAdjacentHTML('beforeend', markupAllCountries);
  }
  if (country.length === 1) {
    clearCountryContainer();
    const markupOneCountry = countryMarkup(country);
    refs.countryInfo.insertAdjacentHTML('beforeend', markupOneCountry);
  }
}

