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
        const nameSplitted = userJSON.name.split(' ');
        const names = nameSplitted.map(
          (n) => n.charAt(0).toUpperCase() + n.slice(1)
        );
        return {
          message: `Welcome ${names.join(' ')}`,
          ID: userJSON.ID,
          username: userJSON.username,
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
