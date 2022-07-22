const bcrypt = require('bcrypt');
const { usernameRegex, nameAndLastRegex, mailRegex } = require('./regex');
let errors = [];
let validationModel = {
  validateUsersPost: async function (user) {
    errors = [];
    if (!usernameRegex.test(user.username.toLowerCase()))
      errors.push('Invalid username');
    if (!nameAndLastRegex.test(user.name.toLowerCase()))
      errors.push('Invalid name');
    if (!nameAndLastRegex.test(user.surname.toLowerCase()))
      errors.push('Invalid last name');
    if (!mailRegex.test(user.email.toLowerCase()))
      errors.push('Invalid e-mail');

    if (errors.length) {
      return errors;
    }
    return false;
  },
};
module.exports = validationModel;
