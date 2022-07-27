const { Users, Books } = require('../db');
let FavouritesModel = {
  getFavourites: async function (ID) {
    const user = await Users.findOne({
      where: { ID },
      include: Books,
    });
    return user.books;
  },

  addFavourites: async function (bookID, userID) {
    const user = await Users.findOne({
      where: {
        ID: userID,
      },
    });
    if (user) {
      await user.addBook(bookID);
      const result = await Users.findOne({
        where: { ID: userID },
        include: Books,
      });
      return result.books;
    }
    return undefined;
  },
  deleteFavourites: async function (bookID, userID) {
    try {
      let user = await Users.findByPk(userID, { include: Books });
      if (user === null) {
        return null;
      }
      await user.removeBook(bookID);
      user = await Users.findByPk(userID, { include: Books });
      return user.books;
    } catch (error) {
      return null;
    }
  },
};

module.exports = FavouritesModel;
