const axios = require('axios');
const { Books } = require('../db');
const { Op } = require('sequelize');
const maxResults = 10;
const term = 'a';

let BooksModel = {
  getBooksApi: async function () {
    try {
      for (let i = 0; i < 10; i++) {
        let api = (
          await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${maxResults}&startIndex=${
              i * 10
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
              // averageRating: b.volumeInfo.averageRating,
              // ratingsCount: b.volumeInfo.ratingsCount,
            },
          });
        });
      }
      const dbBooks = await Books.findAll();
      return dbBooks;
    } catch (error) {
      throw new Error(error.message);
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
    return bookFound;
  },

  getBookById: async function (id) {
    console.log(id);
    const bookFound = await Books.findByPk(id);
    return bookFound;
  },
};
module.exports = BooksModel;
