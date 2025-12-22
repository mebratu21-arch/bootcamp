const express = require("express");
const router = express.Router();
const controller = require("../controllers/todosController");

router.get("/", controller.getAllTodos);
router.get("/:id", controller.getTodoById);
router.post("/", controller.createTodo);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
