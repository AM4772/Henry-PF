const { Router } = require("express");
const router = Router();

const { getCategories } = require("../controllers/categoriesControllers.js");

router.get("/", async (req, res) => {
  try {
    let categories = await getCategories();
    categories
      ? res.json(categories)
      : res.status(404).json("Cannot get categories");
  } catch (err) {
    res.status(404).json(err);
  }
});
