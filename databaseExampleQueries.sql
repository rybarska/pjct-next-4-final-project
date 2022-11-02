-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(90) NOT NULL,
  password_hash varchar(70) NOT NULL,
  account_id integer,
  role_name varchar(40),
  email varchar(90),
  is_email_validated boolean,
  registration_token varchar,
);


-- Insert some animals (C in CRUD - Create)
INSERT INTO users
  (username, password_hash, account_id, role_name, email, is_email_validated, registration_token)
VALUES
  ('Ralph', 'Tiger', 'Gold chain'),
  ('Evelina', 'Hedgehog', 'Comb'),
  ('Otto', 'Otter', 'Stone'),
  ('Mayo', 'Dog', 'Sweater'),
  ('Kaaaarl', 'Llama', 'Toque');


-- Read some users (R in CRUD - Read)
SELECT * FROM users;
