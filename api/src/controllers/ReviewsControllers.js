const { Reviews, Users } = require('../db');
let reviewModel = {
  getAllReviews: async function () {
    const reviews = await Reviews.findAll();
    if (reviews) return reviews;
    return undefined;
  },
  getReviewUser: async function (ID) {
    const user = Users.findOne({
      where: {
        ID,
      },
    });
  },
  getReviewBook: async function (ID) {},
  createReview: async function () {},
  modifyReview: async function () {},
  deleteReview: async function () {},
};

module.exports = reviewModel;
