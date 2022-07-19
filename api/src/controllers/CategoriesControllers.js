const { Books } = require('../db');

const categoriesArray = [];
let categoriesModel = {
  getCategories: async function () {
    const books = await Books.findAll();
    const categories = books.map((a) => a.dataValues.categories);
    categories.map((c) => {
      if (!categoriesArray.includes(c)) {
        categoriesArray.push(c);
      }
    });
    if (categoriesArray.length === 0) {
      return undefined;
    }
    return categoriesArray.sort();
  },
};

module.exports = categoriesModel;
