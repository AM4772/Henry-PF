const { Books } = require('../db');

const categoriesArray = [];
let categoriesModel = {
  getCategories: async function () {
    const books = await Books.findAll();
    const categories = books.map((a) => a.dataValues.categories);
    for (let i = 0; i < categories.length; i++) {
      categories.map((category) => {
        category.map((c) =>
          !categoriesArray.includes(c) ? categoriesArray.push(c) : null
        );
      });
    }
    if (categoriesArray.length === 0) {
      return undefined;
    }

    return categoriesArray.sort();
  },
};

module.exports = categoriesModel;
