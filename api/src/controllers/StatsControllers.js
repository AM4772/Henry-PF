const { Categories, Books, Users, Payments } = require('../db');
let statsModel = {
  categoriesStats: async function () {
    const catArray = [];
    const categoryStats = await Categories.findAll({
      attributes: ['ID', 'category', 'soldCopies'],
    });
    for (let i = 0; i < categoryStats.length; i++) {
      const category = categoryStats[i].toJSON();
      if (category.soldCopies > 0) catArray.push(category);
    }
    return catArray;
  },

  bookStats: async function () {
    const bookArray = [];
    const bookStats = await Books.findAll({
      attributes: ['ID', 'title', 'image', 'soldCopies'],
    });

    for (let i = 0; i < bookStats.length; i++) {
      const book = bookStats[i].toJSON();
      if (book.soldCopies > 0) bookArray.push(book);
    }

    return bookArray;
  },

  paymentsStats: async function () {
    const paymentStat = await Payments.findAll({
      attributes: ['items', 'createdAt', 'total'],
    });

    return paymentStat.map((p) => {
      return {
        ...p.toJSON(),
        items: p.toJSON().items.length,
      };
    });
  },

  userStats: async function () {
    const userStat = await Users.findAll({
      attributes: ['createdAt'],
    });
    return {
      totalUsers: userStat.length,
      createdDate: userStat,
    };
  },
};

module.exports = statsModel;
