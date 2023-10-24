const searchButton = document.querySelector('#countries-guide__search-button');

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const cleanInput = (input) => {
  input.value = '';
  input.focus();
}

const getCountryName = () => {
  const countryNameInput = document.querySelector('#countries-guide__name-input');
  let countryName = countryNameInput.value.toString().trim();

  if (!countryName) {
    alert('Informe o nome de um país.');
  }

  cleanInput(countryNameInput);

  return countryName;
}

const getCountry = async (countryName) => {
  const country = await
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json());

  return country || null;
}

const showCountryInfo = (country) => {
  const infoContainer = document.querySelector('#countries-guide__info');
  const flagElement = document.querySelector('#countries-guide__flag');
  const name = document.querySelector('#countries-guide__name');
  const acronymElement = document.querySelector('#countries-guide__acronym');
  const officialNameElement = document.querySelector('#countries-guide__official-name');
  const currencyElement = document.querySelector('#countries-guide__currency');
  const currencySymbolElement = document.querySelector('#countries-guide__currency-symbol');
  const capitalElement = document.querySelector('#countries-guide__capital');
  const continentElement = document.querySelector('#countries-guide__continent');
  const populationElement = document.querySelector('#countries-guide__population');
  const areaElement = document.querySelector('#countries-guide__area');
  const languagesElement = document.querySelector('#countries-guide__common-language');
  const timezonesElement = document.querySelector('#countries-guide__timezones');
  const neighborsElement = document.querySelector('#countries-guide__neighbors');

  flagElement.src = country[0].flags.svg;
  name.textContent = country[0].name.common;
  acronymElement.textContent = country[0].cca3;
  officialNameElement.textContent = country[0].name.official;
  currencyElement.textContent = Object.values(country[0].currencies)[0].name;
  currencySymbolElement.textContent = Object.values(country[0].currencies)[0].symbol;
  capitalElement.textContent = country[0].capital;
  continentElement.textContent = country[0].continents[0];
  populationElement.textContent = formatNumber(country[0].population);
  areaElement.textContent = formatNumber(country[0].area);
  languagesElement.textContent = Object.values(country[0].languages).toString().split(',').join(', ');
  timezonesElement.textContent = country[0].timezones.join(', ');
  neighborsElement.textContent = country[0].borders.join(', ');

  infoContainer.classList.remove('countries-guide__info--hidden');
}

const main = async (e) => {
  e.preventDefault();
  
  let countryName = getCountryName();

  document.querySelector('#countries-guide__info').classList.add('countries-guide__info--hidden');

  if (countryName) {
    const description = document.querySelector('#countries-guide__description');
    description.classList.add('countries-guide__description--hidden');

    const loaderElement = document.querySelector('#countries-guide__loader');
    loaderElement.classList.remove('countries-guide__loader--hidden');
  
    try {
      const country = await getCountry(countryName);

      loaderElement.classList.add('countries-guide__loader--hidden');
    
      showCountryInfo(country);
    } catch (e) {
      description.classList.remove('countries-guide__description--hidden');
      alert('País inválido');
    }
  }
}

searchButton.addEventListener('click', (e) => main(e));