DROP TABLE IF EXISTS category;
CREATE TABLE category (
  id integer not null,
  created datetime,
  header varchar(255),
  image_path varchar(120),
  name varchar(50) not null,
  updated datetime,
  version integer,
  visible bit DEFAULT b'1',
  parent_id integer,
  primary key (id)
);

ALTER TABLE category ADD CONSTRAINT FK2y94svpmqttx80mshyny85wqr FOREIGN KEY (parent_id) REFERENCES category (id);

DROP TABLE IF EXISTS category_sequence;
CREATE TABLE category_sequence (
  next_val bigint
);

insert into category_sequence values ( 1020 );

