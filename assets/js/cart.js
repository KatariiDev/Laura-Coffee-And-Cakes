const CART_KEY = 'laura_cart';
const FREE_SHIP_THRESHOLD = 150000;
const SHIPPING_FEE = 20000;

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
}

function formatPrice(num) {
    return num.toLocaleString('vi-VN') + ' đ';
}

const cartList = document.getElementById('cart-list');
const subtotalLabel = document.getElementById('subtotal-label');
const subtotalPrice = document.getElementById('subtotal-price');
const shippingFeeEl = document.getElementById('shipping-fee');
const totalPriceEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart-btn');

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="cart-empty">
                <div class="empty-icon">Empty</div>
                <p>Your cart is empty</p>
                <a href="menu.html">Explore menu →</a>
            </div>
        `;
        updateSummary(0, 0);
        return;
    }

    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="item-product">
                <div class="item-img"></div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="item-size">Size ${item.size}</span>
                </div>
            </div>
            <div class="item-price">${formatPrice(item.price)}</div>
            <div class="item-qty">
                <button onclick="changeQty(${index}, -1)">−</button>
                <input type="text" value="${item.quantity}" readonly>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <div class="item-subtotal">${formatPrice(subtotal)}</div>
            <button class="item-delete" onclick="removeItem(${index})">🗑</button>
        `;
        cartList.appendChild(itemEl);
    });

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalNum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateSummary(totalItems, subtotalNum);
}

function updateSummary(totalItems, subtotalNum) {
    subtotalLabel.textContent = `Subtotal (${totalItems} items)`;
    subtotalPrice.textContent = formatPrice(subtotalNum);

    const ship = subtotalNum >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE;
    shippingFeeEl.textContent = ship === 0 ? 'Free' : formatPrice(ship);

    const total = subtotalNum + ship;
    totalPriceEl.textContent = formatPrice(total);
}

function changeQty(index, change) {
    const cart = getCart();
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove all items from your cart?')) {
        saveCart([]);
        renderCart();
    }
});

renderCart();