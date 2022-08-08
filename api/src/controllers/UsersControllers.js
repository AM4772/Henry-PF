const { Users, Payments } = require('../db');
const { Op } = require('sequelize');
const { hashPassword } = require('../utils/hash/hashPasswords');
const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let UsersModel = {
  //-----------------------------------------------------------------------------------------
  //                                  GETS
  //-----------------------------------------------------------------------------------------
  getUsers: async function () {
    const foundUsers = await Users.findAll({
      include: Payments,
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
      ],
    });
    if (foundUsers.length > 0) {
      return foundUsers;
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
    const foundUser = await Users.findByPk(ID, {
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
      ],
    });

    return foundUser;
  },
  //-----------------------------------------------------------------------------------------
  //                                  CREATE
  //-----------------------------------------------------------------------------------------
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
            suspendedTimes: user.suspendedTimes,
            enabled: user.enabled, //
          },
          process.env.PASS_TOKEN
        );

        const authzeroUser = (
          await Users.create({
            name: user.name.toLowerCase(),
            surname: user.surname.toLowerCase(),
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            enabled: user.enabled, //
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
      throw new Error(error.message);
    }
  },
  //-----------------------------------------------------------------------------------------
  //                                  SUSPEND
  //-----------------------------------------------------------------------------------------
  suspendUser: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      const suspendedTimes = user.toJSON().suspendedTimes;
      const timeStamp = Date.now();

      if (suspendedTimes >= 3) {
        await user.update({
          banned: true,
          enabled: false,
        });
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
        const suspendedUser = await Users.findByPk(ID, {
          include: 'favourite',
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
          ],
        });
        return suspendedUser;
      }
    }
    return 2;
  },
  //-----------------------------------------------------------------------------------------
  //                                  ENABLE
  //-----------------------------------------------------------------------------------------
  manualEnabled: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      await Users.update(
        {
          enabled: true,
        },
        {
          where: { ID },
        }
      );
      const enabledUser = (
        await Users.findByPk(ID, {
          include: 'favourite',
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
          ],
        })
      ).toJSON();
      return enabledUser;
    } else return undefined;
  },

  enabledSuspendedUser: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      let suspendedDate = user.dateSuspended;
      let today = Date.now();

      if (!(parseInt(today) < parseInt(suspendedDate) + 86400000)) {
        await Users.update(
          {
            enabled: true,
          },
          {
            where: { ID },
          }
        );
        const enabledUser = (
          await Users.findByPk(ID, {
            include: 'favourite',
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
            ],
          })
        ).toJSON();
        return enabledUser;
      } else return undefined;
    } else return 1;
  },
  //-----------------------------------------------------------------------------------------
  //                                  ADMIN
  //-----------------------------------------------------------------------------------------
  setAdmin: async function (ID) {
    const user = await Users.findByPk(ID);
    if (user) {
      console.log('soy uyser ', user);
      const admin = user.toJSON().admin;
      user.update({
        admin: !admin,
      });
      return (
        await Users.findByPk(ID, {
          include: 'favourite',
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
          ],
        })
      ).toJSON();
    } else return undefined;
  },

  //-----------------------------------------------------------------------------------------
  //                                  MODIFY
  //-----------------------------------------------------------------------------------------

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
        profilePic: changes.profilePic,
      });
      const userUpdated = (
        await Users.findByPk(ID, {
          include: 'favourite',
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
          ],
        })
      ).toJSON();
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
        ...userUpdated,
        token: tokenPass,
      };
    } catch (error) {
      return null;
    }
  },

  //-----------------------------------------------------------------------------------------
  //                                  DELETE
  //-----------------------------------------------------------------------------------------
  deleteUser: async function (ID) {
    try {
      const user = await Users.findByPk(ID);
      if (user === null) {
        return null;
      }
      await user.update({
        banned: true,
      });
      return user;
    } catch (error) {
      return null;
    }
  },
};

module.exports = UsersModel;
