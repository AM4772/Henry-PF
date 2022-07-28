const { Users } = require('../db');
const { Op } = require('sequelize');
const { hashPassword } = require('../utils/hash/hashPasswords');
const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');

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
      const createdUser = await Users.create({
        name: user.name.toLowerCase(),
        surname: user.surname.toLowerCase(),
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: await hashPassword(user.password),
        enabled: user.enabled,
        suspendedTimes: user.suspendedTimes,
      });
      return createdUser;
    } catch (error) {
      throw new Error(error.message);
    }
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
        surname: changes.lastName,
        email: changes.email,
      });
      return user;
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
