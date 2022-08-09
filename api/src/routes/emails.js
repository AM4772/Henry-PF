const { Router } = require('express');
const router = Router();

const {
  registerEmail,
  resetEmail,
  eBookEmail,
} = require('../controllers/EmailsControllers.js');
const { getEmails } = require('../controllers/UsersControllers.js');

router.get('/', async (req, res) => {
  try {
    let emails = await getEmails();
    emails
      ? res.json(emails)
      : res.status(404).json({ message: 'Cannot get emails' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.post('/register', async (req, res) => {
  const { username } = req.body;
  try {
    let emails = await registerEmail(username);
    if (emails === 1) {
      return res.status(400).json({ message: `User already enabled` });
    }
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
    let resetUser = await resetEmail(req.body);

    resetUser
      ? res.json({ data: resetUser, message: 'Reset email sent' })
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
