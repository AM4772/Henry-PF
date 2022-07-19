const { Books } = require('../db');

const authorsArray = [];
let authorModel = {
  getAuthors: async function () {
    const books = await Books.findAll();
    const authors = books.map((a) => a.dataValues.authors);
    for (let i = 0; i < authors.length; i++) {
      authors.map((author) => {
        author.map((a) =>
          !authorsArray.includes(a) ? authorsArray.push(a) : null
        );
      });
    }
    if (authorsArray.length === 0) {
      return undefined;
    }

    return authorsArray.sort();
  },
};

module.exports = authorModel;
