const Question = require("../models/questionModel");

// GET /api/questions/:id
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    
    // Do not send correct_answer_id to user
    const { correct_answer_id, ...questionWithoutAnswer } = question;
    res.json(questionWithoutAnswer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/questions/:id/answer
exports.submitAnswer = async (req, res) => {
  try {
    const { answer_id } = req.body;
    const question = await Question.getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const isCorrect = question.correct_answer_id === answer_id;
    res.json({ correct: isCorrect });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
