const { sendMail } = require('./email/nodeMailer');
const { Users } = require('../db');
let emailsModel = {
  registerEmail: async function (user) {
    const emailType = 'register';
    const { name, username, email, ID } = user;
    const token = Math.floor(Math.random() * 1000000000000000);
    const findUser = await Users.findByPk(ID);
    findUser.update({
      resetCode: token,
    });
    const emailFunction = sendMail(
      (data = { emailType, name, token, username, email, ID })
    );
    return emailFunction;
  },

  confirmEmail: async function (token, ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      const tokenUser = user.toJSON().resetCode;
      if (tokenUser === token) {
        console.log('hola');
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
};

module.exports = emailsModel;
