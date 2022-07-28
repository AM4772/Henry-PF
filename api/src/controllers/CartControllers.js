const { Users } = require('../db');

let cartModel = {
  getCartItem: async function (ID) {
    const user = await Users.findOne({
      where: { ID },
    });
    return await user.getCart();
  },

  addCartItem: async function (bookID, userID) {
    const user = await Users.findOne({
      where: {
        ID: userID,
      },
    });
    if (user) {
      await user.addCart(bookID);
      const result = await Users.findOne({
        where: { ID: userID },
      });
      return await result.getCart();
    }
    return undefined;
  },
  deleteCartItem: async function (bookID, userID) {
    try {
      let user = await Users.findByPk(userID);
      if (user === null) {
        return null;
      }
      const items = await user.removeCart(bookID);
      if (items === 0) return items;
      console.log(items);
      user = await Users.findByPk(userID);
      return await user.getCart();
    } catch (error) {
      return null;
    }
  },
};

module.exports = cartModel;
