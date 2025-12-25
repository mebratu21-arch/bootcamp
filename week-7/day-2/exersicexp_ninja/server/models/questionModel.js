const db = require("../config/db");

// Get all questions with options
const getAllQuestions = async () => {
  const questionsRes = await db.query("SELECT * FROM questions");
  const questions = [];

  for (let row of questionsRes.rows) {
    const optionsRes = await db.query(
      `SELECT o.id, o.option_text 
       FROM options o 
       JOIN questions_options qo ON o.id = qo.option_id 
       WHERE qo.question_id = $1`,
      [row.id]
    );
    questions.push({
      id: row.id,
      question: row.question,
      correct_answer_id: row.correct_answer_id,
      options: optionsRes.rows
    });
  }
  return questions;
};

// Get question by ID
const getQuestionById = async (id) => {
  const questionRes = await db.query("SELECT * FROM questions WHERE id=$1", [id]);
  if (questionRes.rows.length === 0) return null;

  const optionsRes = await db.query(
    `SELECT o.id, o.option_text 
     FROM options o 
     JOIN questions_options qo ON o.id = qo.option_id 
     WHERE qo.question_id = $1`,
    [id]
  );

  return {
    id: questionRes.rows[0].id,
    question: questionRes.rows[0].question,
    correct_answer_id: questionRes.rows[0].correct_answer_id,
    options: optionsRes.rows
  };
};

module.exports = { getAllQuestions, getQuestionById };
