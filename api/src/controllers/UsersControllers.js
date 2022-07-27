const { Users } = require('../db');
const { Op } = require('sequelize');
const { hashPassword } = require('../utils/hash/hashPasswords');

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
    return foundUser;
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
  modifyUser,
};

module.exports = UsersModel;
