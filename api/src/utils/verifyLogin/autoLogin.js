const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('../../db.js');

let autoLogin = {
  verifyTokenLogin: async function (token) {
    const user = jwt.decode(token, process.env.PASS_TOKEN);

    const userExists = await Users.findOne({
      where: {
        username: user.username.toLowerCase(),
      },
    });
    const userJSON = userExists.toJSON();
    return {
      ID: userJSON.ID,
      username: userJSON.username,
      name: userJSON.name,
      surname: userJSON.surname,
      email: userJSON.email,
      books: await userExists.getFavourite(),
      admin: userJSON.admin,
      enabled: userJSON.enabled,
      suspendedTimes: userJSON.suspendedTimes,
    };
  },
};

module.exports = autoLogin;
