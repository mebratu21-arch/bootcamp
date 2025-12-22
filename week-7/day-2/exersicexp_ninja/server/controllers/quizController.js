const Quiz = require("../models/quizModel");

exports.getQuestion = async (req, res) => {
  const id = req.params.id;
  const data = await Quiz.getQuestion(id);

  if (!data.question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json(data);
};

exports.checkAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  const data = await Quiz.getQuestion(questionId);

  const isCorrect = Number(selectedOption) === data.question.correct_answer;

  res.json({ correct: isCorrect });
};
