// Получить список пользователей
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Сохранить пользователей
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Регистрация
function register(name, email, password) {
    // Проверка на пустые поля
    if (!name || !email || !password) {
        return { success: false, message: 'Заполните все поля' };
    }
    
    const users = getUsers();
    
    // Проверка на существующего пользователя
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Регистрация успешна! Теперь войдите' };
}

// Вход
function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));
        return { success: true, message: 'Вход выполнен успешно!' };
    }
    
    return { success: false, message: 'Неверный email или пароль' };
}

// Выход
function logout() {
    localStorage.removeItem('currentUser');
    updateAuthNav();
    window.location.href = '../index.html';
}

// Рендер формы регистрации
function renderRegisterForm() {
    return `
        <div class="auth-form">
            <h2>Регистрация</h2>
            <form id="registerForm">
                <input type="text" id="regName" placeholder="Имя" required>
                <input type="email" id="regEmail" placeholder="Email" required>
                <input type="password" id="regPassword" placeholder="Пароль" required>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <div class="auth-switch">
                Уже есть аккаунт? <a href="#" id="showLogin">Войти</a>
            </div>
            <div id="authMessage"></div>
        </div>
    `;
}

// Рендер формы входа
function renderLoginForm() {
    return `
        <div class="auth-form">
            <h2>Вход</h2>
            <form id="loginForm">
                <input type="email" id="loginEmail" placeholder="Email" required>
                <input type="password" id="loginPassword" placeholder="Пароль" required>
                <button type="submit">Войти</button>
            </form>
            <div class="auth-switch">
                Нет аккаунта? <a href="#" id="showRegister">Зарегистрироваться</a>
            </div>
            <div id="authMessage"></div>
        </div>
    `;
}

// Рендер профиля (после входа)
function renderProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    return `
        <div class="auth-form">
            <h2>Личный кабинет</h2>
            <p><strong>Имя:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <button id="logoutBtn" class="btn-outline" style="margin-top: 20px;">Выйти</button>
        </div>
    `;
}

// Обработчик регистрации
function attachRegisterHandler() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            const result = register(name, email, password);
            const messageDiv = document.getElementById('authMessage');
            
            if (result.success) {
                messageDiv.innerHTML = `<div class="message success">${result.message}</div>`;
                setTimeout(() => {
                    const container = document.getElementById('authContainer');
                    if (container) {
                        container.innerHTML = renderLoginForm();
                        attachLoginHandler();
                        const showRegisterLink = document.getElementById('showRegister');
                        if (showRegisterLink) {
                            showRegisterLink.addEventListener('click', (e) => {
                                e.preventDefault();
                                document.getElementById('authContainer').innerHTML = renderRegisterForm();
                                attachRegisterHandler();
                                const showLoginLink = document.getElementById('showLogin');
                                if (showLoginLink) {
                                    showLoginLink.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        document.getElementById('authContainer').innerHTML = renderLoginForm();
                                        attachLoginHandler();
                                    });
                                }
                            });
                        }
                    }
                }, 1500);
            } else {
                messageDiv.innerHTML = `<div class="message error">${result.message}</div>`;
            }
        });
    }
}

// Обработчик входа
function attachLoginHandler() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = login(email, password);
            const messageDiv = document.getElementById('authMessage');
            
            if (result.success) {
                messageDiv.innerHTML = `<div class="message success">${result.message}</div>`;
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                messageDiv.innerHTML = `<div class="message error">${result.message}</div>`;
            }
        });
    }
}

// Инициализация страницы профиля
function initAuthPage() {
    const container = document.getElementById('authContainer');
    if (!container) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        container.innerHTML = renderProfile();
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                initAuthPage();
                updateAuthNav();
            });
        }
    } else {
        container.innerHTML = renderLoginForm();
        
        const showRegisterLink = document.getElementById('showRegister');
        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                container.innerHTML = renderRegisterForm();
                attachRegisterHandler();
                const showLoginLink = document.getElementById('showLogin');
                if (showLoginLink) {
                    showLoginLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        container.innerHTML = renderLoginForm();
                        attachLoginHandler();
                    });
                }
            });
        }
        
        attachLoginHandler();
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('authContainer')) {
        initAuthPage();
    }
});
