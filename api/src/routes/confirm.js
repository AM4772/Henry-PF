const { Router } = require('express');
const { confirmEmail } = require('../controllers/EmailsControllers');
const router = Router();

router.get('/', async (req, res) => {
  const { token } = req.query;
  try {
    let userEmail = await confirmEmail(token);
    userEmail
      ? res.json({ message: 'Successful confirmation' })
      : res.status(404).json({ message: 'Cannot verify' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
