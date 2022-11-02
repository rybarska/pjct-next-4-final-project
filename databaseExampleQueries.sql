-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(90) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(40)
);


-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
  (first_name, type, accessory)
VALUES
  ('Ralph', 'Tiger', 'Gold chain'),
  ('Evelina', 'Hedgehog', 'Comb'),
  ('Otto', 'Otter', 'Stone'),
  ('Mayo', 'Dog', 'Sweater'),
  ('Kaaaarl', 'Llama', 'Toque');


-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;
