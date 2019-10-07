create table people_greeted(
	id serial not null primary key,
    name varchar(20) not null,
    greeted int not null
);