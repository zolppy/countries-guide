/* Este código pode ser ainda mais limpo */

const searchButton = document.querySelector('#search-button');

const getCountryName = () => {
  const countryInput = document.querySelector('#country-input');
  let countryName = countryInput.value;

  countryInput.value = '';
  countryInput.focus();

  return countryName;
}

async function getCountry(countryName) {
  return await
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json());
}

const showCountryInfo = (country) => {
  const countryNameElement = document.querySelector('#country-name');
  const capitalElement = document.querySelector('#capital');
  const continentElement = document.querySelector('#continent');
  const populationElement = document.querySelector('#population');
  const commonLanguageElement = document.querySelector('#common-language');
  const flagContainer = document.querySelector('#flag');

  countryNameElement.textContent = country[0].name.common;
  capitalElement.textContent = country[0].capital;
  continentElement.textContent = country[0].continents[0];
  populationElement.textContent = country[0].population;
  commonLanguageElement.textContent = Object.values(country[0].languages).toString().split(',').join(', ');

  flagContainer.src = country[0].flags.svg;

  const countryInfoContainer = document.querySelector('#country-info');
  countryInfoContainer.classList.remove('hide');
}

const hiddenDescription = () => {
  const description = document.querySelector('#description');

  description.classList.add('hide');
}

const main = async (e) => {
  e.preventDefault();
  hiddenDescription();
  showCountryInfo(await getCountry(getCountryName()));
}

searchButton.addEventListener('click', (e) => main(e));