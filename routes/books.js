const router = require("express").Router();

const Book = require("../models/Book");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", auth, async (req, res) => {
  const book = new Book(req.body);

  await book.save();

  res.status(201).json(book);
});

module.exports = router;
