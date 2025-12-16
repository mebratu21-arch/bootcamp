CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
)

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar')

SELECT * FROM FirstTab

CREATE TABLE SecondTab (
    id integer 
)

INSERT INTO SecondTab VALUES
(5),
(NULL)


SELECT * FROM SecondTab

--Q1
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id IS NULL
);

--Step 1: Evaluate subquery
SELECT id FROM SecondTab WHERE id IS NULL;
--Returns: NULL

/*Step 2: Evaluate ft.id NOT IN (NULL)

Any comparison with NULL is UNKNOWN → no rows satisfy

But: PostgreSQL allows NOT IN (NULL) to return all non-null rows

Actually, NOT IN (NULL) returns 0 rows in most SQL implementations (because x NOT IN (NULL) is UNKNOWN).

Answer: 0   */

--Q2
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id = 5
);

--Step 1: Subquery
SELECT id FROM SecondTab WHERE id = 5;


Returns: 5

--Step 2: Apply NOT IN

/*Compare each ft.id against 5:

ft.id	NOT IN (5)?
5	FALSE
6	TRUE
7	TRUE
NULL	UNKNOWN → excluded

Count of rows where condition is TRUE: 2 (6 and 7)

 Answer: 2 */

 --Q3
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab
);

--Step 1: Subquery
SELECT id FROM SecondTab;


Returns: 5, NULL

/*Step 2: NOT IN (5, NULL)

Any comparison with NULL → UNKNOWN

All comparisons fail → no row matches

 Answer: 0 */

--Q4
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id IS NOT NULL
);

--Step 1: Subquery
SELECT id FROM SecondTab WHERE id IS NOT NULL;


Returns: 5

/*Step 2: Apply NOT IN (5)
ft.id	NOT IN (5)?
5	FALSE
6	TRUE
7	TRUE
NULL	UNKNOWN → excluded

Count of rows where condition is TRUE: 2 (6 and 7)

 Answer: 2

 Summary Table
Query	COUNT(*)
Q1	0
Q2	2
Q3	0
Q4	2 */