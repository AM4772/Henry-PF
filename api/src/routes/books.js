const { Router } = require("express");
const {
  getBookByTitle,
  getBookById,
  getBooks,
} = require("../controllers/BooksControllers");
const { Books } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      let book = await getBookByTitle(title);
      book ? res.json(book) : res.status(404).json("Book not found");
    } else {
      let dbBooks = await getBooks();
      dbBooks ? res.json(dbBooks) : res.status(404).json("No books found");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:ID", async (req, res) => {
  const { ID } = req.params;

  try {
    let book = await getBookById(ID);
    book
      ? res.json(book)
      : res.status(404).json("Book not found with id " + ID);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
