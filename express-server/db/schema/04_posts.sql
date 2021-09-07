DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  opinion TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT min_summary_length CHECK (length(summary) > 99),
  CONSTRAINT max_summary_length CHECK (length(summary) < 1001),
  CONSTRAINT min_opinion_length CHECK (length(opinion) > 49),
  CONSTRAINT max_opinion_length CHECK (length(opinion) < 251)
);
