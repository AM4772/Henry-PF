const { Router } = require('express');
const router = Router();

const {
  registerEmail,
  resetEmail,
  eBookEmail,
} = require('../controllers/EmailsControllers.js');

router.post('/register', async (req, res) => {
  try {
    let emails = await registerEmail(req.body);
    emails
      ? res.json({ message: 'Register email sent' })
      : res.status(404).json({ message: 'Cannot send register email' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.post('/reset', async (req, res) => {
  try {
    let emails = await resetEmail(req.body);
    emails
      ? res.json({ message: 'Reset email sent' })
      : res.status(404).json({ message: 'Cannot send reset email' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.post('/eBook', async (req, res) => {
  const { userID, items } = req.body;

  try {
    let emails = await eBookEmail(userID, items);
    emails
      ? res.json({ message: 'eBook email sent' })
      : res.status(404).json({ message: 'Cannot send eBook' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});
module.exports = router;
