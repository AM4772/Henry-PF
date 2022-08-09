const { Router } = require('express');
const {
  confirmEmail,
  confirmReset,
} = require('../controllers/EmailsControllers');
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
    res.status(404).json({ message: 'ERROR: Cannot verify' });
  }
});

router.post('/reset', async (req, res) => {
  try {
    let userReset = await confirmReset(req.body);
    userReset === 1
      ? res.status(404).json({ message: 'Invalid reset code' })
      : userReset
      ? res.json({ data: userReset, message: 'Successful confirmation' })
      : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'ERROR: Cannot verify' });
  }
});

module.exports = router;
