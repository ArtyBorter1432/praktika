// Данные товаров с реальными изображениями
const products = [
    // Смартфоны
    { id: 1, name: "iPhone 15 Pro", price: 99990, category: "phones", img: "https://pcdn.goldapple.ru/p/p/19000217336/web/696d674d61696e5064708ddc56020a38c0c.jpg", description: "6.1″ Super Retina XDR, A17 Pro" },
    { id: 2, name: "iPhone 15 Pro Max", price: 119990, category: "phones", img: "https://avatars.mds.yandex.net/get-mpic/5098271/2a00000190977ecb4078d1dcf94978fb262a/orig", description: "6.7″ Super Retina XDR, A17 Pro" },
    { id: 3, name: "Samsung Galaxy S24 Ultra", price: 109990, category: "phones", img: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/213/228/739/242/712/23/100067263729b3.webp", description: "6.8″ Dynamic AMOLED, 200MP камера" },
    { id: 4, name: "Xiaomi 14", price: 59990, category: "phones", img: "https://avatars.mds.yandex.net/i?id=7a35afa4b75e625f041caf1468a52a93_sr-4076747-images-thumbs&n=13", description: "6.36″ AMOLED, Snapdragon 8 Gen 3" },
    
    // Ноутбуки
    { id: 5, name: "MacBook Pro 14", price: 199990, category: "laptops", img: "https://ir.ozone.ru/s3/multimedia-e/6367881386.jpg", description: "M3 Pro, 18GB RAM, 512GB SSD" },
    { id: 6, name: "MacBook Air 13", price: 119990, category: "laptops", img: "https://avatars.mds.yandex.net/get-mpic/5332113/2a0000018eaeba54552860ab7b9b20cca5fd/orig", description: "M3, 8GB RAM, 256GB SSD" },
    { id: 7, name: "ASUS ROG Zephyrus", price: 149990, category: "laptops", img: "https://object.pscloud.io/cms/cms/Uploads/1_DT0v5f.jpg", description: "Intel i9, RTX 4060, 16GB RAM" },
    { id: 8, name: "Lenovo ThinkPad X1", price: 139990, category: "laptops", img: "https://cdn1.technopark.ru/technopark/photos_resized/product/1000_1000/789018/2_789018.jpg?timestamp=2025-05-12_09-21-33", description: "Intel i7, 16GB RAM, 512GB SSD" },
    
    // Аксессуары
    { id: 9, name: "AirPods Pro 2", price: 24990, category: "accessories", img: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/ccs/255258/UE9EUzJQUk9YWFhfMl82Nzg2NjUxNjk=/b3.webp", description: "Активное шумоподавление" },
    { id: 10, name: "AirPods 4", price: 14990, category: "accessories", img: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/ccs/262940/MTAwMzM2NTg5NzRfMjgwMjg1NDE=/b3.webp", description: "Пространственное аудио" },
    { id: 11, name: "Чехол для iPhone 15 Pro", price: 2990, category: "accessories", img: "https://img.joomcdn.net/19f3329b44c33f9eafb3d69302445237cc96ecd2_original.jpeg", description: "Сilicone case, защита" },
    { id: 12, name: "MagSafe Зарядка", price: 4990, category: "accessories", img: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/926/504/099/515/123/4/600012007573b0.jpeg", description: "Беспроводная зарядка 15W" },
    
    // Аудиотехника
    { id: 13, name: "Sony WH-1000XM5", price: 34990, category: "audio", img: "https://indexiq.ru/storage/photo/resized/xy_1200x1200/e/tbyx0pdmwul4yx5_1495bbe.jpg.webp", description: "Наушники с шумоподавлением" },
    { id: 14, name: "JBL Charge 5", price: 12990, category: "audio", img: "https://ir.ozone.ru/s3/multimedia-1-2/w1200/7557956390.jpg", description: "Портативная колонка 20W" },
];

// Рендер товаров
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%;">Товары не найдены</p>';
        return;
    }
    
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.img}" alt="${product.name}" 
                     style="width:100%; height:100%; object-fit:contain;"
                     onerror="this.parentElement.innerHTML='${product.img === '📱' ? '📱' : '🖥️'}'">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

// Получить название категории
function getCategoryName(category) {
    const categories = {
        'phones': 'Смартфоны',
        'laptops': 'Ноутбуки',
        'accessories': 'Аксессуары',
        'audio': 'Аудиотехника'
    };
    return categories[category] || category;
}

// Поиск и фильтрация
function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    
    let filtered = products;
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    renderProducts(filtered);
}

// Добавление в корзину
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            img: product.img,
            quantity: 1 
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Уведомление
    const btn = event?.target;
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Добавлено!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    }
    
    alert(`Товар "${product.name}" добавлен в корзину`);
}

// Инициализация страницы каталога
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        renderProducts(products);
        
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (searchInput) searchInput.addEventListener('input', filterProducts);
        if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    }
});