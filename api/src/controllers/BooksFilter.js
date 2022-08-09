const { Books } = require("../db");
const { Op } = require("sequelize");

let bookFilter = {
  getBookPopular: async function () {
    const foundBooks = await Books.findAll({
      where: {
        [Op.or]: [{ rating: 4 }, { rating: 5 }],
      },
    });

    if (foundBooks.length > 0) {
      return foundBooks;
    } else {
      return undefined;
    }
  },

  getBookCheap: async function () {
    const sortAscBooks = await Books.findAll({
      order: [["price", "ASC"]],
    });

    // const finish = sortAscBooks.length / 2 + 10;
    // const cheapBooks = sortAscBooks.slice(0, finish);

    if (cheapBooks.length > 0) {
      return cheapBooks;
    } else {
      return undefined;
    }
  },
};

module.exports = bookFilter;
