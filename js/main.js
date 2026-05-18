// Обновление счётчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cartCount');
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
    }
}

// Проверка авторизации и обновление навигации
function updateAuthNav() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authNav = document.getElementById('authNav');
    
    if (authNav) {
        if (currentUser) {
            authNav.innerHTML = `
                <div class="user-info">
                    <span class="user-name">👤 ${currentUser.name}</span>
                    <button onclick="logout()" class="logout-btn">Выход</button>
                </div>
            `;
        } else {
            authNav.innerHTML = '<a href="pages/profile.html" class="btn-outline">Вход / Регистрация</a>';
        }
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem('currentUser');
    updateAuthNav();
    window.location.href = '../index.html';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateAuthNav();
});
