const { Payments, Users, Books, Categories } = require('../db');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

let paymentsModel = {
  createPayment: async function (payment) {
    const createPayment = await Payments.create({
      mpID: payment.ID,
      items: payment.items,
      total: payment.total,
      userID: payment.userID,
    });
    const categoriesArray = await createPayment.toJSON().items;
    for (let i = 0; i < categoriesArray.length; i++) {
      const ID = await createPayment.toJSON().items[i].ID;
      const book = await Books.findByPk(ID);
      const bookJSON = book.toJSON();

      await book.update({
        soldCopies: bookJSON.soldCopies + 1,
      });

      const cat = await Categories.findOne({
        where: {
          category: { [Op.iLike]: bookJSON.categories[0] },
        },
      });

      const soldCopy = cat.toJSON().soldCopies;
      await cat.update({
        soldCopies: soldCopy + 1,
      });
    }
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
