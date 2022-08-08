const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users, Payments } = require('../../db.js');

let autoLogin = {
  verifyTokenLogin: async function (token) {
    const user = jwt.decode(token, process.env.PASS_TOKEN);
    const userExists = await Users.findOne({
      where: {
        username: user.username.toLowerCase(),
      },
      include: ['favourite', Payments],
      attributes: [
        'ID',
        'username',
        'name',
        'surname',
        'email',
        'suspendedTimes',
        'enabled',
        'admin',
        'banned',
        'dateSuspended',
        'resetCode',
      ],
    });

    const userJSON = userExists.toJSON();
    if (userJSON.banned) {
      return 5;
    }

    return userJSON;
  },
};

module.exports = autoLogin;
