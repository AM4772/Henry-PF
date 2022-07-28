const { Books, Authors } = require('../db');

const authorsArray = [];
let authorModel = {
  fillAuthors: async function () {
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

    authorsArray.map((a) => Authors.create({ name: a }));
  },
  getAuthors: async function () {
    const authors = await Authors.findAll();

    if (authors) {
      return authors.map((a) => a.toJSON().name).sort();
    }
    return undefined;
  },
};

module.exports = authorModel;
