create table pictures
( 
 id SERIAL primary key,
 name varchar(255) not null,
 size int not null,
 description varchar(255) not null,
 mimetype varchar(255) not null
);
create table colors
( 
 id SERIAL primary key,
 name varchar(255) not null
);
create table movies 
( 
 id SERIAL primary key,
 name varchar(255) not null
);
create table univers 
( 
 id SERIAL primary key,
 name varchar(255) not null
);
create table users
(
 id SERIAL PRIMARY KEY,
 username	varchar(255) not null,
 email varchar(255) unique not null,
 password char(60) not null,
 admin boolean
);
create table characters
( 
 id SERIAL primary key,
 name varchar(255) not null,
 id_pictures int not null references pictures(id)
);
create table belong
(
 id_univers int not null references univers (id),
 id_characters int not null references characters (id),
 primary key (id_univers, id_characters)
 );
create table to_in
( 
 id_movies int not null references movies(id),
 id_characters int not null references characters (id),
 primary key (id_movies, id_characters)
);
create table to_own
( 
 id_colors int not null references colors (id),
 id_characters int not null references characters (id),
 primary key (id_colors, id_characters)
);
create table to_like
( 
 id_users int not null references users (id),
 id_characters int not null references characters (id),
 primary key (id_users, id_characters)
);
