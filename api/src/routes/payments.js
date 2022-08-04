const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { MP_TOKEN } = process.env;
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

router.post('/', (req, res) => {
  var total = 0;
  for (let i = 0; i < req.body.items.length; i++) {
    total = total + req.body.items[i].unit_price;
  }
  mercadopago.preferences
    .create({
      payer,
      items: req.body.items,
      back_urls: {
        success: 'http://localhost:3000/payment/validate',
        failure: 'http://localhost:3000/payment/validate',
        pending: 'http://localhost:3000/payment/validate',
      },
    })
    .then((preference) => {
      Payments.create({
        mpID: preference.body.id,
        items: req.body.items,
        total,
      });
      res.json({ preferenceId: preference.body.id });
    });
});
router.put('/:mpID', async (req, res) => {
  const { mpID } = req.params;
  const { status } = req.query;

  try {
    const payment = confirmPayment(mpID, status);
  } catch (err) {
    res.status(404).json(err);
  }
});
module.exports = router;
