const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizController");

router.get("/:id", controller.getQuestion);
router.post("/check", controller.checkAnswer);

module.exports = router;
