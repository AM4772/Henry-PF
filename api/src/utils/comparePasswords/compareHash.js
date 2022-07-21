const bcrypt = require('bcrypt');
const { Users } = require('../../db');

let comparePasswordModel = {
  comparePasswords: async function (id, password = '123') {
    const user = await Users.findByPk(id);
    if (user) {
      const hashedPassword = user.dataValues.password;
      const result = await bcrypt.compare(password, hashedPassword);
      return result;
    }
    return undefined;
  },
};

module.exports = comparePasswordModel;
