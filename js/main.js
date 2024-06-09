async function getAllPosts() {
  try {
      let response = await fetch('https://restcountries.com/v3.1/all');
      let posts = await response.json();
      return posts;
  } catch (error) {
      console.error('Error fetching all posts:', error);
  }
}

async function getPostById(postId) {
  try {
      let response = await fetch(`https://restcountries.com/v3.1/alpha/${postId}`);
      let post = await response.json();
      return post[0];
  } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let cards = document.querySelector('.cards');
  const searchNation = document.querySelector('.search-Nation input');
  const StatesSelect = document.querySelector('.States-select');
  const States = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  let allCountries = [];

  // Function to load all posts and display them as cards
  const loadPosts = async () => {
      allCountries = await getAllPosts();
      displayProducts(allCountries);
      updateStates();
  };

  // Function to display products
  const displayProducts = (data) => {
      cards.innerHTML = '';
      data.forEach(country => {
          let card = document.createElement('div');
          card.classList.add('card');
          card.dataset.postId = country.cca3;
          card.innerHTML = `
              <img src="${country.flags.svg}" alt="flag of ${country.name.common}" />
              <div class="card-text">
                  <h3>${country.name.common}</h3>
                  <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> ${country.region}</p>
                  <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
              </div>
          `;
          cards.appendChild(card);
      });
  };

  // Event listener for card clicks to navigate to details page
  cards.addEventListener('click', (e) => {
      let card = e.target.closest('.card');
      if (card) {
          let postId = card.dataset.postId;
          window.location.href = `card-details.html?code=${postId}`;
      }
  });

  // Update states select options
  const updateStates = () => {
      let stateOptions = States.map(
          (st) => `<option value="${st}">${st}</option>`
      ).join("");
      StatesSelect.innerHTML = `<option value="all">Filter by Region</option>${stateOptions}`;
  };

  // Filter countries by search and region
  const filterCountries = () => {
      let search = searchNation.value.trim().toLowerCase();
      let region = StatesSelect.value;
      let filteredCountries = allCountries.filter(country =>
          (country.name.common.toLowerCase().includes(search) ||
          (country.capital && country.capital[0].toLowerCase().includes(search))) &&
          (region === 'all' || country.region === region)
      );
      displayProducts(filteredCountries);
  };

  // Event listeners for search and select
  searchNation.addEventListener('input', filterCountries);
  StatesSelect.addEventListener('change', filterCountries);

  // Load all posts when the page loads
  await loadPosts();
});

//
//
//
//
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}