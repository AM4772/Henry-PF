const { Users } = require('../db');
let FavouritesModel = {
  getFavourites: async function (ID) {
    const user = await Users.findOne({
      where: { ID },
    });
    return await user.getFavourite();
  },

  addFavourites: async function (bookID, userID) {
    const user = await Users.findOne({
      where: {
        ID: userID,
      },
    });
    if (user) {
      await user.addFavourite(bookID);
      const result = await Users.findOne({
        where: { ID: userID },
      });
      return await result.getFavourite();
    }
    return undefined;
  },
  deleteFavourites: async function (bookID, userID) {
    try {
      let user = await Users.findByPk(userID);
      if (user === null) {
        return null;
      }
      await user.removeFavourite(bookID);
      user = await Users.findByPk(userID);
      return await user.getFavourite();
    } catch (error) {
      return null;
    }
  },
};

module.exports = FavouritesModel;
