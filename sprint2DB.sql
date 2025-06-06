CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS Users1;

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    category_id INT,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percent INT DEFAULT 0,
    quantity_in_stock INT DEFAULT 0,
    brand VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE product_sizes (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(10),
    size VARCHAR(10) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE offers (
    offer_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(10),
    offer_description VARCHAR(200),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE Users1 (
    UserID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Password VARCHAR(255),
    Email VARCHAR(100) UNIQUE,
    PhoneNumber VARCHAR(15)
);

INSERT INTO categories (category_name, description) VALUES
('Men', 'Men clothing and accessories'),
('Women', 'Women clothing and accessories'),
('Kids', 'Kids clothing and accessories');

INSERT INTO products VALUES
('P101', 'Men Cotton Shirt', 1, 'Comfortable cotton shirt for men', 799.00, 1299.00, 38, 5, 'FashionHub', 'images/men-cotton-shirt.jpg', NOW()),
('P102', 'Women Floral Dress', 2, 'Beautiful floral dress for women', 1299.00, 1899.00, 32, 8, 'FashionHub', 'images/women-floral-dress.jpg', NOW()),
('P103', 'Kids Winter Jacket', 3, 'Warm winter jacket for kids', 999.00, 1499.00, 33, 12, 'FashionHub', 'images/kids-winter-jacket.jpg', NOW()),
('P104', 'Men Leather Jacket', 1, 'Premium leather jacket for men', 2499.00, 3499.00, 29, 3, 'FashionHub', 'images/men-leather-jacket.jpg', NOW());

INSERT INTO product_sizes (product_id, size) VALUES
('P101', 'S'), ('P101', 'M'), ('P101', 'L'), ('P101', 'XL'),
('P102', 'S'), ('P102', 'M'), ('P102', 'L'),
('P103', 'S'), ('P103', 'M'), ('P103', 'L'),
('P104', 'M'), ('P104', 'L'), ('P104', 'XL');

INSERT INTO offers (product_id, offer_description) VALUES
('P101', '10% off on first purchase'),
('P101', 'Extra 5% off on orders above ₹999'),
('P101', 'Free delivery for Prime Members'),
('P102', '15% off on first purchase'),
('P103', '20% off on orders above ₹1500'),
('P104', '25% off on premium collection');

UPDATE products SET image_url = "images/PT101.jpg" WHERE product_id = 'P101';
UPDATE products SET image_url = "images/PT102.jpg" WHERE product_id = 'P102';
UPDATE products SET image_url = "images/PT103.jpg" WHERE product_id = 'P103';
UPDATE products SET image_url = "images/PT104.jpg" WHERE product_id = 'P104';

INSERT INTO Users1 (UserID, FirstName, LastName, Password, Email, PhoneNumber) VALUES
(1, 'Arjun', 'Mehta', 'Pass@123', 'arjun.mehta@example.com', '9812345678'),
(2, 'Riya', 'Sharma', 'Riya#2024', 'riya.sharma@example.com', '9876543210'),
(3, 'Kabir', 'Singh', 'Kabir@456', 'kabir.singh@example.com', '9700011223'),
(4, 'Ananya', 'Rao', 'Ana2025!*', 'ananya.rao@example.com', '9733344455');



