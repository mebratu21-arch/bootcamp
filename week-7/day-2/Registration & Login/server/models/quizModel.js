const pool = require("../config/db");

module.exports = {
  getQuestion: async (id) => {
    const question = await pool.query(
      "SELECT * FROM questions WHERE id = $1",
      [id]
    );

    const options = await pool.query(
      `SELECT options.id, options.option 
       FROM options
       JOIN questions_options 
       ON options.id = questions_options.option_id
       WHERE questions_options.question_id = $1`,
      [id]
    );

    return {
      question: question.rows[0],
      options: options.rows
    };
  }
};
