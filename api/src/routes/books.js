const { Router } = require('express');
const {
  getBookByTitle,
  getBookById,
  getBooks,
  getHomeBooks,
} = require('../controllers/BooksControllers');

const router = Router();

const { validateBook } = require("../utils/validations/bookValidations");

router.get('/', async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      let book = await getBookByTitle(title);
      book ? res.json(book) : res.status(404).json({message:'Book not found'});
    } else {
      let dbBooks = await getBooks();
      dbBooks ? res.json(dbBooks) : res.status(404).json({message:'No books found'});
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/homeBooks', async (req, res) => {
  const books = await getHomeBooks();
  books
    ? res.send(books)
    : res.status(404).send({ message: 'Cannot get books' });
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    if (isNaN(ID)) {
      return res.status(400).json({message:'ID must be a number'});
    }
    let book = await getBookById(ID);
    book
      ? res.json(book)
      : res.status(404).json({message:'Book not found with id ' + ID});
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const validate = await validateBook(req.body);
    if (!validate) {
      const newBook = await createBook(req.body);
      newBook
        ? res.status(201).json({ message: "Book created successfully" })
        : res.status(400).json({ message: `Error creating book` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const validate = await validateBook(req.body);
    if (!validate) {
      const deletedBook = await deleteBook(req.body);
      deletedBook
        ? res.status(201).json({ message: "Book deleted successfully" })
        : res.status(400).json({ message: `Error deleting book` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
