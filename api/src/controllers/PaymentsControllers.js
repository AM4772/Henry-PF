const { Payments, Users } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let paymentsModel = {
  createPayment: async function (payment) {
    const createPayment = Payments.create({
      mpID: payment.ID,
      items: payment.items,
      total: payment.total,
      userID: payment.userID,
    });
    return createPayment;
  },

  getPayments: async function () {
    const payments = await Payments.findAll({
      include: {
        model: Users,
        attributes: { exclude: ['password', 'resetCode'] },
      },
    });
    if (payments.length) return payments;
    else return undefined;
  },

  getPaymentByID: async function (ID, token) {
    const userToken = jwt.decode(token, process.env.PASS_TOKEN);
    if (userToken) {
      const user = Users.findByPk(userToken.ID);
      if (user) {
        const payment = await Payments.findByPk(ID);
        if (payment) return payment;
      }
    } else {
      const payment = await Payments.findByPk(ID, { include: Users });
      return payment;
    }
    return undefined;
  },
};

module.exports = paymentsModel;
