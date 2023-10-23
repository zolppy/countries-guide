const searchButton = document.querySelector('#search-button');

const cleanInput = (input) => {
  input.value = '';
  input.focus();
}

const getCountryName = () => {
  const countryInput = document.querySelector('#country-input');
  let countryName = countryInput.value;
  
  if (countryName) {
    cleanInput(countryInput);
  
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
  document.querySelector('#country-name').textContent = country[0].name.common;
  document.querySelector('#capital').textContent = country[0].capital;
  document.querySelector('#continent').textContent = country[0].continents[0];
  document.querySelector('#population').textContent = country[0].population;
  document.querySelector('#common-language')
    .textContent = Object.values(country[0].languages).toString().split(',').join(', ');

  document.querySelector('#flag').src = country[0].flags.svg;

  document.querySelector('#country-info').classList.remove('hide');
}

const main = async (e) => {
  e.preventDefault();
  
  let countryName = getCountryName();

  document.querySelector('#country-info').classList.add('hide');

  if (countryName) {
    const description = document.querySelector('#description');
    description.classList.add('hide');

    const loaderElement = document.querySelector('.loader');
    loaderElement.classList.remove('hide');
  
    try {
      const country = await getCountry(countryName);

      loaderElement.classList.add('hide');
    
      showCountryInfo(country);
    } catch (e) {
      description.classList.remove('hide');
      alert('País inválido');
    }
  }
}

searchButton.addEventListener('click', (e) => main(e));