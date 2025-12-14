--CREATE DATABASE public;
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL
);


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);
INSERT INTO items (name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

SELECT * FROM items;

SELECT * FROM items
WHERE price > 80;

SELECT * FROM items
WHERE price <= 300;

SELECT * FROM customers
WHERE last_name = 'Smith';

SELECT * FROM customers
WHERE last_name = 'Jones';

SELECT * FROM customers
WHERE first_name <> 'Scott';


