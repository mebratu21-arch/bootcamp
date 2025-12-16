-- ======================================
-- Exercise 1: DVD Rental
-- ======================================
-- Count films by rating
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating
ORDER BY rating;

-- Movies with rating G or PG-13
SELECT title, rating
FROM film
WHERE rating IN ('G','PG-13');

-- Movies < 2 hours and rental_rate < 3, sorted
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G','PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

-- Update customer example
UPDATE customer
SET first_name = 'Mebratu', last_name = 'Sam'
WHERE customer_id = 1;

-- Update address example
UPDATE address
SET address = '123 My Street', district = 'MyCity', postal_code = '12345', phone = '050-1234567'
WHERE address_id = (
    SELECT address_id FROM customer WHERE customer_id = 1
);

-- ======================================
-- Exercise 2: Students Table
-- ======================================
-- Update twins' birth_dates
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea','Marc') AND last_name='Benichou';

-- Change David's last name
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David';

-- Delete Lea Benichou
DELETE FROM students
WHERE first_name='Lea' AND last_name='Benichou';

-- Count total students
SELECT COUNT(*) AS total_students FROM students;

-- Count students born after 2000-01-01
SELECT COUNT(*) AS born_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- Add math_grade column
ALTER TABLE students ADD COLUMN math_grade INTEGER;

-- Insert/update math grades
UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2,4);
UPDATE students SET math_grade = 40 WHERE id = 6;

-- Insert Omer Simpson twice
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer','Simpson','2000-01-01',70);
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer','Simpson','2000-01-01',70);

-- Count grades per student
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

-- Sum of all grades
SELECT SUM(math_grade) AS sum_of_grades FROM students;

-- ======================================
-- Exercise 3: Items and Customers (public)
-- ======================================
-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER
);

-- Insert purchases
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ((SELECT id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
        (SELECT id FROM items WHERE name='Fan'), 1);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ((SELECT id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'),
        (SELECT id FROM items WHERE name='Large Desk'), 10);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ((SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'),
        (SELECT id FROM items WHERE name='Small Desk'), 2);

-- Show all purchases
SELECT * FROM purchases;

-- Join purchases with customers and items
SELECT p.id, c.first_name, c.last_name, i.name AS item_name, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- Purchases for customer ID 5
SELECT * FROM purchases WHERE customer_id = 5;

-- Purchases for large or small desk
SELECT * FROM purchases
WHERE item_id IN (SELECT id FROM items WHERE name IN ('Large Desk','Small Desk'));

-- Customers who made purchases
SELECT DISTINCT c.first_name, c.last_name, i.name AS item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- Insert a row with customer but no item
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ((SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'), NULL, 1);
