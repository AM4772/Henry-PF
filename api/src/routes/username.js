const { Router } = require("express");
const router = Router();

const { getUsernames } = require("../controllers/UsersControllers");

router.get("/", async (req, res) => {
  try {
    let userNames = await getUsernames();
    userNames
      ? res.json(userNames)
      : res.status(404).json({ message: "Cannot get usernames" });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
