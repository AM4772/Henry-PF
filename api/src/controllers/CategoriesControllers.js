const { Books, Categories } = require('../db');

const categoriesArray = [];
let categoriesModel = {
  fillCategories: async function () {
    const books = await Books.findAll();
    const categories = books.map((a) => a.dataValues.categories);
    for (let i = 0; i < categories.length; i++) {
      categories.map((category) => {
        category.map((c) =>
          !categoriesArray.includes(
            c.charAt(0).toUpperCase() + c.toLowerCase().slice(1)
          )
            ? categoriesArray.push(
                c.charAt(0).toUpperCase() + c.toLowerCase().slice(1)
              )
            : null
        );
      });
    }
    if (categoriesArray.length === 0) {
      return undefined;
    }
    categoriesArray.map((c) => Categories.create({ category: c }));
  },
  getCategories: async function () {
    const categories = await Categories.findAll();

    if (categories) {
      return categories.map((c) => c.toJSON().category).sort();
    }
    return undefined;
  },
};

module.exports = categoriesModel;
