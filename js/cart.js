// Рендер корзины
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItems');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Корзина пуста. <a href="../index.html">Перейти в каталог</a></p>';
        return;
    }
    
    let total = 0;
    container.innerHTML = `
        <div class="cart-header cart-item" style="font-weight:bold; border-bottom:2px solid #ddd;">
            <span>Товар</span>
            <span>Цена</span>
            <span>Количество</span>
            <span>Сумма</span>
            <span></span>
        </div>
        ${cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <span>${item.name}</span>
                    <span>${item.price.toLocaleString()} ₽</span>
                    <div>
                        <button class="btn-qty-minus" data-id="${item.id}">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button class="btn-qty-plus" data-id="${item.id}">+</button>
                    </div>
                    <span>${itemTotal.toLocaleString()} ₽</span>
                    <button class="btn-remove" data-id="${item.id}">🗑 Удалить</button>
                </div>
            `;
        }).join('')}
        <div class="cart-total">
            ИТОГО: ${total.toLocaleString()} ₽
            <button id="checkoutBtn" class="btn-primary" style="margin-left: 20px;">Оформить заказ</button>
        </div>
    `;
    
    // Обработчики для кнопок изменения количества
    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

// Обновление количества товара
function updateQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === id);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Удаление товара из корзины
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Оформление заказа
function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Для оформления заказа необходимо войти в систему');
        window.location.href = 'profile.html';
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    
    alert(`Заказ оформлен!\nПокупатель: ${currentUser.name}\nТоваров: ${cart.length}\nСпасибо за покупку!`);
    localStorage.removeItem('cart');
    renderCart();
    updateCartCount();
}

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems')) {
        renderCart();
    }
});
