const bcrypt = require('bcrypt');
const { Users } = require('../../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let verifyLoginModel = {
  verifyLogin: async function ({ username, password }) {
    const user = await Users.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (user) {
      const userJSON = user.toJSON();
      const hashedPassword = userJSON.password;
      const result = await bcrypt.compare(password, hashedPassword);
      if (result) {
        const nameSplitted = userJSON.name.split(' ');
        const names = nameSplitted.map(
          (n) => n.charAt(0).toUpperCase() + n.slice(1)
        );
        const tokenPass = jwt.sign(
          {
            ID: userJSON.ID,
            name: userJSON.name,
            lastName: userJSON.surname,
            username: userJSON.username,
            email: userJSON.email,
          },
          process.env.PASS_TOKEN
        );
        return {
          message: `Welcome ${names.join(' ')}`,
          ID: userJSON.ID,
          username: userJSON.username,
          name: userJSON.name,
          lastName: userJSON.surname,
          email: userJSON.email,
          token: tokenPass,
        };
      }
      return undefined;
    }
    return undefined;
  },
};

module.exports = verifyLoginModel;
