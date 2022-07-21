let regex = {
  usernameRegex: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
  nameAndLastRegex: /^([a-z]+([ ]?[a-z]?[a-z]+)*)$/,
  mailRegex:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};
module.exports = regex;
