const { Router } = require("express");
const router = Router();

const { verifyLogin } = require("../utils/verifyLogin/verifyUserLogin");

router.post("/", async (req, res) => {
  try {
    const validateLogin = verifyLogin(req.body);
    validateLogin
      ? res.status(201).json(validateLogin)
      : res.status(400).json("Wrong username or password");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
