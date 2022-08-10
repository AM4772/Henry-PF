const { Router } = require('express');
const router = Router();

const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');
const { verifyTokenLogin } = require('../utils/verifyLogin/autoLogin');
const { enabledSuspendedUser } = require('../controllers/UsersControllers');

router.post('/', async (req, res) => {
  try {
    const validateLogin = await verifyLogin(req.body);
    if (validateLogin === 5) {
      return res.status(401).json({ message: 'User has been banned' });
    }
    if (validateLogin === 10) {
      return res.status(404).json({ message: 'Please check your email' });
    }
    if (validateLogin === 1) {
      return res
        .status(404)
        .json({ message: 'User not found, consider registering' });
    }
    validateLogin
      ? res.json(validateLogin)
      : res.status(400).json({ message: 'Wrong username or password' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.post('/autoLogin', async (req, res) => {
  try {
    const validateToken = await verifyTokenLogin(req.body.token);
    if (validateToken === 5) {
      return res.status(401).json({ message: 'User has been banned' });
    }
    validateToken
      ? res.json(validateToken)
      : res.status(200).json({ message: 'Sign in error' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.post('/enable/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    const enabledUser = await enabledSuspendedUser(ID);
    if (enabledUser === 1) {
      return res.status(404).send({
        message: 'User not found',
      });
    }
    enabledUser
      ? res.json(enabledUser)
      : res.status(400).json({ message: 'Cannot enable user' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;
