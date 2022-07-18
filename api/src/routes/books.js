const { Router } = require('express');
const {
  getBookByTitle,
  getBookById,
} = require('../controllers/BooksControllers');
const { Books } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      let searchBook = await getBookByTitle(title);
      if (searchBook.length) {
        return res.json(searchBook);
      } else {
        return res.status(404).json('Book not found');
      }
    } else {
      let dbBooks = await Books.findAll();
      res.send(dbBooks);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    let book = await getBookById(ID);
    if (!book) {
      return res.status(404).send('Book not found with id ' + ID);
    }
    res.json(book);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
