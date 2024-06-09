async function getCountryDetails(code) {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        let country = await response.json();
        return country[0];
    } catch (error) {
        console.error('Error fetching country details:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    let params = new URLSearchParams(window.location.search);
    let countryCode = params.get('code');
    let details = document.getElementById('details');
    if (countryCode) {
        let country = await getCountryDetails(countryCode);
        if (country) {
            details.innerHTML = `
                <div class="card">
                    <img src="${country.flags.svg}" alt="flag of ${country.name.common}" />
                    <div class="card-text">
                        <h3>Country: ${country.name.common}</h3>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Subregion:</strong> ${country.subregion}</p>
                        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                        <p><strong>Borders:</strong> ${country.borders ? country.borders.join(', ') : 'N/A'}</p>
                        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
                    </div>
                </div>
            `;
        } else {
            details.innerHTML = '<p>Country details not found</p>';
        }
    } else {
        details.innerHTML = '<p>No country code provided in URL</p>';
    }
});