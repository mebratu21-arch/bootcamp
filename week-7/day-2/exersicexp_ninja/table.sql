CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  correct_answer_id INT
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  option_text TEXT NOT NULL
);

CREATE TABLE questions_options (
  question_id INT REFERENCES questions(id),
  option_id INT REFERENCES options(id),
  PRIMARY KEY (question_id, option_id)
);
