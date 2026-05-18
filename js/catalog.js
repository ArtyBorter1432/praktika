// Данные товаров с реальными изображениями
const products = [
    // Смартфоны
    { id: 1, name: "iPhone 15 Pro", price: 99990, category: "phones", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=512&hei=512&fmt=jpeg", description: "6.1″ Super Retina XDR, A17 Pro" },
    { id: 2, name: "iPhone 15 Pro Max", price: 119990, category: "phones", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch?wid=512&hei=512&fmt=jpeg", description: "6.7″ Super Retina XDR, A17 Pro" },
    { id: 3, name: "Samsung Galaxy S24 Ultra", price: 109990, category: "phones", img: "https://image-us.samsung.com/SamsungUS/smartphones/galaxy-s24-ultra/images/gallery/s24-ultra-titanium-gray-front-back.jpg?$product-card-small-jpg$", description: "6.8″ Dynamic AMOLED, 200MP камера" },
    { id: 4, name: "Xiaomi 14", price: 59990, category: "phones", img: "https://i01.appmifile.com/webfile/globalimg/7/8/9/789b6e3e-4d1d-4f6d-8f3e-2d5e7c8b9a0d.png", description: "6.36″ AMOLED, Snapdragon 8 Gen 3" },
    
    // Ноутбуки
    { id: 5, name: "MacBook Pro 14", price: 199990, category: "laptops", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=512&hei=512&fmt=jpeg", description: "M3 Pro, 18GB RAM, 512GB SSD" },
    { id: 6, name: "MacBook Air 13", price: 119990, category: "laptops", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=512&hei=512&fmt=jpeg", description: "M3, 8GB RAM, 256GB SSD" },
    { id: 7, name: "ASUS ROG Zephyrus", price: 149990, category: "laptops", img: "https://dlcdnwebimgs.asus.com/gain/32A6B2F2-C5A2-4F2A-8D2A-5B2A8D2F2A5C/w717", description: "Intel i9, RTX 4060, 16GB RAM" },
    { id: 8, name: "Lenovo ThinkPad X1", price: 139990, category: "laptops", img: "https://www.lenovo.com/medias/lenovo-thinkpad-x1-carbon-gen-11-front.png?context=bWFzdGVyfHJvb3R8MjQ1NjA3fGltYWdlL3BuZ3xoMDAvaDg0LzE2MjQ5ODAyMDAwMzgucG5nfD", description: "Intel i7, 16GB RAM, 512GB SSD" },
    
    // Аксессуары
    { id: 9, name: "AirPods Pro 2", price: 24990, category: "accessories", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero?wid=512&hei=512&fmt=jpeg", description: "Активное шумоподавление" },
    { id: 10, name: "AirPods 4", price: 14990, category: "accessories", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero?wid=512&hei=512&fmt=jpeg", description: "Пространственное аудио" },
    { id: 11, name: "Чехол для iPhone 15 Pro", price: 2990, category: "accessories", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MRWV3?wid=512&hei=512&fmt=jpeg", description: "Сilicone case, защита" },
    { id: 12, name: "MagSafe Зарядка", price: 4990, category: "accessories", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=512&hei=512&fmt=jpeg", description: "Беспроводная зарядка 15W" },
    
    // Аудиотехника
    { id: 13, name: "Sony WH-1000XM5", price: 34990, category: "audio", img: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH-1000XM5_Pair_B_7?$categorypdp$", description: "Наушники с шумоподавлением" },
    { id: 14, name: "JBL Charge 5", price: 12990, category: "audio", img: "https://www.jbl.com/dw/image/v2/BFGT_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw8f8d8f8d/JBL_Charge5_Hero_Black.png", description: "Портативная колонка 20W" },
    { id: 15, name: "Yamaha HS5", price: 24990, category: "audio", img: "https://uk.yamaha.com/en/files/HS5_19b634be0c_480x480_8c0b3f0d5c.jpg", description: "Студийные мониторы" }
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
