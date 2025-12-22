const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.get("/", controller.getAllBooks);
router.get("/:bookId", controller.getBookById);
router.post("/", controller.createBook);

module.exports = router;
