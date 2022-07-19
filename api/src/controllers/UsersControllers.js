const axios = require('axios');
const { Users } = require('../db');
const { Op } = require('sequelize');

let UsersModel = {
  getUsers: async function () {
    const foundUsers = await Users.findAll();
    if (foundUsers.length > 0) {
      return foundUsers;
    } else {
      return undefined;
    }
  },

  getUserByUsername: async function (username) {
    const foundUser = await Users.findAll({
      where: {
        username,
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
        mail: user.mail.toLowerCase(),
        password: user.password.toLowerCase(),
        enabled: user.enabled,
        suspendedTimes: user.suspendedTimes,
      });
      return createdUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UsersModel;
