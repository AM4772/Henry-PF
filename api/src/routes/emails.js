const { Router } = require("express");
const router = Router();

const { getEmails } = require("../controllers/UsersControllers");

router.get("/", async (req, res) => {
  try {
    let emails = await getEmails();
    emails
      ? res.json(emails)
      : res.status(404).json({ message: "Cannot get emails" });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
