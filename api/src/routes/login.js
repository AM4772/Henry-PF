const { Router } = require("express");
const router = Router();

const { verifyLogin } = require("");

router.post("/login", async (req, res) => {
  try {
    const validateLogin = verifyLogin(req.body);
    validateLogin
      ? res.status(201).json(validateLogin)
      : res.status(400).json("Wrong username or password");
  } catch (err) {
    next(err.message);
  }
});

module.exports = router;
