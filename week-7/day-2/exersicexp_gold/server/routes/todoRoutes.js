const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoController");

router.get("/api/todos", controller.getTodos);
router.get("/api/todos/:id", controller.getTodo);
router.post("/api/todos", controller.createTodo);
router.put("/api/todos/:id", controller.updateTodo);
router.delete("/api/todos/:id", controller.deleteTodo);

module.exports = router;
