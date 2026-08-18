const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

let products = [];

fetch("/assets/json/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.error(error));


searchInput.addEventListener("input", function () {

    const keyword = this.value.trim().toLowerCase();

    if (keyword === "") {
        searchResults.style.display = "none";
        searchResults.innerHTML = "";
        return;
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    searchResults.innerHTML = "";

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="no-result">
                No product found
            </div>
        `;

    } else {

        results.forEach(product => {

            const item = document.createElement("div");
            item.classList.add("search-result");

            item.innerHTML = `
                <div class="search-result__info">
                    <span class="search-result__name">
                        ${product.name}
                    </span>

                    <span class="search-result__price">
                        ${product.price}
                    </span>
                </div>
            `;

            item.addEventListener("click", () => {
                window.location.href =
                    `./product-detail.html?id=${product.id}`;
            });

            searchResults.appendChild(item);
        });
    }

    searchResults.style.display = "block";
});