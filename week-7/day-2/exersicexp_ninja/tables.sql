CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answer INTEGER NOT NULL
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    option_text TEXT NOT NULL
);

CREATE TABLE questions_options (
    question_id INTEGER REFERENCES questions(id),
    option_id INTEGER REFERENCES options(id)
);

INSERT INTO questions (question, correct_answer)
VALUES ('What is the capital of France?', 2);

INSERT INTO options (option_text)
VALUES ('Berlin'), ('Paris'), ('Madrid'), ('Rome');

INSERT INTO questions_options (question_id, option_id)
VALUES (1,1), (1,2), (1,3), (1,4);
