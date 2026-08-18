lucide.createIcons();

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
    applyFilters();
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.filter-dropdown')) {
        document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('active'));
    }
});

function getCart() {
    const cart = localStorage.getItem('laura_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('laura_cart', JSON.stringify(cart));
}

function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
}

//Fetch va gender -------------------------------
const showCard = document.getElementById('showCard');
const pagination = document.getElementById('pagination');
const amountOfCard = 6;
let currentPage = 1;
let allProducts = [];
let filteredProducts = [];

function getActiveFilters() {
    const productTypeBtn = document.querySelector('#filterProductType .filter-dropdown-btn span');
    const priceRangeBtn = document.querySelector('#filterPriceRange .filter-dropdown-btn span');

    return {
        productType: productTypeBtn ? productTypeBtn.textContent : 'Product type',
        priceRange: priceRangeBtn ? priceRangeBtn.textContent : 'Price range'
    };
}

function applyFilters() {
    const filters = getActiveFilters();
    filteredProducts = allProducts.filter(product => {
        const price = parsePrice(product.price);

        if (filters.productType !== 'Product type' && filters.productType !== 'All') {
            if (product.category !== filters.productType) return false;
        }

        if (filters.priceRange !== 'Price range' && filters.priceRange !== 'All') {
            switch (filters.priceRange) {
                case 'Under 40K':
                    if (price >= 40000) return false;
                    break;
                case '40K - 55K':
                    if (price < 40000 || price > 55000) return false;
                    break;
                case 'Over 55K':
                    if (price <= 55000) return false;
                    break;
            }
        }

        return true;
    });

    currentPage = 1;
    showPage(1);
}

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

    card.addEventListener('click', (e) => {
        if (e.target.closest('.cart-btn')) return;
        window.location.href = `product-detail.html?id=${product.id}`;
    });
    card.style.cursor = 'pointer';

    card.querySelector('.cart-btn').addEventListener('click', (e) => {
        e.stopPropagation();

        const price = parsePrice(product.price);
        const cart = getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id && item.size === 'M');

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: price,
                size: 'M',
                quantity: 1
            });
        }

        saveCart(cart);
        alert(`Added "${product.name}" to cart!`);
    });

    return card;
}

//-----------PHÂN TRANG-----------------------------------
function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * amountOfCard;
    const endIndex = startIndex + amountOfCard;
    showCard.innerHTML = '';

    if (filteredProducts.length === 0) {
        showCard.innerHTML = '<p style="text-align:center; color:#7E7D7A; padding:40px;">No products found.</p>';
        pagination.innerHTML = '';
        return;
    }

    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    pageProducts.forEach(product => {
        showCard.appendChild(createProductCard(product));
    });
    createPagination();
}

function createPagination() {
    const amountOfPage = Math.ceil(filteredProducts.length / amountOfCard);
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
        filteredProducts = [...allProducts];
        showPage(1);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}
loadProducts();

