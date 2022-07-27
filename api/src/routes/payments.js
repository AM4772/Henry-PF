const { Router } = require('express');
const {
  getPayments
} = require('../controllers/PaymentControllers');

const router = Router();

router.get('/', async (req, res) => {
  try {
      let payment = await getPayments();
      payment
        ? res.json(payment)
        : res.status(404).json({ message: 'No payments found' });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;