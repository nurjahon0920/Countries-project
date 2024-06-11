async function getCountryDetails(code) {
  try {
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    let country = await response.json();
    return country[0];
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  let params = new URLSearchParams(window.location.search);
  let countryCode = params.get("code");
  let details = document.getElementById("details");
  if (countryCode) {
    let country = await getCountryDetails(countryCode);
    console.log(country);
    if (country) {
      details.innerHTML = `
                <div class="card">
                    <img src="${
                      country.flags.svg
                    }" class="details-img" alt="flag of ${
        country.name.common
      }" />
                    <div class="card-text">
                        <h3>${country.name.common}</h3>
                        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                        <p><b>Region:</b> ${country.region}</p>
                        <p><b>Subregion:</b> ${country.subregion}</p>
                        <p><b>Capital:</b> ${
                          country.capital ? country.capital[0] : "N/A"
                        }</p>
                        <p><b>Borders Countries:</b> ${
                          country.borders ? country.borders.join(", ") : "N/A"
                        }</p>
                        <p><b>Languages:</b> ${Object.values(
                          country.languages
                        ).join(", ")}</p>
                    </div>
                </div>
            `;
    } else {
      details.innerHTML = "<p>Country details not found</p>";
    }
  } else {
    details.innerHTML = "<p>No country code provided in URL</p>";
  }
});
