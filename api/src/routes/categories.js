const { Router } = require("express");
const router = Router();

const { getCategories } = require("../controllers/CategoriesControllers.js");

router.get("/", async (req, res) => {
  try {
    let categories = await getCategories();
    categories
      ? res.json(categories)
      : res.status(404).json({message:"Cannot get categories"});
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
