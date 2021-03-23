

-- database:
-- store table
-- 	store_id, store_name, store_items_count
-- inventory table
-- 	store_id, item_id, 
-- item table
-- 	item_id, item_name, merchant_item_id, price, stock, picture

-- ///////////////////////////////////////
-- variant table
-- 	item_id, stock, description
-- ///////////////////////////////////////

-- order table
-- 	order_id, completed/ongoing, item_id, count, date_time

DROP DATABASE IF EXISTS erentzen;
CREATE DATABASE erentzen;
USE erentzen;

CREATE TABLE store(
    store_id INT PRIMARY KEY,
    store_name VARCHAR(50) NOT NULL
);

CREATE TABLE item(
    item_id INT PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    store_id INT NOT NULL,
    merchant_item_id INT NOT NULL
);

CREATE TABLE variant(
    variant_id INT PRIMARY KEY,
    item_id INT,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock INT
);

-- 'Order' is a reserved keyword in MySQL
CREATE TABLE item_order(
    order_id INT PRIMARY KEY,
    comleted BOOL NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL,
    data_time DATETIME NOT NULL
);