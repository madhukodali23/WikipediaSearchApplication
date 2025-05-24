let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.href = link;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBrEl = document.createElement("br");
    resultItemEl.appendChild(titleBrEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    let linkBrEl = document.createElement("br");
    resultItemEl.appendChild(linkBrEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    searchResultsEl.textContent = "";
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}


function searchWikipedia() {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value;
        spinnerEl.classList.remove("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
