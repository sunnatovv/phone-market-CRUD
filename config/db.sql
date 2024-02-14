-- Active: 1706504049187@@127.0.0.1@3306@buyiphone
create DATABASE buyIphone;
use buyIphone;
CREATE TABLE IF NOT EXISTS module (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
    )


CREATE TABLE phones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    narxi DECIMAL(20, 2) NOT NULL,
    models_id INT NOT NULL,
    harakteristikasi TEXT,
    imei VARCHAR(15) UNIQUE NOT NULL,
    ram INT,
    rom INT,
    camera INT,
    color VARCHAR(50)
);


CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    number VARCHAR(20),
    address TEXT,
    passport_raqami VARCHAR(20) UNIQUE NOT NULL,
    yoshi INT,
    card_number VARCHAR(16),
    fuqaroligi VARCHAR(50)
);


CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tolov_turi VARCHAR(50) NOT NULL,
    tolov_vaqti DATE NOT NULL,
    tarif TEXT,
    contract_id INT
);


CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    muddati INT NOT NULL,
    contract_starts DATE NOT NULL,
    phone_id INT,
    total_price DECIMAL,
    customer_id INT,
    boshlangich_tolov DECIMAL,
    oylik_tolov DECIMAL,
    qachon_tolashi DATE
);
INSERT INTO contracts (muddati, contract_starts, phone_id, total_price, customer_id, boshlangich_tolov, oylik_tolov, qachon_tolashi)
VALUES
(12, '2024-01-01', 1, 500.00, 1, 100.00, 50.00, '2024-01-15'),
(24, '2023-05-01', 2, 800.00, 2, 150.00, 75.00, '2023-05-15'),
(6, '2024-03-01', 3, 300.00, 3, 60.00, 30.00, '2024-03-15'),
(18, '2023-09-01', 4, 700.00, 4, 120.00, 60.00, '2023-09-15'),
(36, '2023-01-01', 5, 1200.00, 5, 200.00, 100.00, '2023-01-15');
