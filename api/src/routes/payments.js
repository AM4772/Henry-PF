const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { MP_TOKEN } = process.env;
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: MP_TOKEN,
});
const { deleteCart } = require('../controllers/CartControllers');
const { eBookEmail, orderEmail } = require('../controllers/EmailsControllers');
const {
  createPayment,
  getPayments,
  getPaymentByID,
} = require('../controllers/PaymentsControllers');
const { isSuspended } = require('../controllers/UsersControllers');

router.post('/', async (req, res) => {
  const { base_url, ID } = req.body;
  const verifyEnabledUser = await isSuspended(ID);
  if (verifyEnabledUser) {
    try {
      mercadopago.preferences
        .create({
          items: req.body.items,
          back_urls: {
            success: `${base_url}/checkout/validate`,
            failure: `${base_url}/checkout/validate`,
            pending: `${base_url}/checkout/validate`,
          },
        })
        .then((preference) => {
          res.json({ preferenceId: preference.body.id });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  } else if (verifyEnabledUser === 1) {
    return res.status(400).json({ message: 'User does not exist...' });
  } else {
    return res.status(400).json({ message: 'User is suspended...' });
  }
});
router.post('/create', async (req, res) => {
  const { userID, items, total, ID } = req.body;
  try {
    await createPayment(req.body);
    await orderEmail(userID, items, total, ID);
    let emails = await eBookEmail(userID, items);
    items.length > 1 ? await deleteCart(userID) : null;
    emails
      ? res.json({ message: 'eBook email sent' })
      : res.status(404).json({ message: 'Cannot send eBook' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Cannot create payment' });
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
    res.status(404).json({ message: 'Cannot get payment' });
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
    res.status(404).json({ message: 'Cannot get payment' });
  }
});

module.exports = router;
