const bcrypt = require('bcrypt');
const saltRounds = 10;

let hashModel = {
  hashPassword: async function (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
};

module.exports = hashModel;
