CREATE DATABASE IF NOT EXISTS producthubnepal;
USE producthubnepal;

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

INSERT INTO products (title, category, price, description) VALUES
('ProBook Ultra X15', 'laptops', 185000.00, 'Premium software engineering machine compilation.'),
('Apex Phone 15 Pro', 'smartphones', 145000.00, 'Flagship mobile computing performance configuration.');