const { Users } = require('../db');
const { Op } = require('sequelize');
const { hashPassword } = require('../utils/hash/hashPasswords');
const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let UsersModel = {
  getUsers: async function () {
    const foundUsers = await Users.findAll();
    if (foundUsers.length > 0) {
      const userJSON = foundUsers.map((u) => u.toJSON());
      return userJSON.map((u) => {
        return {
          ID: u.ID,
          username: u.username,
          name: u.name,
          surname: u.surname,
          email: u.email,
        };
      });
    } else {
      return undefined;
    }
  },
  getUsernames: async function () {
    const users = await Users.findAll();
    const usernames = users.map((u) => u.username);
    if (usernames) {
      return usernames;
    }
    return undefined;
  },
  getEmails: async function () {
    const users = await Users.findAll();
    const emails = users.map((u) => u.email);
    if (emails) {
      return emails;
    }
    return undefined;
  },

  getUserByUsername: async function (username) {
    const foundUser = await Users.findAll({
      where: {
        username: {
          [Op.iLike]: '%' + username + '%',
        },
      },
    });
    if (foundUser.length === 0) {
      return undefined;
    }

    return foundUser;
  },
  getUserById: async function (ID) {
    const foundUser = await Users.findByPk(ID);

    return {
      ID: foundUser.ID,
      username: foundUser.username,
      name: foundUser.name,
      surname: foundUser.surname,
      email: foundUser.email,
    };
  },

  createUser: async function (user) {
    const verifyUser = await Users.findAll({
      where: {
        username: user.username.toLowerCase(),
      },
    });
    if (verifyUser.length > 0) return undefined;

    try {
      if (user.auth_zero) {
        const tokenPass = jwt.sign(
          {
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
          },
          process.env.PASS_TOKEN
        );

        const authzeroUser = (
          await Users.create({
            name: user.name.toLowerCase(),
            surname: user.surname.toLowerCase(),
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            authzero: true,
          })
        ).toJSON();
        return { ...authzeroUser, token: tokenPass };
      } else {
        const createdUser = await Users.create({
          name: user.name.toLowerCase(),
          surname: user.surname.toLowerCase(),
          username: user.username.toLowerCase(),
          email: user.email.toLowerCase(),
          password: await hashPassword(user.password),
        });
        return createdUser;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },

  suspendUser: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      const suspendedTimes = user.toJSON().suspendedTimes;
      const timeStamp = Date.now();

      if (suspendedTimes >= 3) {
        await user.destroy();
        return 1;
      } else {
        await Users.update(
          {
            suspendedTimes: suspendedTimes + 1,
            enabled: false,
            dateSuspended: timeStamp,
          },
          {
            where: { ID },
          }
        );
        const suspendedUser = await Users.findByPk(ID);
        return {
          ID: suspendedUser.ID,
          username: suspendedUser.username,
          name: suspendedUser.name,
          surname: suspendedUser.surname,
          email: suspendedUser.email,
          books: await user.getFavourite(),
          admin: suspendedUser.admin,
          enabled: suspendedUser.enabled,
          suspendedTimes: suspendedUser.suspendedTimes,
        };
      }
    }
    return 2;
  },

  enabledSuspendedUser: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      let suspendedDate = user.dateSuspended;
      let today = Date.now();

      if (!(parseInt(today) + 86400000 < parseInt(suspendedDate) + 86400000)) {
        await Users.update(
          {
            enabled: true,
          },
          {
            where: { ID },
          }
        );
        const enabledUser = await Users.findByPk(ID);
        return {
          ID: enabledUser.ID,
          username: enabledUser.username,
          name: enabledUser.name,
          surname: enabledUser.surname,
          email: enabledUser.email,
          books: await user.getFavourite(),
          admin: enabledUser.admin,
          enabled: enabledUser.enabled,
          suspendedTimes: enabledUser.suspendedTimes,
        };
      } else return null;
    } else return 1;
  },

  modifyUsers: async function (changes, ID) {
    if (Object.keys(changes).length === 0) {
      return null;
    }
    try {
      const user = await Users.findByPk(ID);
      if (user === null) {
        return null;
      }
      if (changes.editPassword) {
        const verifyPasswords = await verifyLogin({
          username: user.username,
          password: changes.password,
        });

        if (verifyPasswords) {
          await user.update({
            password: await hashPassword(changes.newPassword),
          });
        } else {
          return null;
        }
      }
      await user.update({
        username: changes.username,
        name: changes.name,
        surname: changes.surname,
        email: changes.email,
      });
      const userUpdated = (await Users.findByPk(ID)).toJSON();
      const tokenPass = jwt.sign(
        {
          ID: userUpdated.ID,
          name: userUpdated.name,
          surname: userUpdated.surname,
          username: userUpdated.username,
          email: userUpdated.email,
        },
        process.env.PASS_TOKEN
      );
      return {
        ID: userUpdated.ID,
        username: userUpdated.username,
        name: userUpdated.name,
        surname: userUpdated.surname,
        email: userUpdated.email,
        token: tokenPass,
        books: await user.getFavourite(),
        admin: userUpdated.admin,
      };
    } catch (error) {
      return null;
    }
  },

  deleteUser: async function (ID) {
    try {
      const user = await Users.findByPk(ID);
      if (user === null) {
        return null;
      }
      await user.destroy();
      return user;
    } catch (error) {
      return null;
    }
  },
};

module.exports = UsersModel;
