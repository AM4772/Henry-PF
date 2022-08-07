const { sendMail } = require('./email/nodeMailer');
const { Users } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let emailsModel = {
  registerEmail: async function (username) {
    const emailType = 'register';
    const user = await Users.findOne({
      where: {
        username,
      },
    });
    const { name, email, ID } = user.toJSON();
    const token = jwt.sign(user.toJSON(), process.env.PASS_TOKEN);
    console.log(token);
    const emailFunction = sendMail(
      (data = { emailType, name, token, username, email, ID })
    );
    return emailFunction;
  },

  confirmEmail: async function (token) {
    const userToken = jwt.decode(token, process.env.PASS_TOKEN);
    if (userToken) {
      const user = await Users.findByPk(userToken.ID);
      if (user) {
        user.update({
          enabled: true,
        });
        return true;
      }
      return undefined;
    }
    return undefined;
  },
  resetEmail: async function (user) {
    const { username, email, ID } = user;
    const emailType = 'reset';
    const token = Math.floor(Math.random() * 100000000);
    const findUser = await Users.findByPk(ID);
    findUser.update({
      resetCode: token,
    });
    try {
      await sendMail((data = { emailType, token, username, email, ID }));
      return true;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  orderEmail: async function (userID, items, total, ID) {
    const emailType = 'detail';
    const user = await Users.findByPk(userID);

    const { username, email } = user.toJSON();
    try {
      await sendMail((data = { emailType, username, email, items, total, ID }));

      return true;
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  },
  eBookEmail: async function (userID, items) {
    const emailType = 'eBook';
    const user = await Users.findByPk(userID);

    const { username, email } = user.toJSON();
    try {
      await sendMail((data = { emailType, username, email, items }));

      return true;
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  },
};

module.exports = emailsModel;
