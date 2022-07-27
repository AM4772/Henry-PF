const { Users, Books } = require('../db');
let FavouritesModel = {
  getFavourites: async function (ID) {
    const user = await Users.finAll({
      where: {
        ID: ID,
        include: Books,
      },
    });
    console.log(user);
  },

  addFavourites: async function (bookID, userID) {
    await userID.addBooks(bookID);
    const result = await Users.findOne({
      where: { ID: userID },
      include: Books,
    });
    console.log(result);
  },
  deleteFavourite: async function (bookID, userID) {
    // try {
    //   const user = await Users.findByPk(userID);
    //   if (user === null) {
    //     return null;
    //   }
    //     await user.destroy({
    //         where: {
    //       }
    //   });
    //   return user;
    // } catch (error) {
    //   return null;
    // }
  },
};

module.exports = FavouritesModel;
