const { Router } = require("express");
const router = Router();

router.get("/", async (req, res, next) => {
  const { title } = req.query;

  try {
    if (title) {
      let searchBook = await getBookByTitle(title);
      if (searchBook.length) {
        return res.json(searchBook);
      } else {
        return res.status(404).json("Books not found");
      }
    } else {
      let dbBooks = await getBooksApi();
      res.send(dbBooks);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:ID", async (req, res, next) => {
  const { id } = req.params.ID;
  try {
    if (id) {
      let detailBook = await getBookById(id);
      if (detailBook) {
        return res.json(detailBook);
      } else null;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
