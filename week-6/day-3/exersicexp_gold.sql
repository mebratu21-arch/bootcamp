			--exersice 1 : dvd rental

--list of all rentals which are out (not returned)
-- Rentals are identified as "out" when return_date is NULL
SELECT rental_id, rental_date, inventory_id, customer_id
FROM rental
WHERE return_date IS NULL;

--list of customers who have not returned their rentals(grouped)
-- Grouping by customer to see each customer's unreturned rentals
SELECT 
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    COUNT(r.rental_id) AS unreturned_count
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY unreturned_count DESC;

--Action films with Joe Swank
-- Using existing views if available
-- First check if there's a film_list view
SELECT * FROM information_schema.views 
WHERE table_name LIKE '%film%list%';

-- If film_list view exists (common in DVD rental database):
SELECT title, description, category
FROM film_list
WHERE category = 'Action' 
AND actors LIKE '%Joe Swank%';

-- If no view exists, use table joins:
SELECT 
    f.title,
    f.description,
    c.name AS category,
    a.first_name || ' ' || a.last_name AS actor_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE c.name = 'Action'
AND a.first_name = 'Joe'
AND a.last_name = 'Swank';

     		--Exercise 2: Happy Halloween
	--1. Stores with city and country information
SELECT 
    s.store_id,
    a.address,
    a.district,
    c.city,
    co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id;

--2. Viewing time per store (excluding non-returned items)
-- Total viewing time in minutes
SELECT 
    i.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / (60.0 * 24.0), 2) AS total_days
FROM inventory i
JOIN film f ON i.film_id = f.film_id
-- Exclude inventory items that are currently rented out
WHERE i.inventory_id NOT IN (
    SELECT inventory_id 
    FROM rental 
    WHERE return_date IS NULL
)
GROUP BY i.store_id;

--3. Customers in store cities
SELECT DISTINCT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    ci.city,
    co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE ci.city_id IN (
    SELECT DISTINCT a.city_id
    FROM store s
    JOIN address a ON s.address_id = a.address_id
)
ORDER BY ci.city, c.last_name, c.first_name;

--4. Customers in store countries
SELECT DISTINCT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    ci.city,
    co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT DISTINCT co.country_id
    FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
)
ORDER BY co.country, ci.city, c.last_name, c.first_name;

--5. Safe list and viewing time calculation
-- General list (all movies, excluding non-returned)
WITH available_films AS (
    SELECT DISTINCT f.film_id, f.length, f.title, f.description
    FROM inventory i
    JOIN film f ON i.film_id = f.film_id
    WHERE i.inventory_id NOT IN (
        SELECT inventory_id 
        FROM rental 
        WHERE return_date IS NULL
    )
),
general_list AS (
    SELECT 
        'General' AS list_type,
        SUM(length) AS total_minutes,
        ROUND(SUM(length) / 60.0, 2) AS total_hours,
        ROUND(SUM(length) / (60.0 * 24.0), 2) AS total_days
    FROM available_films
),
safe_films AS (
    SELECT film_id, length
    FROM available_films af
    WHERE NOT EXISTS (
        -- Exclude Horror category
        SELECT 1 
        FROM film_category fc
        JOIN category c ON fc.category_id = c.category_id
        WHERE fc.film_id = af.film_id
        AND c.name = 'Horror'
    )
    AND (
        -- Exclude films with scary words in title or description
        LOWER(af.title) NOT LIKE ANY(ARRAY[
            '%beast%', '%monster%', '%ghost%', 
            '%dead%', '%zombie%', '%undead%'
        ])
        AND 
        (af.description IS NULL OR 
         LOWER(af.description) NOT LIKE ANY(ARRAY[
            '%beast%', '%monster%', '%ghost%', 
            '%dead%', '%zombie%', '%undead%'
        ]))
    )
),
safe_list AS (
    SELECT 
        'Safe' AS list_type,
        SUM(length) AS total_minutes,
        ROUND(SUM(length) / 60.0, 2) AS total_hours,
        ROUND(SUM(length) / (60.0 * 24.0), 2) AS total_days
    FROM safe_films
)
-- Combine both lists
SELECT * FROM general_list
UNION ALL
SELECT * FROM safe_list;



	