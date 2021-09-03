DROP TABLE IF EXISTS user_badges CASCADE;

CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
  CONSTRAINT no_duplicate_badges UNIQUE (user_id, badge_id)
);
