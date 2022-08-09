const { Router } = require("express");
const router = Router();

const {
  categoriesStats,
  bookStats,
} = require("../controllers/StatsController");

router.get("/", async (req, res) => {
  try {
    const catStats = categoriesStats();
    const bStats = bookStats();
    if (catStats && bStats) res.json({ books: bStats, categories: catStats });
    else {
      res.status(404).json("Cannot get Stats");
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
