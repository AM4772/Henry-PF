const { Router } = require('express');
const { confirmEmail } = require('../controllers/EmailsControllers');
const router = Router();

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { token } = req.query;
  try {
    let userEmail = await confirmEmail(token, ID);
    userEmail
      ? res.json({ message: 'Successful confirmation' })
      : res.status(404).json({ message: 'Cannot verify' });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
