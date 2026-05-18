-- =====================================================
-- БАЗА ДАННЫХ ИНТЕРНЕТ-МАГАЗИНА ЭЛЕКТРОНИКИ
-- СУБД: SQLite
-- =====================================================

-- =====================================================
-- 1. УДАЛЕНИЕ СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- =====================================================
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- =====================================================
-- 2. СОЗДАНИЕ ТАБЛИЦ
-- =====================================================

-- Таблица: users (пользователи)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица: categories (категории товаров)
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Таблица: products (товары)
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    stock INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Таблица: orders (заказы)
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new',
    total DECIMAL(10,2) DEFAULT 0,
    shipping_address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица: order_items (позиции заказа)
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =====================================================
-- 3. ИНДЕКСЫ ДЛЯ ОПТИМИЗАЦИИ
-- =====================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_users_email ON users(email);

-- =====================================================
-- 4. ЗАПОЛНЕНИЕ ТАБЛИЦ ТЕСТОВЫМИ ДАННЫМИ
-- =====================================================

-- Категории
INSERT INTO categories (id, name, description) VALUES 
(1, 'Смартфоны', 'Мобильные телефоны и смартфоны последнего поколения'),
(2, 'Ноутбуки', 'Портативные компьютеры для работы и игр'),
(3, 'Аксессуары', 'Чехлы, наушники, зарядные устройства'),
(4, 'Аудиотехника', 'Наушники, колонки, усилители звука'),
(5, 'Планшеты', 'Планшетные компьютеры');

-- Пользователи
INSERT INTO users (id, name, email, password, phone, address) VALUES 
(1, 'Иван Петров', 'ivan@example.com', 'hashed_123', '+7-999-123-45-67', 'г. Москва, ул. Тверская, д. 10'),
(2, 'Мария Сидорова', 'maria@example.com', 'hashed_456', '+7-999-234-56-78', 'г. Санкт-Петербург, Невский пр., д. 25'),
(3, 'Алексей Иванов', 'alex@example.com', 'hashed_789', '+7-999-345-67-89', 'г. Новосибирск, ул. Ленина, д. 5'),
(4, 'Екатерина Смирнова', 'ekaterina@example.com', 'hashed_101', '+7-999-456-78-90', 'г. Екатеринбург, ул. Малышева, д. 15'),
(5, 'Дмитрий Козлов', 'dmitry@example.com', 'hashed_112', '+7-999-567-89-01', 'г. Казань, ул. Баумана, д. 7');

-- Товары
INSERT INTO products (id, name, price, category_id, description, stock, rating) VALUES 
(1, 'iPhone 15 Pro', 99990, 1, '6.1″ Super Retina XDR, A17 Pro, 48MP камера', 15, 4.8),
(2, 'iPhone 15 Pro Max', 119990, 1, '6.7″ Super Retina XDR, A17 Pro, 5x оптический зум', 10, 4.9),
(3, 'Samsung Galaxy S24 Ultra', 109990, 1, '6.8″ Dynamic AMOLED, 200MP камера, S Pen', 12, 4.7),
(4, 'Samsung Galaxy S24', 74990, 1, '6.2″ Dynamic AMOLED, 50MP камера', 20, 4.6),
(5, 'Xiaomi 14', 59990, 1, '6.36″ AMOLED, Snapdragon 8 Gen 3', 18, 4.5),
(6, 'MacBook Pro 14', 199990, 2, 'M3 Pro, 18GB RAM, 512GB SSD', 8, 4.9),
(7, 'MacBook Air 13', 119990, 2, 'M3, 8GB RAM, 256GB SSD', 12, 4.8),
(8, 'ASUS ROG Zephyrus', 149990, 2, 'Intel i9, RTX 4060, 16GB RAM', 5, 4.7),
(9, 'Lenovo ThinkPad X1', 139990, 2, 'Intel i7, 16GB RAM, 512GB SSD', 7, 4.6),
(10, 'AirPods Pro 2', 24990, 3, 'Активное шумоподавление, пространственное аудио', 30, 4.7),
(11, 'Чехол для iPhone', 2990, 3, 'Силиконовый чехол, защита от падений', 50, 4.5),
(12, 'Sony WH-1000XM5', 34990, 4, 'Наушники с шумоподавлением, 30 часов работы', 12, 4.9),
(13, 'JBL Charge 5', 12990, 4, 'Портативная колонка 20W, защита от воды', 20, 4.7),
(14, 'iPad Pro 11', 89990, 5, 'M2 чип, 128GB, Liquid Retina', 10, 4.8),
(15, 'Samsung Tab S9', 79990, 5, 'Dynamic AMOLED, S Pen в комплекте', 8, 4.7);

-- Заказы
INSERT INTO orders (id, user_id, status, shipping_address) VALUES 
(1, 1, 'delivered', 'г. Москва, ул. Тверская, д. 10'),
(2, 1, 'processing', 'г. Москва, ул. Тверская, д. 10'),
(3, 2, 'new', 'г. Санкт-Петербург, Невский пр., д. 25'),
(4, 2, 'delivered', 'г. Санкт-Петербург, Невский пр., д. 25'),
(5, 3, 'processing', 'г. Новосибирск, ул. Ленина, д. 5'),
(6, 4, 'new', 'г. Екатеринбург, ул. Малышева, д. 15'),
(7, 5, 'delivered', 'г. Казань, ул. Баумана, д. 7');

-- Позиции заказов
INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES 
(1, 1, 1, 1, 99990),
(2, 1, 10, 2, 24990),
(3, 2, 6, 1, 199990),
(4, 3, 3, 1, 109990),
(5, 3, 12, 1, 34990),
(6, 4, 5, 2, 59990),
(7, 4, 11, 3, 2990),
(8, 5, 7, 1, 119990),
(9, 5, 13, 1, 12990),
(10, 6, 4, 1, 74990),
(11, 7, 2, 1, 119990),
(12, 7, 8, 1, 149990);

-- =====================================================
-- 5. ПРИМЕРЫ ЗАПРОСОВ
-- =====================================================

-- SELECT с условием (товары дороже 70000)
-- SELECT * FROM products WHERE price > 70000;

-- INSERT (добавление товара)
-- INSERT INTO products (name, price, category_id, description, stock) VALUES ('Google Pixel 8 Pro', 84990, 1, '6.7″ OLED, Google Tensor G3', 8);

-- UPDATE (обновление статуса заказа)
-- UPDATE orders SET status = 'delivered' WHERE id = 3;

-- DELETE (удаление товара)
-- DELETE FROM products WHERE id = 13;

-- SELECT с JOIN (заказы + пользователи)
-- SELECT o.id, u.name, o.order_date, o.status, o.total FROM orders o JOIN users u ON o.user_id = u.id;