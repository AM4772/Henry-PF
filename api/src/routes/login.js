const { Router } = require('express');
const router = Router();

const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');
const { verifyTokenLogin } = require('../utils/verifyLogin/autoLogin');
const { enabledSuspendedUser } = require('../controllers/UsersControllers');

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
    res.status(400).json(err.message);
  }
});

module.exports = router;
