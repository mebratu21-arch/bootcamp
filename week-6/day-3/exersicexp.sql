--get all language
select * from language;

--get all films joined with their languages
select f.title,f.description,l.name AS language_name from film f join language l on f.language_id = l.language_id;

--get all language,even if no film exit
select f.title,f.description,l.name as language_namae from language l left join film f on f.language_id = l.language_id;

--create new_film table
create table new_film(
id serial primary key,
name varchar(255) not null
);

--add some films
insert into new_film(name) values("samutai spirit");
insert into new_film(name) value("ocean dreams");

--create customer_review table
create table customer_review(
review_id serial primary key,
film_id int references new_film(id) on delete cascade,
language_id int references language(language_id);
title varchar(255);
score int check(score between 1 and 10),
review_text text,
last_update timestamp default current_timestamp
);

--add 2 reviews
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (1, 1, 'Epic Samurai Journey', 9, 'A thrilling story of honor and spirit.');

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (2, 2, 'Dreamy Ocean Tale', 8, 'Beautiful visuals and calming narrative.');

--delete a film with a review
delete from new_film where id=1;

      --Exercise 2: DVD Rental--

	  --update film language
	  update film
	  set language_id =2
	  where film_id = 10;

	  --foriegn key in customer table
	  store_id -> references store(store_id)
	  address_id -> references address(adderess_id)

	  --drop customer_review
	  drop table customer_review;

	  drop table customer_review cascade;

	--find outsiding rental
	select count(*) as outstandng_material
	from rental
	where return_date is null;

   --find 30 most expensive outstanding movies
   select f.title,f.rental_rate
   from rental r
   join inventory i on r.inventory_id = i.inventory_id
   join film f on i.film_id = f.film_id
   where r.return_date is null
   order by f.rental_rate desc
   limit 30;

   --help your friend find movies
   --film 1: sumo wrestler + penelope monroe

select f.title from film f
join film_actor fa on f.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id
where f.description ilike '%sum%'
and a.first_name = 'penelope' and a.last_name = 'monroe';

--short documentry(<1 hour,rate R)
select title from film 
where  length<60 and rating = 'R';

--film 3 :  mattehew mahan rantal
select f.title from rental r
join customer con r.customer_id = c.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
where c.first_name ='matthew' and c.last = 'mahan'
  and r.return_date between '2005-07-28' and'2005-08-01'
  and r.amount >4.00;

 --film 4: oat in title/description + expensive replacement
 select f.title from film f
 join rental r on f.film_id = r.inventory_id
 where (f.title ilike'%boat%' or f.description ilike '%boat%')
 order by f.replacement_cost desc
 limit 1;