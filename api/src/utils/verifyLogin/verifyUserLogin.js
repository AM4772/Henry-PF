const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Users, Payments } = require('../../db');
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
      include: ['favourite', Payments],
      attributes: [
        'ID',
        'username',
        'name',
        'surname',
        'email',
        'profilePic',
        'suspendedTimes',
        'enabled',
        'admin',
        'banned',
        'dateSuspended',
        'resetCode',
        'password',
        'authzero',
      ],
    });
    if (user) {
      if (user.banned) {
        return 5;
      }
      if (!user.enabled && user.suspendedTimes === 0) {
        return 10;
      }
      const authUserJSON = user.toJSON();
      //AUTH0
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
        user.update({
          enabled: true,
        });
        const nameSplitted = authUserJSON.name.split(' ');
        const names = nameSplitted.map(
          (n) => n.charAt(0).toUpperCase() + n.slice(1)
        );
        return {
          message: `Welcome ${names.join(' ')}`,
          ...authUserJSON,
          token: tokenPass,
        };
        //LOGIN NORMAL
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
            ...userJSON,
            token: tokenPass,
          };
        }
        return undefined;
      }
    }
    return 1;
  },
};

module.exports = verifyLoginModel;
