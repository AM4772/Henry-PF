const { Categories, Books } = require('../db');
let statsModel = {
  categoriesStats: async function () {
    const categoryStats = Categories.findAll();
    console.log(categoryStats);
  },
  categoriesStats: async function () {
    const bookStats = Books.findAll();
    console.log(bookStats);
  },
};

module.exports = statsModel;
