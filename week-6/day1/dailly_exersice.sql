CREATE TABLE actors(
 actors_id SERIAL PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(100) NOT NULL,
 birth_date DATE NOT NULL,
number_oscars SMALLINT
 )
 SELECT * FROM actors

 INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES ('Matt', 'Damon', '08/10/1970', 5);

 

INSERT INTO actors (first_name, last_name, birth_date, oscars)
VALUES ('George', 'Clooney', '06/05/1961', 2);

SELECT COUNT(*) FROM actors;

/*
What will be the outcome?

 Success if you provide all NOT NULL fields (first_name, last_name, birth_date)

 Success even with empty strings for VARCHAR fields

 Error if you try to insert NULL for NOT NULL fields

 Error if you omit NOT NULL fields without defaults

 Success if you omit nullable fields (like number_oscars)
*/

-- Fix the column name from 'oscars' to 'number_oscars'
INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES ('George', 'Clooney', '1961-06-05', 2);