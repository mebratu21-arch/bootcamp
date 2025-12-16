CREATE DATABASE bootcamp;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,        -- auto-incremented ID
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL      -- DATE data type
);

INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03');

INSERT INTO students (first_name, last_name, birth_date) VALUES
('Mebratu', 'Mengstu', '1999/02/26');

SELECT * FROM students;

SELECT first_name, last_name FROM students;

SELECT first_name, last_name FROM students
WHERE id = 2;

SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' AND first_name = 'Marc';

SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' OR first_name = 'Marc';

SELECT first_name, last_name FROM students
WHERE first_name ILIKE 'a%';

SELECT first_name, last_name FROM students
WHERE first_name ILIKE 'a%';

SELECT first_name, last_name FROM students
WHERE first_name ILIKE '%a';

SELECT first_name, last_name FROM students
WHERE SUBSTRING(first_name FROM LENGTH(first_name)-1 FOR 1) = 'a';

SELECT first_name, last_name FROM students
WHERE id IN (1,3);

SELECT * FROM students
WHERE birth_date >= '2000-01-01';

