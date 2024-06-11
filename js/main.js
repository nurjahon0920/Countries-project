async function getAllPosts() {
  try {
    let response = await fetch("https://restcountries.com/v3.1/all");
    let posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
  }
}

async function getPostById(postId) {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/alpha/${postId}`
    );
    let post = await response.json();
    return post[0];
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let cards = document.querySelector(".cards");
  const searchNation = document.querySelector(".search-Nation input");
  const StatesSelect = document.querySelector(".States-select");
  const States = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  let allCountries = [];
  const loadPosts = async () => {
    allCountries = await getAllPosts();
    displayProducts(allCountries);
    updateStates();
  };
  const displayProducts = (data) => {
    cards.innerHTML = "";
    data.forEach((country) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.dataset.postId = country.cca3;
      card.innerHTML = `
        
              <img src="${country.flags.svg}" alt="flag of ${
        country.name.common
      }" />
              <div class="card-text">
                  <h3>${country.name.common}</h3>
                  <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                  <p><b>Region:</b> ${country.region}</p>
                  <p><b>Capital:</b> ${
                    country.capital ? country.capital[0] : "N/A"
                  }</p>
              </div>
          `;
      cards.appendChild(card);
    });
  };
  cards.addEventListener("click", (e) => {
    let card = e.target.closest(".card");
    if (card) {
      let postId = card.dataset.postId;
      window.location.href = `card-details.html?code=${postId}`;
    }
  });
  const updateStates = () => {
    let stateOptions = States.map(
      (st) => `<option value="${st}">${st}</option>`
    ).join("");
    StatesSelect.innerHTML = `<option value="all">Filter by Region</option>${stateOptions}`;
  };
  const filterCountries = () => {
    let search = searchNation.value.trim().toLowerCase();
    let region = StatesSelect.value;
    let filteredCountries = allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(search) &&
        (region === "all" || country.region === region)
    );
    displayProducts(filteredCountries);
  };
  searchNation.addEventListener("input", filterCountries);
  StatesSelect.addEventListener("change", filterCountries);
  await loadPosts();
});

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
