const { Router } = require('express');
const {
  getBookByTitle,
  getBookById,
  getBooks,
  getHomeBooks,
} = require('../controllers/BooksControllers');

const router = Router();

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

module.exports = router;
