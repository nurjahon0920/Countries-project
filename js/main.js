// const body = document.body;
// const btnLightDark = document.getElementById("light-dark");
// function handleLightDark() {
//   body.classList.toggle("dark");
// }
// btnLightDark.addEventListener("click", handleLightDark);

function myFunction() {
  let element = querySelector(".cards");
  element.classList.toggle("dark-mode");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let country = [
  {
    image: "../images/bayroq-1.png",
    title: "Germany",
    bold1: "Population: ",
    value1: "81,770,900",
    bold2: "Region: ",
    value2: "Europe",
    bold3: "Capital: ",
    value3: "Berlin",
  },
  {
    image: "../images/bayroq-2.png",
    title: "United States of America",
    bold1: "Population: ",
    value1: "323,947,000",
    bold2: "Region: ",
    value2: "Americas",
    bold3: "Capital: ",
    value3: "Washington, D.C.",
  },
  {
    image: "../images/bayroq-3.png",
    title: "Brazil",
    bold1: "Population: ",
    value1: "206,135,893",
    bold2: "Region: ",
    value2: "Americas",
    bold3: "Capital: ",
    value3: "Brasília",
  },
  {
    image: "../images/bayroq-4.png",
    title: "Iceland",
    bold1: "Population: ",
    value1: "334,300",
    bold2: "Region: ",
    value2: "Europe",
    bold3: "Capital: ",
    value3: "Reykjavík",
  },
  {
    image: "../images/bayroq-5.png",
    title: "Afghanistan",
    bold1: "Population: ",
    value1: "27,657,145",
    bold2: "Region: ",
    value2: "Asia",
    bold3: "Capital: ",
    value3: "Kabul",
  },
  {
    image: "../images/bayroq-6.png",
    title: "Åland Islands",
    bold1: "Population: ",
    value1: "28,875",
    bold2: "Region: ",
    value2: "Europe",
    bold3: "Capital: ",
    value3: "Mariehamn",
  },
  {
    image: "../images/bayroq-7.png",
    title: "Albania",
    bold1: "Population: ",
    value1: "2,886,026",
    bold2: "Region: ",
    value2: "Europe",
    bold3: "Capital: ",
    value3: "Tirana",
  },
  {
    image: "../images/bayroq-8.png",
    title: "Algeria",
    bold1: "Population: ",
    value1: "40,400,000",
    bold2: "Region: ",
    value2: "Africa",
    bold3: "Capital: ",
    value3: "Algiers",
  },
];

const cards = document.querySelector(".cards");
function displayProducts(data) {
  let str = "";
  data.forEach((country) => {
    str += `
           <div class="card">
           <img src=${country.image} alt="image"/>
           <div class="card-text">
           <h3>${country.title}</h3>
           <p class="bold"><span>${country.bold1}</span> ${country.value1}</p>
           <p class="bold"><span>${country.bold2}</span> ${country.value2}</p>
           <p class="bold"><span>${country.bold3}</span> ${country.value3}</p>
           </div>
           </div>
          `;
  });
  cards.innerHTML = str;
}
displayProducts(country);

//

//
const States = ["Africa", "America", "Asia", "Europe", "Oceania"];
//
const StatesFilter = document.querySelector(".States-filter");
const StatesSelect = document.querySelector(".States-select");
const searchNation = document.querySelector(".search-Nation");
const Nations = "Nations";
const Nation_State = "Nation_State";
let State = localStorage.getItem(Nation_State) || "all";
//

let getNations = () => {
  let filteredNations = Nations.filter(
    (Nation) =>
      (Nation.firstName.toLowerCase().includes(search) ||
        Nation.lastName.toLowerCase().includes(search)) &&
      (State === "Filter by Region" || Nation.State === State)
  );
  Nations_Info.innerHTML = filteredNations.map(getNationRow).join("");
};
let updateStates = () => {
  let StateOptions = States.map(
    (st) =>
      `<option value="${st}" class="Filterlash" ${
        st === State ? "selected" : ""
      }>${st}</option>`
  ).join("");
  StatesFilter.innerHTML = `<option value="Filter by Region">Filter by Region</option>${StateOptions}`;
  StatesSelect.innerHTML = StateOptions;
};
//
//
//
//
StatesFilter.addEventListener("change", function () {
  State = this.value;
  localStorage.setItem(Nation_State, State);
  getNations();
});
searchNation.addEventListener("keyup", () => {
  search = searchNation.value.trim().toLowerCase();
  getNations();
});
updateStates();
getNations();
