-- ======================================
-- EXERCISE 1: DVD Rental
-- ======================================
-- 1. Count films by rating
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating
ORDER BY rating;

-- 2. Movies with rating G or PG-13
SELECT title, rating
FROM film
WHERE rating IN ('G','PG-13');

-- 3. Movies < 2 hours and rental_rate < 3.00, sorted alphabetically
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G','PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

-- 4. Update a customer's details (example: customer_id = 1)
UPDATE customer
SET first_name = 'Mebratu', last_name = 'Sam'
WHERE customer_id = 1;

-- 5. Update address for the customer
UPDATE address
SET address = '123 My Street', district = 'MyCity', postal_code = '12345', phone = '050-1234567'
WHERE address_id = (
    SELECT address_id FROM customer WHERE customer_id = 1
);

-- ======================================
-- EXERCISE 2: Students Table
-- ======================================
-- 1. Update twins' birth_dates
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea','Marc') AND last_name='Benichou';

-- 2. Change David's last name
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David';

-- 3. Delete Lea Benichou
DELETE FROM students
WHERE first_name='Lea' AND last_name='Benichou';

-- 4. Count total students
SELECT COUNT(*) AS total_students FROM students;

-- 5. Count students born after 2000-01-01
SELECT COUNT(*) AS born_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- 6. Add math_grade column
ALTER TABLE students ADD COLUMN IF NOT EXISTS math_grade INTEGER;

-- 7. Insert/update math grades
UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2,4);
UPDATE students SET math_grade = 40 WHERE id = 6;

-- 8. Add Omer Simpson twice (same birth_date, different grades)
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer','Simpson','2000-01-01',70);

INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer','Simpson','2000-01-01',70);

-- 9. Count grades per student
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

-- 10. Sum of all grades
SELECT SUM(math_grade) AS sum_of_grades FROM students;

-- ======================================
-- EXERCISE 3: Items and Customers (public database)
-- ======================================
-- 1. Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER
);

-- 2. Insert purchases
-- Scott Scott bought 1 fan
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
    (SELECT id FROM items WHERE name='Fan'), 1
);

-- Melanie Johnson bought 10 large desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'),
    (SELECT id FROM items WHERE name='Large Desk'), 10
);

-- Greg Jones bought 2 small desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'),
    (SELECT id FROM items WHERE name='Small Desk'), 2
);

-- 3. Show all purchases
SELECT * FROM purchases;

-- 4. Purchases joined with customers and items
SELECT p.id, c.first_name, c.last_name, i.name AS item_name, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- 5. Purchases for customer ID 5
SELECT * FROM purchases WHERE customer_id = 5;

-- 6. Purchases for large desk AND small desk
SELECT * FROM purchases
WHERE item_id IN (SELECT id FROM items WHERE name IN ('Large Desk','Small Desk'));

-- 7. Customers who made purchases
SELECT DISTINCT c.first_name, c.last_name, i.name AS item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- 8. Insert a row with customer but no item
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ((SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'), NULL, 1);

-- ======================================
-- EXERCISE 4: Bonus Public Database
-- ======================================
-- 1. Last 2 customers alphabetically (A-Z), excluding id
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
OFFSET (SELECT COUNT(*) FROM customers) - 2
LIMIT 2;

-- 2. Delete all purchases made by Scott
DELETE FROM purchases
WHERE customer_id = (SELECT id FROM customers WHERE first_name='Scott' AND last_name='Scott');

-- 3. Check if Scott still exists
SELECT * FROM customers
WHERE first_name='Scott' AND last_name='Scott';

-- 4. Show all purchases including Scott (LEFT JOIN)
SELECT p.id AS purchase_id,
       COALESCE(c.first_name,'') AS first_name,
       COALESCE(c.last_name,'') AS last_name,
       i.name AS item_name,
       p.quantity_purchased
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- 5. Show all purchases excluding Scott (INNER JOIN)
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       i.name AS item_name,
       p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;
