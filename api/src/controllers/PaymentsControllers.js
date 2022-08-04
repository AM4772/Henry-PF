const { Payments } = require('../db');
let paymentsModel = {
  confirmPayment: async function (mpID, status) {
    const payment = Payments.findByPk(mpID);
    if (payment) {
      if (status === success) {
        payment.upda;
      }
    }
  },
};

module.exports = paymentsModel;
