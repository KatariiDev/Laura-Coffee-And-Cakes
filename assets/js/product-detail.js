lucide.createIcons();

function updateQty(change) {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    input.value = val;
}

function selectSize(element) {
    const options = document.querySelectorAll('.size-option');
    options.forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

function selectThumbnail(element) {
    const thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

function switchTab(tabId, element) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    const content = document.getElementById('tab-content');
    if (tabId === 'description') {
        content.innerHTML = 'Cà phê kem là sự kết hợp hoàn hảo giữa vị đắng nhẹ của cà phê và vị béo ngọt của kem tươi, mang đến trải nghiệm thưởng thức cân bằng và đầy cuốn hút. Thích hợp để bắt đầu ngày mới hoặc thư giãn vào buổi chiều.';
    } else if (tabId === 'ingredients') {
        content.innerHTML = 'Cà phê nguyên chất, kem tươi cao cấp, sữa đặc, đá viên, và một chút syrup vanilla.';
    } else if (tabId === 'guide') {
        content.innerHTML = 'Khuấy đều kem và cà phê trước khi uống để cảm nhận hương vị hòa quyện. Ngon nhất khi dùng lạnh.';
    }
}

//------------------------------------------------------------------------------

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

document.querySelector('.cta-button').addEventListener('click', () => {
    const name = document.querySelector('.product-name').textContent;
    const priceText = document.querySelector('.product-info .price').textContent;
    const price = parsePrice(priceText);
    const qty = parseInt(document.getElementById('qty-input').value);

    const activeSize = document.querySelector('.size-option.active .size-name');
    const size = activeSize ? activeSize.textContent : 'M';

    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id')) || 0;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === id && item.size === size);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += qty;
    } else {
        cart.push({ id, name, price, size, quantity: qty });
    }

    saveCart(cart);
    alert(`Added ${qty}x "${name}" (size ${size}) to cart!`);
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function loadProductDetail() {
    if (!productId) return;

    try {
        const [productsRes, cakesRes] = await Promise.all([
            fetch('/assets/json/products.json'),
            fetch('/assets/json/cakes.json')
        ]);

        const products = await productsRes.json();
        const cakes = await cakesRes.json();
        const allProducts = [...products, ...cakes];

        const product = allProducts.find(p => p.id === Number(productId));

        if (!product) return;

        document.querySelector('.product-name').textContent = product.name;
        document.querySelector('.product-info .price').textContent = product.price;
        document.querySelector('.breadcrumb .active').textContent = product.name;
        document.title = `${product.name} - Laura Coffee And Cakes`;

        if (product.l_description) {
            document.getElementById('tab-content').textContent = product.l_description;
        }
    } catch (error) {
        console.error(error);
    }
}

loadProductDetail();
