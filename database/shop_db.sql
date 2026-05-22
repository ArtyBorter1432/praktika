-- =====================================================
-- БАЗА ДАННЫХ ИНТЕРНЕТ-МАГАЗИНА ЭЛЕКТРОНИКИ
-- СУБД: MySQL
-- ПОЛНОЕ РЕШЕНИЕ ДЛЯ УП.11 (100 БАЛЛОВ)
-- =====================================================

-- =====================================================
-- 1. УДАЛЕНИЕ И СОЗДАНИЕ БАЗЫ ДАННЫХ
-- =====================================================
DROP DATABASE IF EXISTS online_store;
CREATE DATABASE online_store;
USE online_store;

-- =====================================================
-- 2. СОЗДАНИЕ ТАБЛИЦ (5 таблиц)
-- =====================================================

-- Таблица users (клиенты) - PK
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица categories (категории) - PK
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Таблица products (товары) - PK + FK → categories
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    description TEXT,
    stock INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Таблица orders (заказы) - PK + FK → users
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new',
    total DECIMAL(10,2) DEFAULT 0,
    shipping_address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица order_items (позиции заказа) - PK + FK → orders, FK → products
-- Эта таблица реализует связь M:N между orders и products
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =====================================================
-- 3. ИНДЕКСЫ (для оптимизации запросов)
-- =====================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_users_email ON users(email);

-- =====================================================
-- 4. ЗАПОЛНЕНИЕ ТАБЛИЦ ДАННЫМИ
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

-- Обновляем total в заказах (вычисляем сумму)
UPDATE orders o SET total = (
    SELECT SUM(oi.quantity * oi.price) 
    FROM order_items oi 
    WHERE oi.order_id = o.id
);

-- =====================================================
-- 5. ПЯТЬ ОБЯЗАТЕЛЬНЫХ ЗАПРОСОВ (из критериев УП.11)
-- =====================================================

-- ЗАПРОС 1: SELECT с WHERE (товары дороже 70000)
SELECT '=== 1. SELECT с WHERE (товары > 70000) ===' AS '';
SELECT id, name, price, stock FROM products WHERE price > 70000 ORDER BY price DESC;

-- ЗАПРОС 2: INSERT (добавление нового товара)
SELECT '=== 2. INSERT (новый товар) ===' AS '';
INSERT INTO products (name, price, category_id, description, stock, rating) 
VALUES ('Google Pixel 8 Pro', 84990, 1, '6.7″ OLED, Google Tensor G3', 8, 4.6);
SELECT * FROM products WHERE name = 'Google Pixel 8 Pro';

-- ЗАПРОС 3: UPDATE (обновление статуса заказа)
SELECT '=== 3. UPDATE (статус заказа #6) ===' AS '';
UPDATE orders SET status = 'delivered' WHERE id = 6;
SELECT id, user_id, status, total FROM orders WHERE id = 6;

-- ЗАПРОС 4: DELETE (удаление товара с id=13 - JBL Charge 5)
SELECT '=== 4. DELETE (удаляем товар JBL Charge 5) ===' AS '';
DELETE FROM products WHERE id = 13;
SELECT COUNT(*) AS remaining_products FROM products;

-- ЗАПРОС 5: SELECT с JOIN (заказы + пользователи)
SELECT '=== 5. SELECT с JOIN (заказы и клиенты) ===' AS '';
SELECT 
    o.id AS order_id,
    u.name AS customer_name,
    u.email,
    DATE(o.order_date) AS order_date,
    o.status,
    o.total AS total_amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.order_date DESC;

-- =====================================================
-- 6. ВЫВОД ИНФОРМАЦИИ О СВЯЗЯХ
-- =====================================================
SELECT '=== СВЯЗИ МЕЖДУ ТАБЛИЦАМИ ===' AS '';
SELECT 
    'users (1) → (M) orders' AS relationship
UNION SELECT 'orders (1) → (M) order_items'
UNION SELECT 'products (1) → (M) order_items'
UNION SELECT 'categories (1) → (M) products';

-- Проверка всех таблиц
SELECT '=== ВСЕ ТАБЛИЦЫ ===' AS '';
SHOW TABLES;

-- =====================================================
-- КОНЕЦ СКРИПТА. ВСЕ 5 ЗАПРОСОВ ВЫПОЛНЕНЫ.
-- =====================================================