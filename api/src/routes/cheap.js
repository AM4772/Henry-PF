const { Router } = require("express");
const { getBookCheap } = require("../controllers/BooksFilter");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let dbBooks = await getBookCheap();
    dbBooks ? res.json(dbBooks) : res.status(404).json("No books found");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
