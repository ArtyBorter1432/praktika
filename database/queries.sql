-- =====================================================
-- SQL-ЗАПРОСЫ ДЛЯ БАЗЫ ДАННЫХ ИНТЕРНЕТ-МАГАЗИНА
-- 5 основных типов запросов
-- =====================================================

-- =====================================================
-- ЗАПРОС 1: SELECT с условием (WHERE)
-- Вывести все товары дороже 70000 рублей
-- =====================================================
SELECT 
    id,
    name,
    price,
    stock,
    CASE 
        WHEN stock > 10 THEN 'В наличии'
        WHEN stock > 0 THEN 'Заканчивается'
        ELSE 'Нет в наличии'
    END AS availability
FROM products 
WHERE price > 70000
ORDER BY price DESC;

-- =====================================================
-- ЗАПРОС 2: INSERT (добавление нового товара)
-- Добавляем новый смартфон Google Pixel 8 Pro
-- =====================================================
INSERT INTO products (name, price, category_id, description, stock, rating) 
VALUES ('Google Pixel 8 Pro', 84990, 1, '6.7″ OLED, Google Tensor G3, 50MP камера', 8, 4.6);

-- Проверка добавления
SELECT * FROM products WHERE name = 'Google Pixel 8 Pro';

-- =====================================================
-- ЗАПРОС 3: UPDATE (обновление данных)
-- Обновляем статус заказа #6 на "delivered"
-- =====================================================
UPDATE orders 
SET status = 'delivered' 
WHERE id = 6;

-- Проверка обновления
SELECT id, user_id, status, total FROM orders WHERE id = 6;

-- =====================================================
-- ЗАПРОС 4: DELETE (удаление данных)
-- Удаляем товар с id = 13 (MagSafe Зарядка)
-- =====================================================
DELETE FROM products WHERE id = 13;

-- Проверка удаления
SELECT COUNT(*) AS remaining_products FROM products;

-- =====================================================
-- ЗАПРОС 5: SELECT с JOIN (объединение таблиц)
-- Полная информация о заказах с именами пользователей
-- =====================================================
SELECT 
    o.id AS order_id,
    u.name AS customer_name,
    u.email AS customer_email,
    DATE(o.order_date) AS order_date,
    o.status,
    o.total AS total_amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.order_date DESC;

-- =====================================================
-- ДОПОЛНИТЕЛЬНЫЙ ЗАПРОС: JOIN с несколькими таблицами
-- Детали заказа с названиями товаров
-- =====================================================
SELECT 
    o.id AS order_id,
    u.name AS customer,
    p.name AS product_name,
    oi.quantity,
    oi.price,
    (oi.quantity * oi.price) AS subtotal
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN users u ON o.user_id = u.id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 1;
