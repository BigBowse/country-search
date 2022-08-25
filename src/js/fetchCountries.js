import Notiflix from 'notiflix';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
	  return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`
    )
		  .then(response => {
			  if (!response.ok) {
          throw new Error(response.status);
        }
			  return response.json()
		  }).catch(err => Notiflix.Notify.failure('Oops, there is no country with that name'));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}