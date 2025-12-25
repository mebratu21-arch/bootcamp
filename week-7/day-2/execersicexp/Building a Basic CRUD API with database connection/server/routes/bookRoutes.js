const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.get("/api/books", controller.getBooks);
router.get("/api/books/:bookId", controller.getBook);
router.post("/api/books", controller.createBook);

module.exports = router;
