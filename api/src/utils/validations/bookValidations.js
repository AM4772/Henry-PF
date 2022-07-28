const { dateRegex } = require('./regex');
let errors = [];

let validationModel = {
  validateBook: async function (book) {
    errors = [];
    if (book.title) {
      if (book.title === '' || book.title.length > 10000)
        errors.push('Invalid title');
    } else {
      errors.push('Invalid title');
    }
    if (book.description) {
      console.log(book.description);
      if (book.description == '' || book.description.length > 10000)
        errors.push('Invalid description');
    } else {
      errors.push('Invalid description');
    }
    if (book.price) {
      if (book.price < 0 || isNaN(book.price)) errors.push('Invalid price');
    }
    if (book.authors) {
      if (!book.authors.length) {
        errors.push('Invalid author');
      }
    }
    if (book.categories) {
      if (!book.categories.length) {
        errors.push('Invalid author');
      } else {
        errors.push('Invalid category');
      }
    }

    if (book.publisher) {
      if (book.publisher == '' || book.publisher.length > 10000)
        errors.push('Invalid publisher');
    } else {
      errors.push('Invalid publisher');
    }
    if (book.publishedDate) {
      if (!dateRegex.test(book.publishedDate)) {
        errors.push('Invalid published date');
      }
    }
    if (book.pageCount) {
      if (book.pageCount <= 0 || isNaN(book.pageCount))
        errors.push('Invalid page count');
    }
    if (book.language) {
      if (
        book.language == '' ||
        book.language.length > 10000 ||
        /\d/.test(book.language)
      )
        errors.push('Invalid language');
    } else {
      errors.push('Invalid language');
    }
    if (errors.length) {
      return errors;
    }
    return false;
  },
};
module.exports = validationModel;
