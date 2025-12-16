  -- Main Exercise
 --1. Create Tables
 -- Create product_orders table
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    order_status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    total_amount DECIMAL(10, 2) DEFAULT 0.00
);

-- Create items table with price column
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    -- One-to-many relationship: one order can have many items
    FOREIGN KEY (order_id) REFERENCES product_orders(order_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add an index for better performance when querying by order_id
CREATE INDEX idx_items_order_id ON items(order_id);

--2. Insert Sample Data
-- Insert sample orders
INSERT INTO product_orders (order_date, shipping_address, order_status) VALUES
('2024-01-15', '123 Main St, New York, NY', 'shipped'),
('2024-01-16', '456 Oak Ave, Los Angeles, CA', 'delivered'),
('2024-01-17', '789 Pine Rd, Chicago, IL', 'pending');

-- Insert sample items for each order
INSERT INTO items (order_id, product_name, description, price, quantity) VALUES
(1, 'Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 2),
(1, 'Keyboard', 'Mechanical gaming keyboard', 89.99, 1),
(2, 'Monitor', '27-inch 4K monitor', 299.99, 1),
(2, 'Webcam', 'HD 1080p webcam', 49.99, 1),
(2, 'Headphones', 'Noise-cancelling headphones', 129.99, 1),
(3, 'Laptop Stand', 'Adjustable aluminum stand', 39.99, 3);

--3. Function to Return Total Price for a Given Order
-- Function to calculate total price for a specific order
CREATE OR REPLACE FUNCTION get_order_total(order_id_param INTEGER)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_price DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total_price
    FROM items
    WHERE order_id = order_id_param;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT get_order_total(1) AS order_1_total;
-- Expected: (29.99 * 2) + (89.99 * 1) = 149.97

SELECT get_order_total(2) AS order_2_total;
-- Expected: 299.99 + 49.99 + 129.99 = 479.97

SELECT get_order_total(3) AS order_3_total;
-- Expected: 39.99 * 3 = 119.97

-- Verify with a query
SELECT 
    order_id,
    product_name,
    price,
    quantity,
    (price * quantity) AS item_total
FROM items
WHERE order_id = 1;

--4. Alternative Function Using RETURN QUERY
-- Function that returns a table with order details and total
CREATE OR REPLACE FUNCTION get_order_details_with_total(order_id_param INTEGER)
RETURNS TABLE (
    product_name VARCHAR,
    price DECIMAL(10, 2),
    quantity INTEGER,
    item_total DECIMAL(10, 2),
    order_total DECIMAL(10, 2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.product_name,
        i.price,
        i.quantity,
        (i.price * i.quantity) AS item_total,
        (SELECT get_order_total(order_id_param)) AS order_total
    FROM items i
    WHERE i.order_id = order_id_param;
END;
$$ LANGUAGE plpgsql;

-- Test this function
SELECT * FROM get_order_details_with_total(1);

		--Bonus Exercise
--1. Create Users Table and Update Relationships
-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Add user_id column to product_orders table (one-to-many: user can have many orders)
ALTER TABLE product_orders 
ADD COLUMN user_id INTEGER,
ADD CONSTRAINT fk_user 
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Add index for user_id in product_orders
CREATE INDEX idx_product_orders_user_id ON product_orders(user_id);

--2. Insert Sample Users and Update Orders
-- Insert sample users
INSERT INTO users (username, email, full_name, registration_date) VALUES
('johndoe', 'john@example.com', 'John Doe', '2023-12-01'),
('janedoe', 'jane@example.com', 'Jane Smith', '2023-12-05'),
('bobsmith', 'bob@example.com', 'Bob Johnson', '2024-01-01');

-- Update existing orders with user_ids
UPDATE product_orders SET user_id = 1 WHERE order_id = 1;  -- John's order
UPDATE product_orders SET user_id = 2 WHERE order_id = 2;  -- Jane's order
UPDATE product_orders SET user_id = 1 WHERE order_id = 3;  -- John's second order

-- Insert more orders for testing
INSERT INTO product_orders (order_date, shipping_address, order_status, user_id) VALUES
('2024-01-18', '321 Elm St, Boston, MA', 'shipped', 3),
('2024-01-19', '654 Maple Dr, Seattle, WA', 'pending', 2);

-- Add items for new orders
INSERT INTO items (order_id, product_name, description, price, quantity) VALUES
(4, 'USB Cable', 'USB-C to USB-C cable', 19.99, 2),
(4, 'Power Bank', '10000mAh power bank', 39.99, 1),
(5, 'Desk Lamp', 'LED desk lamp with dimmer', 59.99, 1);

--3. Function to Return Total Price for a Given Order of a Given User
-- Function to get order total for a specific user and order
-- This ensures the order belongs to the specified user
CREATE OR REPLACE FUNCTION get_user_order_total(
    user_id_param INTEGER,
    order_id_param INTEGER
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_price DECIMAL(10, 2);
BEGIN
    -- Calculate total only if the order belongs to the user
    SELECT COALESCE(SUM(i.price * i.quantity), 0)
    INTO total_price
    FROM items i
    JOIN product_orders po ON i.order_id = po.order_id
    WHERE i.order_id = order_id_param
      AND po.user_id = user_id_param;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test the function
-- Should return 149.97 (John's order 1)
SELECT get_user_order_total(1, 1) AS john_order_1_total;

-- Should return 479.97 (Jane's order 2)
SELECT get_user_order_total(2, 2) AS jane_order_2_total;

-- Should return 0 (Order 2 doesn't belong to user 1)
SELECT get_user_order_total(1, 2) AS invalid_combination;

--4. More Robust Function with Error Handling
-- Function with error handling for non-existent user/order
CREATE OR REPLACE FUNCTION get_user_order_total_secure(
    user_id_param INTEGER,
    order_id_param INTEGER
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_price DECIMAL(10, 2);
    user_exists BOOLEAN;
    order_exists BOOLEAN;
BEGIN
    -- Check if user exists
    SELECT EXISTS(SELECT 1 FROM users WHERE user_id = user_id_param) INTO user_exists;
    IF NOT user_exists THEN
        RAISE NOTICE 'User with ID % does not exist', user_id_param;
        RETURN 0;
    END IF;
    
    -- Check if order exists
    SELECT EXISTS(SELECT 1 FROM product_orders WHERE order_id = order_id_param) INTO order_exists;
    IF NOT order_exists THEN
        RAISE NOTICE 'Order with ID % does not exist', order_id_param;
        RETURN 0;
    END IF;
    
    -- Calculate total
    SELECT COALESCE(SUM(i.price * i.quantity), 0)
    INTO total_price
    FROM items i
    JOIN product_orders po ON i.order_id = po.order_id
    WHERE i.order_id = order_id_param
      AND po.user_id = user_id_param;
    
    -- If total is 0, the order might not belong to the user
    IF total_price = 0 THEN
        -- Check if order exists but belongs to different user
        IF EXISTS(SELECT 1 FROM product_orders WHERE order_id = order_id_param) THEN
            RAISE NOTICE 'Order % does not belong to user % or has no items', order_id_param, user_id_param;
        END IF;
    END IF;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test error handling
SELECT get_user_order_total_secure(999, 1) AS non_existent_user;
SELECT get_user_order_total_secure(1, 999) AS non_existent_order;
SELECT get_user_order_total_secure(3, 1) AS wrong_user_order;

--5. View for Order Summary
-- Create a view to see all orders with totals
CREATE VIEW order_summary AS
SELECT 
    po.order_id,
    po.order_date,
    po.order_status,
    u.username,
    u.full_name,
    COUNT(i.item_id) AS total_items,
    SUM(i.quantity) AS total_quantity,
    get_order_total(po.order_id) AS order_total
FROM product_orders po
LEFT JOIN users u ON po.user_id = u.user_id
LEFT JOIN items i ON po.order_id = i.order_id
GROUP BY po.order_id, u.username, u.full_name
ORDER BY po.order_date DESC;

-- Query the view
SELECT * FROM order_summary;

-- Filter by user
SELECT * FROM order_summary WHERE username = 'johndoe';

--6. Trigger to Automatically Update Order Total
-- Create function for trigger
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total_amount in product_orders when items change
    UPDATE product_orders
    SET total_amount = (
        SELECT COALESCE(SUM(price * quantity), 0)
        FROM items
        WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
    )
    WHERE order_id = COALESCE(NEW.order_id, OLD.order_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for INSERT, UPDATE, DELETE on items table
CREATE TRIGGER trg_update_order_total_insert
AFTER INSERT ON items
FOR EACH ROW
EXECUTE FUNCTION update_order_total();

CREATE TRIGGER trg_update_order_total_update
AFTER UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_order_total();

CREATE TRIGGER trg_update_order_total_delete
AFTER DELETE ON items
FOR EACH ROW
EXECUTE FUNCTION update_order_total();

-- Test the trigger
INSERT INTO items (order_id, product_name, price, quantity) 
VALUES (1, 'Mouse Pad', 14.99, 1);

-- Check if order total was updated
SELECT order_id, total_amount FROM product_orders WHERE order_id = 1;


--7. Advanced Query Examples
-- Get all orders for a user with details
SELECT 
    u.username,
    u.full_name,
    po.order_id,
    po.order_date,
    po.order_status,
    i.product_name,
    i.price,
    i.quantity,
    (i.price * i.quantity) AS item_subtotal
FROM users u
JOIN product_orders po ON u.user_id = po.user_id
JOIN items i ON po.order_id = i.order_id
WHERE u.user_id = 1
ORDER BY po.order_date DESC, i.product_name;

-- Get user spending summary
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    COUNT(DISTINCT po.order_id) AS total_orders,
    SUM(i.price * i.quantity) AS total_spent,
    ROUND(AVG(i.price * i.quantity), 2) AS avg_order_value
FROM users u
LEFT JOIN product_orders po ON u.user_id = po.user_id
LEFT JOIN items i ON po.order_id = i.order_id
GROUP BY u.user_id, u.username, u.full_name
ORDER BY total_spent DESC NULLS LAST;

-- Find most popular products
SELECT 
    product_name,
    COUNT(*) AS times_ordered,
    SUM(quantity) AS total_quantity_sold,
    SUM(price * quantity) AS total_revenue
FROM items
GROUP BY product_name
ORDER BY total_quantity_sold DESC;

-- Monthly sales report
SELECT 
    DATE_TRUNC('month', po.order_date) AS month,
    COUNT(DISTINCT po.order_id) AS orders_count,
    COUNT(i.item_id) AS items_sold,
    SUM(i.quantity) AS total_quantity,
    SUM(i.price * i.quantity) AS total_revenue
FROM product_orders po
JOIN items i ON po.order_id = i.order_id
GROUP BY DATE_TRUNC('month', po.order_date)
ORDER BY month DESC;


