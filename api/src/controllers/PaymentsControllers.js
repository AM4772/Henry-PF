const { Payments } = require('../db');

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
};

module.exports = paymentsModel;
