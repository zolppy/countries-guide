const searchButton = document.querySelector('#countries-guide__search-button');

const cleanInput = (input) => {
  input.value = '';
  input.focus();
}

const getCountryName = () => {
  const countryNameInput = document.querySelector('#countries-guide__name-input');
  let countryName = countryNameInput.value;
  
  if (countryName) {
    cleanInput(countryNameInput);
  
    return countryName;
  }

  alert('Informe o nome de um país.');
  
  return null;
}

const getCountry = async (countryName) => {
  if (countryName) {
    return await
      fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json());
  }

  return null;
}

const showCountryInfo = (country) => {
  document.querySelector('#countries-guide__name').textContent = country[0].name.common;
  document.querySelector('#countries-guide__capital').textContent = country[0].capital;
  document.querySelector('#countries-guide__continent').textContent = country[0].continents[0];
  document.querySelector('#countries-guide__population').textContent = country[0].population;
  document.querySelector('#countries-guide__common-language')
    .textContent = Object.values(country[0].languages).toString().split(',').join(', ');

  document.querySelector('#countries-guide__flag').src = country[0].flags.svg;

  document.querySelector('#countries-guide__info').classList.remove('countries-guide__info--hidden');
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