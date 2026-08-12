lucide.createIcons();
//-----------------------XỬ LÍ DROPDOWN-------------------------------
function toggleDropdown(id) {
    const allDropdowns = document.querySelectorAll('.filter-dropdown');
    allDropdowns.forEach(d => {
        if (d.id !== id) d.classList.remove('active');
    });
    document.getElementById(id).classList.toggle('active');
}

function selectFilter(item) {
    const dropdown = item.closest('.filter-dropdown');
    const btnText = dropdown.querySelector('.filter-dropdown-btn span');
    btnText.textContent = item.textContent;
    dropdown.classList.remove('active');
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.filter-dropdown')) {
        document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('active'));
    }
});
//------------------------PHÂN TRANG-----------------------------------
const products = document.querySelectorAll('.product-card');
const pagination = document.getElementById('pagination');
const amountOfCard = 6;
let currentPage = 1;
const amountOfPage = Math.ceil(products.length / amountOfCard);

function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * amountOfCard;
    const endIndex = startIndex + amountOfCard;

    for (let i = 0; i < products.length; i++) {
        if (i >= startIndex && i < endIndex) {
            products[i].style.display = "flex";
        } else {
            products[i].style.display = "none";
        }
    }

    createPagination();
}

function createPagination() {
    pagination.innerHTML = "";
    for (let i = 1; i <= amountOfPage; i++) {
        const button = document.createElement("button");
        button.classList.add("page-number");
        button.textContent = i;

        if (i == currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            showPage(i);
        });
        pagination.appendChild(button);

    }

    const nextButton = document.createElement("button");
    nextButton.classList.add("page-number");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
        if (currentPage < amountOfPage) {
            showPage(currentPage + 1)
        }
    });
    pagination.appendChild(nextButton);

}
showPage(1);