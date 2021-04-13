

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
    store_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(50) UNIQUE NOT NULL,
    oauth_code VARCHAR(100)
);

CREATE TABLE item(
    item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(50) NOT NULL,
    store_id BIGINT NOT NULL,
    merchant_item_id INT NOT NULL
);

CREATE TABLE variant(
    variant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    item_id BIGINT,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock INT
);

-- 'Order' is a reserved keyword in MySQL
CREATE TABLE item_order(
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    comleted BOOL NOT NULL,
    variant_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    data_time DATETIME NOT NULL
);