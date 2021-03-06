CREATE EXTENSION IF NOT EXISTS citext;  
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email citext NOT NULL,
  password VARCHAR(255) NOT NULL,
  post_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  page_count INTEGER NOT NULL DEFAULT 0,
  active_badge INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT email_unique UNIQUE (email)
);
