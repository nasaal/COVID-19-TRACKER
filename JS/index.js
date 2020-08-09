let countriesElem = document.getElementById("countries"),
  totalElem = document.getElementById("total"),
  activeElem = document.getElementById("active")
  recoveredElem = document.getElementById("recovered"),
  deathElem = document.getElementById("deaths"),
  countryElem = document.getElementById("country"),
  tbl = document.getElementById("covid-table"),
  globalCount = document.getElementById("global-count");

  let countriesList;

    window.onload = () => {
        getCountryData("Ghana", false);
        populateCountriesList(countriesList);
        populateTable(countriesList); 
    };

    countriesElem.addEventListener("change", function () {
        getCountryData(this.value, true); 
    });

    function getCountryData(country, state) {
        
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) 
            {
                countriesList = JSON.parse(xhr.response);
                let cty = countriesList.Countries.filter((c) => c.Country === country);
                if (cty.length == 0) {
                    return countryNotFound(country);
                    
                }

                displayCountryData(cty);
                
            }
        };

        xhr.open("GET", "https://api.covid19api.com/summary", state);
        xhr.send();
    }

    function displayCountryData(data) {
        countryElem.innerText = `${data[0].Country}'s Stats`;
        totalElem.innerText = data[0].TotalConfirmed;
        recoveredElem.innerText = data[0].TotalRecovered;
        deathElem.innerText = data[0].TotalDeaths;
        activeElem.innerText = data[0].NewConfirmed;
    }

    function countryNotFound(cty) {
        countryElem.innerText = `Country (${cty}) not found!`;
        countryElem.style.color = "red";
    }

    function populateTable(data) {
        let i = 1;
        tbl.innerHTML = data.Countries.map(
            (d) =>

            `
            <tr>

            <td>${i++}</td>
            <td>${d.Country}</td>
            <td>${d.TotalRecovered}</td>
            <td>${d.TotalConfirmed}</td>
            <td>${d.NewConfirmed}</td>
            <td>${d.TotalDeaths}</td>

            </tr>
            `
        ).join("");
        globalCount.innerText = `(${i})`; 
    }

    function populateCountriesList (data) {
        let list = data.Countries.map((c) => c.Country);
        countriesElem.innerHTML = list.map(
            (c) => `<option value="${c}">${c}</option>`
        );
    } 



    /*{
        "Global": {
            "NewConfirmed": 280887,
            "TotalConfirmed": 19377302,
            "NewDeaths": 6388,
            "TotalDeaths": 721312,
            "NewRecovered": 192526,
            "TotalRecovered": 11737276
        },
        "Countries": [
            {
                "Country": "Afghanistan",
                "CountryCode": "AF",
                "Slug": "afghanistan",
                "NewConfirmed": 119,
                "TotalConfirmed": 37015,
                "NewDeaths": 9,
                "TotalDeaths": 1307,
                "NewRecovered": 63,
                "TotalRecovered": 25903,
                "Date": "2020-08-08T14:13:01Z",
                "Premium": {}
            },
            {
                "Country": "Albania",
                "CountryCode": "AL",
                "Slug": "albania",
                "NewConfirmed": 135,
                "TotalConfirmed": 6151,
                "NewDeaths": 1,
                "TotalDeaths": 189,
                "NewRecovered": 72,
                "TotalRecovered": 3227,
                "Date": "2020-08-08T14:13:01Z",
                "Premium": {}
            },
            {
                "Country": "Algeria",
                "CountryCode": "DZ",
                "Slug": "algeria",
                "NewConfirmed": 529,
                "TotalConfirmed": 34155,
                "NewDeaths": 9,
                "TotalDeaths": 1282,
                "NewRecovered": 429,
                "TotalRecovered": 23667,
                "Date": "2020-08-08T14:13:01Z",
                "Premium": {}
            },*/