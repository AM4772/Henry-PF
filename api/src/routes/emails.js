const { Router } = require('express');
const router = Router();

const { registerEmail } = require('../controllers/EmailsControllers.js');

router.post('/', async (req, res) => {
  try {
    let emails = await registerEmail(req.body);
    emails
      ? res.json(emails)
      : res.status(404).json({ message: 'Cannot get emails' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
