const { sendMail } = require('./email/nodeMailer');
const { Users } = require('../db');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { hashPassword } = require('../utils/hash/hashPasswords');

require('dotenv').config();
let emailsModel = {
  registerEmail: async function (username, BASE_URL) {
    const emailType = 'register';
    const user = await Users.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (user) {
      const userEnabled = user.toJSON().enabled;
      if (!userEnabled) {
        const { name, email, ID } = user.toJSON();
        const token = jwt.sign(user.toJSON(), process.env.PASS_TOKEN);
        const emailFunction = sendMail(
          (data = { emailType, name, token, username, email, ID, BASE_URL })
        );
        return emailFunction;
      } else return 1;
    }
    return undefined;
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

  confirmReset: async function (user) {
    const { ID, resetCode } = user;
    const findUser = await Users.findByPk(parseInt(ID));
    if (findUser) {
      if (parseInt(findUser.toJSON().resetCode) === parseInt(resetCode)) {
        findUser.update({
          resetCode: null,
        });
        return findUser.toJSON();
      } else return 1;
    }
    return undefined;
  },
  comparePasswordsReset: async function (ID, password, rPassword) {
    const user = await Users.findByPk(ID);
    if (password === rPassword) {
      return await user.update({
        password: await hashPassword(password),
      });
    } else return undefined;
  },

  contactEmail: async function ({ title, sender, message }) {
    const emailType = 'contact';
    const email = 'bookstore.online.arg@gmail.com';
    try {
      await sendMail((data = { emailType, title, message, sender, email }));

      return true;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  resetEmail: async function ({ user }) {
    const emailType = 'reset';
    const token = Math.floor(Math.random() * 100000000);
    const findUser = await Users.findOne({
      where: {
        [Op.or]: [
          { username: user.toLowerCase() },
          { email: user.toLowerCase() },
        ],
      },
    });
    if (findUser) {
      try {
        findUser.update({
          resetCode: token,
        });
        await sendMail(
          (data = {
            emailType,
            token,
            username: findUser.toJSON().username,
            email: findUser.toJSON().email,
          })
        );
        return findUser;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return undefined;
  },

  orderEmail: async function (userID, items, total, ID) {
    const emailType = 'detail';
    const user = await Users.findByPk(userID);

    const { username, email } = user.toJSON();
    try {
      await sendMail((data = { emailType, username, email, items, total, ID }));

      return true;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return undefined;
    }
  },
};

module.exports = emailsModel;
