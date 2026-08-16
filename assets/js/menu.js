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

//Fetch va gender -------------------------------
const showCard = document.getElementById('showCard');
const pagination = document.getElementById('pagination');
const amountOfCard = 6;
let currentPage = 1;
let allProducts = [];

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <div class="product-image">
            <img src="/assets/img/icon-section3/img_product.png" alt="${product.name}">
            <div class="rating">
                <span>4.8</span>
                <span class="star">★</span>
            </div>
        </div>
        <div class="product-info">
            <div class="product-text">
                <h3>${product.name}</h3>
                <p>${product.s_description}</p>
            </div>
            <div class="product-right">
                <span class="price">${product.price}</span>
                <button class="cart-btn">
                    <img src="/assets/img/icon-section3/Group (1) 1.svg" alt="">
                </button>
            </div>
        </div>
    `;
    return card;
}

//-----------PHÂN TRANG-----------------------------------
function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * amountOfCard;
    const endIndex = startIndex + amountOfCard;
    showCard.innerHTML = '';
    const pageProducts = allProducts.slice(startIndex, endIndex);
    pageProducts.forEach(product => {
        showCard.appendChild(createProductCard(product));
    });
    createPagination();
}

function createPagination() {
    const amountOfPage = Math.ceil(allProducts.length / amountOfCard);
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
            showPage(currentPage + 1);
        }
    });
    pagination.appendChild(nextButton);
}

//-----------KHỞI CHẠY--------
async function loadProducts() {
    try {
        const [productsRes, cakesRes] = await Promise.all([
            fetch('/assets/json/products.json'),
            fetch('/assets/json/cakes.json')
        ]);
        const products = await productsRes.json();
        const cakes = await cakesRes.json();
        allProducts = [...products, ...cakes];
        showPage(1);
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}
loadProducts();