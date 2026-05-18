# ER-диаграмма базы данных интернет-магазина электроники



## 1. Легенда

| Символ | Значение |
|--------|----------|
| PK | Первичный ключ (Primary Key) |
| FK | Внешний ключ (Foreign Key) |
| UNIQUE | Уникальное значение |
| ◄──── | Направление связи |
| 1:N | Связь "один ко многим" |

## 2. Описание таблиц

### 2.1. Таблица `users` (Пользователи)

| Поле | Тип | Ограничения | Описание |
|------|-----|-------------|----------|
| id | INTEGER | PRIMARY KEY | Уникальный ID пользователя |
| name | VARCHAR(100) | NOT NULL | Полное имя |
| email | VARCHAR(100) | NOT NULL, UNIQUE | Email для входа |
| password | VARCHAR(255) | NOT NULL | Хеш пароля |
| phone | VARCHAR(20) | | Номер телефона |
| address | TEXT | | Адрес доставки |
| created_at | TIMESTAMP | DEFAULT NOW() | Дата регистрации |

### 2.2. Таблица `categories` (Категории)

| Поле | Тип | Ограничения | Описание |
|------|-----|-------------|----------|
| id | INTEGER | PRIMARY KEY | Уникальный ID категории |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Название категории |
| description | TEXT | | Описание категории |

### 2.3. Таблица `products` (Товары)

| Поле | Тип | Ограничения | Описание |
|------|-----|-------------|----------|
| id | INTEGER | PRIMARY KEY | Уникальный ID товара |
| name | VARCHAR(200) | NOT NULL | Название товара |
| price | DECIMAL(10,2) | NOT NULL | Цена в рублях |
| category_id | INTEGER | FOREIGN KEY | Ссылка на категорию |
| description | TEXT | | Описание товара |
| image_url | VARCHAR(500) | | Ссылка на изображение |
| stock | INTEGER | DEFAULT 0 | Количество на складе |
| rating | DECIMAL(3,2) | DEFAULT 0 | Рейтинг (0-5) |
| created_at | TIMESTAMP | DEFAULT NOW() | Дата добавления |

### 2.4. Таблица `orders` (Заказы)

| Поле | Тип | Ограничения | Описание |
|------|-----|-------------|----------|
| id | INTEGER | PRIMARY KEY | Уникальный ID заказа |
| user_id | INTEGER | FOREIGN KEY | Ссылка на пользователя |
| order_date | TIMESTAMP | DEFAULT NOW() | Дата оформления |
| status | VARCHAR(50) | DEFAULT 'new' | Статус заказа |
| total | DECIMAL(10,2) | DEFAULT 0 | Общая сумма |
| shipping_address | TEXT | | Адрес доставки |

### 2.5. Таблица `order_items` (Позиции заказа)

| Поле | Тип | Ограничения | Описание |
|------|-----|-------------|----------|
| id | INTEGER | PRIMARY KEY | Уникальный ID позиции |
| order_id | INTEGER | FOREIGN KEY | Ссылка на заказ |
| product_id | INTEGER | FOREIGN KEY | Ссылка на товар |
| quantity | INTEGER | NOT NULL | Количество товара |
| price | DECIMAL(10,2) | NOT NULL | Цена на момент покупки |

## 3. Связи между таблицами

| Связь | Тип | Пояснение |
|-------|-----|-----------|
| users → orders | 1 : N | Один пользователь может сделать много заказов |
| categories → products | 1 : N | Одна категория содержит много товаров |
| orders → order_items | 1 : N | Один заказ содержит много позиций |
| products → order_items | 1 : N | Один товар может быть во многих заказах |

## 4. Правила целостности

### 4.1. Каскадное удаление (ON DELETE CASCADE)
- При удалении пользователя → удаляются все его заказы
- При удалении категории → удаляются все товары в ней
- При удалении заказа → удаляются все его позиции
- При удалении товара → удаляются все позиции с ним

### 4.2. Уникальность
- email пользователя должен быть уникальным
- имя категории должно быть уникальным

### 4.3. Обязательность (NOT NULL)
- name, email, password у пользователя
- name, price, category_id у товара
- user_id, status у заказа
- order_id, product_id, quantity, price у позиций заказа
