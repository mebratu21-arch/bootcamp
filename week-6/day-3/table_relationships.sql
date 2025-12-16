		--Part I: One-to-One Relationship
--1. Create Tables
-- Create Customer table
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Create Customer_profile table
CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INTEGER UNIQUE NOT NULL,  -- UNIQUE ensures One-to-One
    FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE
);

--2. Insert Customers
INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

--3. Insert Customer Profiles using Subqueries
-- John is loggedIn
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (true, (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe'));

-- Jerome is not logged in
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (false, (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

--4. Queries with Joins
-- The first_name of the LoggedIn customers (INNER JOIN)
SELECT c.first_name
FROM Customer c
INNER JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = true;
-- Result: John

-- All customers first_name and isLoggedIn columns (LEFT JOIN)
SELECT c.first_name, COALESCE(cp.isLoggedIn, false) AS isLoggedIn
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id;
-- Result: John (true), Jerome (false), Lea (false)

-- Number of customers that are not LoggedIn
SELECT COUNT(*) AS not_logged_in_count
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = false OR cp.isLoggedIn IS NULL;
-- Result: 2 (Jerome and Lea)


     --Part II: Many-to-Many Relationship

	 --1. Create Book Table
	 CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

--2. Create Student Table with Age Constraint
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)  -- Ensures age never exceeds 15
);

--3. Create Library Junction Table
CREATE TABLE Library (
    book_fk_id INTEGER,
    student_fk_id INTEGER,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id),  -- Composite primary key
    FOREIGN KEY (book_fk_id) REFERENCES Book(book_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES Student(student_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

--4. Insert Books
INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

--5. Insert Students
INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

--6. Insert Library Records using Subqueries
-- John borrowed Alice In Wonderland on 15/02/2022
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'John'),
    '2022-02-15'
);

-- Bob borrowed To kill a mockingbird on 03/03/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-03-03'
);

-- Lera borrowed Alice In Wonderland on 23/05/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'Lera'),
    '2021-05-23'
);

-- Bob borrowed Harry Potter on 12/08/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-08-12'
);


--7. Display Data
-- Select all columns from the junction table
SELECT * FROM Library;
-- Result: 4 records showing book-student borrow relationships

-- Select name of student and title of borrowed books
SELECT s.name AS student_name, b.title AS book_title, l.borrowed_date
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
ORDER BY l.borrowed_date;
/*
Result:
Bob | To kill a mockingbird | 2021-03-03
Lera | Alice In Wonderland | 2021-05-23
Bob | Harry Potter | 2021-08-12
John | Alice In Wonderland | 2022-02-15
*/

-- Select average age of children who borrowed 'Alice in Wonderland'
SELECT ROUND(AVG(s.age), 2) AS average_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';
-- Result: 11.50 (average of John (12) and Lera (11))

-- Show which students borrowed which books
SELECT 
    s.name AS student,
    b.title AS book,
    b.author,
    l.borrowed_date
FROM Student s
LEFT JOIN Library l ON s.student_id = l.student_fk_id
LEFT JOIN Book b ON l.book_fk_id = b.book_id
ORDER BY s.name, l.borrowed_date;


--8. Delete a Student
-- First, check current Library records
SELECT * FROM Library WHERE student_fk_id = (SELECT student_id FROM Student WHERE name = 'Bob');
-- Result: Bob has 2 borrowed books

-- Delete Bob from Student table
DELETE FROM Student WHERE name = 'Bob';

-- Check Library table after deletion
SELECT * FROM Library;
-- Result: Only 2 records remain (John and Lera's borrowings)
-- Bob's records were automatically deleted due to ON DELETE CASCADE

--9. Additional Analysis Queries
-- Count books borrowed per student
SELECT 
    s.name AS student_name,
    COUNT(l.book_fk_id) AS books_borrowed,
    STRING_AGG(b.title, ', ' ORDER BY l.borrowed_date) AS books_list
FROM Student s
LEFT JOIN Library l ON s.student_id = l.student_fk_id
LEFT JOIN Book b ON l.book_fk_id = b.book_id
GROUP BY s.name
ORDER BY books_borrowed DESC;

-- Find most popular book
SELECT 
    b.title,
    COUNT(l.student_fk_id) AS times_borrowed,
    STRING_AGG(s.name, ', ' ORDER BY l.borrowed_date) AS borrowed_by
FROM Book b
LEFT JOIN Library l ON b.book_id = l.book_fk_id
LEFT JOIN Student s ON l.student_fk_id = s.student_id
GROUP BY b.title
ORDER BY times_borrowed DESC;

-- Check which books haven't been borrowed
SELECT b.title, b.author
FROM Book b
LEFT JOIN Library l ON b.book_id = l.book_fk_id
WHERE l.book_fk_id IS NULL;

-- Find students who haven't borrowed any books
SELECT s.name, s.age
FROM Student s
LEFT JOIN Library l ON s.student_id = l.student_fk_id
WHERE l.student_fk_id IS NULL;

