		--Exercise 1: DVD Rentals
--1. Retrieve all G or PG films not currently rented
-- Method 1: Using EXISTS to check for available inventory
SELECT DISTINCT f.film_id, f.title, f.rating, f.description
FROM film f
WHERE f.rating IN ('G', 'PG')
  AND EXISTS (
    -- Find inventory items for this film that are NOT currently rented
    SELECT 1 
    FROM inventory i
    WHERE i.film_id = f.film_id
      AND NOT EXISTS (
        SELECT 1 
        FROM rental r 
        WHERE r.inventory_id = i.inventory_id 
          AND r.return_date IS NULL  -- Currently rented out
      )
  )
ORDER BY f.title;

-- Method 2: Alternative approach using LEFT JOIN
SELECT DISTINCT f.film_id, f.title, f.rating
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id 
  AND r.return_date IS NULL  -- Currently rented
WHERE f.rating IN ('G', 'PG')
  AND r.rental_id IS NULL  -- No current rental found
ORDER BY f.title;

--2. Create a waiting list table for children's movies
-- First, create the waiting list table
CREATE TABLE children_dvd_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    inventory_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,  -- Reference to customer table
    child_name VARCHAR(100) NOT NULL,  -- Could also just use customer reference
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,  -- Set to FALSE when child gets DVD
    pickup_date TIMESTAMP NULL,
    notes TEXT,
    
    -- Foreign key constraints
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    
    -- Unique constraint to prevent duplicate active entries for same customer/inventory
    CONSTRAINT unique_active_waiting UNIQUE (inventory_id, customer_id) 
        WHERE is_active = TRUE,
    
    -- Ensure inventory is for a children's movie (G or PG rating)
    CONSTRAINT check_childrens_movie CHECK (
        EXISTS (
            SELECT 1 
            FROM inventory i2
            JOIN film f ON i2.film_id = f.film_id
            WHERE i2.inventory_id = inventory_id
            AND f.rating IN ('G', 'PG')
        )
    )
);

