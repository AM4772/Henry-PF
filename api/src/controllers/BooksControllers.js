const axios = require('axios');
const { Books } = require('../db');
const { Op } = require('sequelize');
const maxResults = 40;
const term = 'a';

let BooksModel = {
  getBooksApi: async function () {
    try {
      for (let i = 0; i < 10; i++) {
        let api = (
          await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${maxResults}&startIndex=${
              i * 40
            }`
          )
        ).data;
        api.items.map(async (b) => {
          await Books.findOrCreate({
            where: {
              title: b.volumeInfo.title,
              description: b.volumeInfo.description
                ? b.volumeInfo.description
                : 'No description',
              price: b.saleInfo.listPrice ? b.saleInfo.listPrice.amount : 0,

              image: b.volumeInfo.imageLinks
                ? b.volumeInfo.imageLinks.smallThumbnail
                : 'NO IMAGE',
              authors: b.volumeInfo.authors ? b.volumeInfo.authors : [],
              categories: 'FICTION',
              publisher: b.volumeInfo.publisher
                ? b.volumeInfo.publisher
                : 'NO PUBLISHER',
              publishedDate: b.volumeInfo.publishedDate
                ? b.volumeInfo.publishedDate
                : 'NO DATE',
              pageCount: b.volumeInfo.pageCount ? b.volumeInfo.pageCount : 0,
              rating: b.volumeInfo.averageRating
                ? b.volumeInfo.averageRating
                : 0,
              language: b.volumeInfo.language
                ? b.volumeInfo.language
                : 'NO INFO',
            },
          });
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getBooks: async function () {
    const foundBooks = await Books.findAll();
    console.log(foundBooks);
    if (foundBooks.length > 0) {
      return foundBooks;
    } else {
      return undefined;
    }
  },

  getBookByTitle: async function (title) {
    const bookFound = await Books.findAll({
      where: {
        title: {
          [Op.iLike]: '%' + title + '%',
        },
      },
    });
    if (bookFound.length === 0) {
      return undefined;
    }

    return bookFound;
  },

  getBookById: async function (ID) {
    const bookFound = await Books.findByPk(ID);
    bookFound ? bookFound : undefined;
    return bookFound;
  },
};
module.exports = BooksModel;
