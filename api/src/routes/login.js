const { Router } = require("express");
const router = Router();

const { verifyLogin } = require("../utils/verifyLogin/verifyUserLogin");
const { verifyTokenLogin } = require("../utils/verifyLogin/autoLogin");

router.post('/', async (req, res) => {
  try {
    const validateLogin = await verifyLogin(req.body);
    validateLogin
      ? res.json(validateLogin)
      : res.status(400).json({ message: 'Wrong username or password' });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post('/autoLogin', async (req, res) => {
  try {
    const validateToken = await verifyTokenLogin(req.body.token);
    validateToken
      ? res.json(validateToken)
      : res.status(400).json({ message: 'Sign in error' });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
