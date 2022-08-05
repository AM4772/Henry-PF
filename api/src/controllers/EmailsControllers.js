const { sendMail } = require('./email/nodeMailer');
const { Users } = require('../db');
let emailsModel = {
  registerEmail: async function (user) {
    const emailType = 'register';
    const { name, username, email, ID } = user;
    const token = Math.floor(Math.random() * 1000000000000000);
    const findUser = await Users.findByPk(ID);
    if (findUser) {
      findUser.update({
        resetCode: token,
      });
      const emailFunction = sendMail(
        (data = { emailType, name, token, username, email, ID })
      );
      return emailFunction;
    }
    return false;
  },

  confirmEmail: async function (token, ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      const tokenUser = user.toJSON().resetCode;
      if (tokenUser === token) {
        user.update({
          enabled: true,
          resetCode: null,
        });
        return true;
      }
      return false;
    }
    return false;
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
      return false;
    }
  },
  eBookEmail: async function (userID, items) {
    const emailType = 'eBook';
    const user = await Users.findByPk(userID);
    const { username, email } = user.toJSON();
    try {
      const asd = await sendMail(
        (data = { emailType, username, email, items })
      );
      console.log(asd);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = emailsModel;
