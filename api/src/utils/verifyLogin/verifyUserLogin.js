const bcrypt = require('bcrypt');
const { Users } = require('../../db');

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
        return {
          message: 'Logged in successfully',
          id: userJSON.ID,
          name: userJSON.name,
          lastName: userJSON.surname,
          email: userJSON.email,
        };
      }
      return undefined;
    }
    return undefined;
  },
};

module.exports = verifyLoginModel;
