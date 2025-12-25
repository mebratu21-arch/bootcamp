const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizController");

router.get("/api/questions/:id", controller.getQuestion);
router.post("/api/questions/:id/answer", controller.submitAnswer);

module.exports = router;
