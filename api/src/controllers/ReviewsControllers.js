const { Reviews, Users, Books } = require('../db');
let errors = [];
let reviewModel = {
  calculateRating: async function (ID) {
    const book = await Books.findByPk(ID, {
      include: Reviews,
    });
    let sum = 0;
    if (book.toJSON().reviews.length > 0) {
      for (let i = 0; i < book.toJSON().reviews.length; i++) {
        sum = sum + book.toJSON().reviews[i].rating;
      }
      await book.update({
        rating: (sum / book.toJSON().reviews.length).toFixed(1),
      });
      return book;
    } else {
      await book.update({
        rating: 0,
      });
      return book;
    }
  },
  validateReview: async function (review) {
    errors = [];
    if (review.title) {
      if (review.title.length > 20) {
        errors.push('Title cannot be more than 20 characters long');
      }
    } else {
      errors.push('Title cannot be empty');
    }
    if (!review.review) {
      errors.push('Review cannot be empty');
    }
    if (review.rating) {
      if (review.rating > 5) {
        errors.push('Rating must be between 0 and 5');
      }
    } else {
      errors.push('Rating cannot be empty');
    }
    if (errors.length) {
      return errors;
    }
    return undefined;
  },
  getAllReviews: async function () {
    const reviews = await Reviews.findAll({
      include: [
        Books,
        { model: Users, attributes: { exclude: ['password', 'resetCode'] } },
      ],
      attributes: { exclude: ['bookID', 'userID'] },
    });
    return reviews;
  },
  getReviewUser: async function (ID) {
    const user = await Users.findOne({
      where: {
        ID,
      },
      include: Reviews,
    });
    return user;
  },
  getReviewBook: async function (ID) {
    const book = await Books.findOne({
      where: {
        ID,
      },
      include: Reviews,
    });
    return book;
  },
  createReview: async function (newReview) {
    const createdReview = await Reviews.create({
      title: newReview.title,
      review: newReview.review,
      rating: newReview.rating,
      bookID: newReview.bookID,
      userID: newReview.userID,
    });
    await reviewModel.calculateRating(newReview.bookID);
    return createdReview;
  },

  modifyReview: async function (changes, ID, report, user) {
    const reviewModify = await Reviews.findByPk(ID, {
      include: Books,
    });

    if (reviewModify) {
      if (report) {
        reviewModify.update({
          reports: [...reviewModify.toJSON().reports, parseInt(user)],
        });
        return true;
      } else {
        reviewModify.update({
          ...changes,
        });
        await reviewModel.calculateRating(reviewModify.toJSON().book.ID);
        return true;
      }
    }
    return undefined;
  },
  deleteReview: async function (ID) {
    const deletedReview = await Reviews.findByPk(ID, {
      include: Books,
    });
    if (deletedReview) {
      await deletedReview.destroy();
      await reviewModel.calculateRating(deletedReview.toJSON().book.ID);
      return true;
    }
    return undefined;
  },
};

module.exports = reviewModel;
