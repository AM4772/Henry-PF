const { Router } = require("express");
const router = Router();

const { getAuthors } = require("../controllers/authorControllers.js");

router.get("/", async (req, res) => {
  try {
    let authors = await getAuthors();
    authors ? res.json(authors) : res.status(404).json("Cannot get authors");
  } catch (err) {
    res.status(404).json(err);
  }
});
