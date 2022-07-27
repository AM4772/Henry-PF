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
    // try {
    //   const user = await Users.findByPk(userID);
    //   if (user === null) {
    //     return null;
    //   }
    //   await user.setBooks(bookID);
    //   return user;
    // } catch (error) {
    //   return null;
    // }
  },
};

module.exports = FavouritesModel;
