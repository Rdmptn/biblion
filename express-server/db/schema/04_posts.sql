DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  opinion TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_duplicate_posts UNIQUE (user_id, book_id),
  CONSTRAINT min_summary_length CHECK (length(summary) > 100),
  CONSTRAINT max_summary_length CHECK (length(summary) < 1000),
  CONSTRAINT min_opinion_length CHECK (length(opinion) > 50),
  CONSTRAINT max_opinion_length CHECK (length(opinion) < 250)
);
