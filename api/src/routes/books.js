const { Router } = require('express');
const {
  getBookByTitle,
  getBookById,
  getBooks,
  getHomeBooks,
  createBook,
  modifyBooks,
  deleteBook,
} = require('../controllers/BooksControllers');

const router = Router();

const { validateBook } = require('../utils/validations/bookValidations');

router.get('/', async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      let book = await getBookByTitle(title);
      book
        ? res.json(book)
        : res.status(404).json({ message: 'Book not found' });
    } else {
      let dbBooks = await getBooks();
      dbBooks
        ? res.json(dbBooks)
        : res.status(404).json({ message: 'No books found' });
    }
  } catch (err) {
    console.log(err);
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
      return res.status(400).json({ message: 'ID must be a number' });
    }
    let book = await getBookById(ID);
    book
      ? res.json(book)
      : res.status(404).json({ message: 'Book not found with id ' + ID });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const validate = await validateBook(req.body);
    if (!validate) {
      const newBook = await createBook(req.body);
      newBook
        ? res.status(201).json({ message: 'Book created successfully' })
        : res.status(400).json({ message: `Error creating book` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      const validate = await validateBook(req.body);
      if (!validate) {
        const modified = await modifyBooks(req.body, ID);
        modified
          ? res.status(200).json({ message: 'Book modified successfully' })
          : res.status(400).json({ message: `Error modifying book` });
      } else {
        res.status(400).json(validate);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (isNaN(ID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    const deletedBook = await deleteBook(ID);
    deletedBook
      ? res
          .status(201)
          .json({ message: `Book with id ${ID} deleted successfully` })
      : res.status(400).json({ message: `Error deleting book with id ${ID}` });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;
