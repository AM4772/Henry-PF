const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Users } = require('../../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let verifyLoginModel = {
  verifyLogin: async function ({ username, password }) {
    const user = await Users.findOne({
      where: {
        [Op.or]: [
          { username: username.toLowerCase() },
          { email: username.toLowerCase() },
        ],
      },
    });

    if (user) {
      if (user.banned) {
        return 5;
      }
      const authUserJSON = user.toJSON();
      if (authUserJSON.authzero) {
        const tokenPass = jwt.sign(
          {
            ID: authUserJSON.ID,
            name: authUserJSON.name,
            surname: authUserJSON.surname,
            username: authUserJSON.username,
            email: authUserJSON.email,
          },
          process.env.PASS_TOKEN
        );
        const nameSplitted = authUserJSON.name.split(' ');
        const names = nameSplitted.map(
          (n) => n.charAt(0).toUpperCase() + n.slice(1)
        );
        return {
          message: `Welcome ${names.join(' ')}`,
          ID: authUserJSON.ID,
          username: authUserJSON.username,
          name: authUserJSON.name,
          surname: authUserJSON.surname,
          email: authUserJSON.email,
          token: tokenPass,
          books: await user.getFavourite(),
          admin: authUserJSON.admin,
          enabled: authUserJSON.enabled,
          dateSuspended: authUserJSON.dateSuspended,
          suspendedTimes: authUserJSON.suspendedTimes,
        };
      } else {
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
              surname: userJSON.surname,
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
            surname: userJSON.surname,
            email: userJSON.email,
            token: tokenPass,
            books: await user.getFavourite(),
            admin: userJSON.admin,
            enabled: userJSON.enabled,
            dateSuspended: userJSON.dateSuspended,
            suspendedTimes: userJSON.suspendedTimes,
          };
        }
        return undefined;
      }
    }
    return undefined;
  },
};

module.exports = verifyLoginModel;