-- Alternative simpler version without CHECK constraint (if DB doesn't support)
CREATE TABLE children_dvd_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    inventory_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    pickup_date TIMESTAMP NULL,
    notes TEXT,
    
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Create an index for faster queries on active waiting lists
CREATE INDEX idx_waiting_active ON children_dvd_waiting_list(is_active, inventory_id);
CREATE INDEX idx_waiting_inventory ON children_dvd_waiting_list(inventory_id, is_active);

-- Create a view to see waiting list with movie details
CREATE VIEW children_waiting_list_details AS
SELECT 
    w.waiting_id,
    w.inventory_id,
    w.customer_id,
    w.child_name,
    f.title,
    f.rating,
    f.rental_duration,
    w.added_date,
    w.is_active,
    w.pickup_date,
    c.email,
    c.phone
FROM children_dvd_waiting_list w
JOIN inventory i ON w.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON w.customer_id = c.customer_id
WHERE w.is_active = TRUE
ORDER BY w.added_date;

--3. Retrieve number of people waiting for each children's DVD
-- Basic count of active waiting list entries per inventory item
SELECT 
    i.inventory_id,
    f.film_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS number_waiting,
    MIN(w.added_date) AS oldest_waiting_since,
    MAX(w.added_date) AS newest_addition
FROM inventory i
JOIN film f ON i.film_id = f.film_id
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id 
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
GROUP BY i.inventory_id, f.film_id, f.title, f.rating
HAVING COUNT(w.waiting_id) > 0
ORDER BY number_waiting DESC, f.title;

-- More detailed version with customer names
SELECT 
    i.inventory_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS number_waiting,
    STRING_AGG(w.child_name, ', ' ORDER BY w.added_date) AS waiting_children
FROM inventory i
JOIN film f ON i.film_id = f.film_id
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id 
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
GROUP BY i.inventory_id, f.film_id, f.title, f.rating
HAVING COUNT(w.waiting_id) > 0
ORDER BY number_waiting DESC;

--4. Test data insertion
-- First, find some available G/PG movies to add to waiting list
WITH available_children_movies AS (
    SELECT DISTINCT i.inventory_id, f.title, f.rating
    FROM inventory i
    JOIN film f ON i.film_id = f.film_id
    WHERE f.rating IN ('G', 'PG')
      AND NOT EXISTS (
          SELECT 1 
          FROM rental r 
          WHERE r.inventory_id = i.inventory_id 
            AND r.return_date IS NULL
      )
    LIMIT 10
)
SELECT * FROM available_children_movies;

-- Add test entries to waiting list
-- (Replace inventory_id and customer_id with actual values from your database)
INSERT INTO children_dvd_waiting_list 
    (inventory_id, customer_id, child_name, added_date, is_active)
VALUES
    (1, 1, 'Emma Johnson', CURRENT_TIMESTAMP - INTERVAL '2 days', TRUE),
    (1, 2, 'Liam Smith', CURRENT_TIMESTAMP - INTERVAL '1 day', TRUE),
    (1, 3, 'Olivia Williams', CURRENT_TIMESTAMP, TRUE),
    (2, 4, 'Noah Brown', CURRENT_TIMESTAMP - INTERVAL '3 days', TRUE),
    (2, 5, 'Ava Jones', CURRENT_TIMESTAMP - INTERVAL '1 day', TRUE),
    (3, 6, 'Lucas Garcia', CURRENT_TIMESTAMP, TRUE);

-- Test the count query with our test data
SELECT 
    i.inventory_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS number_waiting,
    STRING_AGG(w.child_name, ', ' ORDER BY w.added_date) AS waiting_children
FROM inventory i
JOIN film f ON i.film_id = f.film_id
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id 
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
  AND i.inventory_id IN (1, 2, 3)  -- Only show our test inventory
GROUP BY i.inventory_id, f.film_id, f.title, f.rating
ORDER BY number_waiting DESC;

-- Simulate a child picking up a DVD (mark as inactive)
UPDATE children_dvd_waiting_list 
SET is_active = FALSE, 
    pickup_date = CURRENT_TIMESTAMP,
    notes = 'DVD picked up on ' || CURRENT_DATE
WHERE waiting_id = 1;  -- First in line gets the DVD

-- Check updated counts
SELECT 
    i.inventory_id,
    f.title,
    COUNT(CASE WHEN w.is_active THEN 1 END) AS active_waiting,
    COUNT(w.waiting_id) AS total_waiting_entries,
    SUM(CASE WHEN w.is_active THEN 0 ELSE 1 END) AS fulfilled_requests
FROM inventory i
JOIN film f ON i.film_id = f.film_id
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id
WHERE f.rating IN ('G', 'PG')
  AND i.inventory_id IN (1, 2, 3)
GROUP BY i.inventory_id, f.title
ORDER BY active_waiting DESC;


--5. Additional useful queries
-- Find all children's movies with their availability status
SELECT 
    f.film_id,
    f.title,
    f.rating,
    COUNT(i.inventory_id) AS total_copies,
    COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) AS rented_copies,
    COUNT(CASE WHEN r.return_date IS NOT NULL OR r.rental_id IS NULL THEN 1 END) AS available_copies,
    COUNT(w.waiting_id) AS waiting_list_count
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id 
    AND r.return_date IS NULL  -- Currently rented
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id 
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
ORDER BY waiting_list_count DESC, available_copies ASC;

-- View for library staff to see waiting lists
CREATE VIEW library_waiting_list_report AS
SELECT 
    f.title,
    f.rating,
    i.inventory_id,
    COUNT(w.waiting_id) AS total_waiting,
    MIN(w.added_date) AS first_request,
    MAX(w.added_date) AS last_request,
    STRING_AGG(
        w.child_name || ' (since: ' || TO_CHAR(w.added_date, 'YYYY-MM-DD') || ')', 
        ', ' 
        ORDER BY w.added_date
    ) AS waiting_children
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN children_dvd_waiting_list w ON i.inventory_id = w.inventory_id 
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
GROUP BY f.title, f.rating, i.inventory_id
HAVING COUNT(w.waiting_id) > 0
ORDER BY total_waiting DESC, first_request;


