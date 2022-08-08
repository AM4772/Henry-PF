const { usernameRegex, nameAndLastRegex, mailRegex } = require('./regex');
let errors = [];
let validationModel = {
  validateUsersPost: async function (user) {
    errors = [];
    if (user.username) {
      if (!usernameRegex.test(user.username.toLowerCase()))
        errors.push('Invalid username');
    }
    if (user.name) {
      if (!nameAndLastRegex.test(user.name.toLowerCase()))
        errors.push('Invalid name');
    }
    if (user.surname) {
      if (!nameAndLastRegex.test(user.surname.toLowerCase()))
        errors.push('Invalid last name');
    }
    if (user.email) {
      if (!mailRegex.test(user.email.toLowerCase()))
        errors.push('Invalid e-mail');
    }
    if (errors.length) {
      return errors;
    }
    return undefined;
  },
};
module.exports = validationModel;
