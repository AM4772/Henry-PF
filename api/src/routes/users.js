const { Router } = require("express");
const {
  getUserByUserName,
  getUserById,
  createUsers,
} = require("../controllers/BooksControllers");
const { Users } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  const { userName } = req.query;

  try {
    if (userName) {
      let searchName = await getUserByUserName(userName);
      if (searchName.length) {
        return res.json(searchName);
      } else {
        return res.status(404).json("Users not found");
      }
    } else {
      let dbUsers = await Users.findAll();
      res.send(dbUsers);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:ID", async (req, res, next) => {
  const { id } = req.params.ID;
  try {
    if (id) {
      let detailUser = await getUserById(id);
      if (detailUser) {
        return res.json(detailUser);
      } else null;
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUsers = await createUsers(req.body);

    if (newUsers) return res.status(200).json("User created successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
