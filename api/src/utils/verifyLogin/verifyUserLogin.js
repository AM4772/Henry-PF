const bcrypt = require('bcrypt');
const { Users } = require('../../db');

let verifyLoginModel = {
  verifyLogin: async function ({ username, password }) {
    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (user) {
      const userJSON = user.toJSON();
      const hashedPassword = userJSON.password;
      const result = await bcrypt.compare(password, hashedPassword);
      if (result) {
        return userJSON.name; //retornar objeto con id name lastname mail username
      }
      return undefined;
    }
    return undefined;
  },
};

module.exports = verifyLoginModel;
