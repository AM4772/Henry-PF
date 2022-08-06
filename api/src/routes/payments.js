const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { MP_TOKEN } = process.env;
const mercadopago = require('mercadopago');
const { eBookEmail } = require('../controllers/EmailsControllers');
const {
  createPayment,
  getPayments,
  getPaymentByID,
} = require('../controllers/PaymentsControllers');

mercadopago.configure({
  access_token: MP_TOKEN,
});

router.post('/', (req, res) => {
  try {
    mercadopago.preferences
      .create({
        items: req.body.items,

        back_urls: {
          success: 'http://localhost:3000/checkout/validate',
          failure: 'http://localhost:3000/checkout/validate',
          pending: 'http://localhost:3000/checkout/validate',
        },
      })
      .then((preference) => {
        res.json({ preferenceId: preference.body.id });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
});
router.get('/', async (req, res) => {
  try {
    const payments = await getPayments();

    payments
      ? res.json({ data: payments, message: 'Success' })
      : res.status(404).json({ message: 'No payments...' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { token } = req.query;
  try {
    const payment = await getPaymentByID(ID, token);

    payment
      ? res.json({ data: payment, message: 'Success' })
      : res.status(404).json({ message: `No payment with ID ${ID}...` });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});
router.post('/create', async (req, res) => {
  const { userID, items } = req.body;

  try {
    await createPayment(req.body);
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
