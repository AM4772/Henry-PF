const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Books, Apibooks, Authors, Categories, Reviews } = require('../db');
const { imageRegex } = require('../utils/validations/regex');
const { imgVerify } = require('./BooksWithLargeImage');

const maxResults = 40;
const term = [
  'harry potter y',
  'harry potter and',
  'el principito',
  'el señor de los anillos',
  'lord of the rings',
  'increibles',
  'grandes',
  'javascript',
  'fantasticos',
  'comic',
  'locos',
  'sherlock holmes',
  'ethereum',
  'deep web',
  'shakespeare',
];

async function getImage(industryID) {
  let isbn = '';

  if (industryID && industryID.length > 1) {
    if (industryID[0].type.includes('10')) {
      isbn = industryID[0].identifier;
    } else if (industryID[1].type.includes('10')) {
      isbn = industryID[1].identifier;
    }
  }
  if (isbn) {
    return `https://images-na.ssl-images-amazon.com/images/P/${isbn}.01._SX180_SCLZZZZZZZ_.jpg`;
  } else
    return 'https://images-na.ssl-images-amazon.com/images/P/0345247868.01._SX180_SCLZZZZZZZ_.jpg';
}

let BooksModel = {
  //-----------------------------------------------------------------------------------------
  //                                  GET API BOOKS
  //-----------------------------------------------------------------------------------------
  getBooksApi: async function () {
    try {
      for (let i = 0; i < term.length; i++) {
        for (let j = 0; j < 5; j++) {
          let api = (
            await axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=${
                term[i]
              }&printType=books&maxResults=${maxResults}&startIndex=${j * 40}
            `
              //&startIndex=${i * 40}
            )
          ).data;

          api.items &&
            api.items.map(async (b) => {
              const industryID = b.volumeInfo.industryIdentifiers
                ? b.volumeInfo.industryIdentifiers
                : [];
              const img = await getImage(
                industryID.length > 0 ? industryID : null
              );
              if (b.volumeInfo.title && b.volumeInfo.description) {
                if (
                  b.volumeInfo.title.length < 10000 &&
                  b.volumeInfo.description.length < 10000
                ) {
                  await Apibooks.findOrCreate({
                    where: {
                      title: b.volumeInfo.title,
                      description: b.volumeInfo.description
                        ? b.volumeInfo.description
                        : 'No description',
                      price: b.saleInfo.listPrice
                        ? b.saleInfo.listPrice.amount
                        : (Math.random() * 100).toFixed(2),

                      image: img,
                      authors: b.volumeInfo.authors ? b.volumeInfo.authors : [],
                      categories: b.volumeInfo.categories
                        ? b.volumeInfo.categories
                        : [],
                      publisher: b.volumeInfo.publisher
                        ? b.volumeInfo.publisher
                        : 'NO PUBLISHER',
                      publishedDate: b.volumeInfo.publishedDate
                        ? b.volumeInfo.publishedDate
                        : 'NO DATE',
                      pageCount: b.volumeInfo.pageCount
                        ? b.volumeInfo.pageCount
                        : 0,
                      rating: 0,
                      language: b.volumeInfo.language
                        ? b.volumeInfo.language
                        : 'NO INFO',
                    },
                  });
                }
              }
            });
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  //-----------------------------------------------------------------------------------------
  //                                  GETS
  //-----------------------------------------------------------------------------------------
  getBooks: async function () {
    const foundBooks = await Books.findAll({
      include: Reviews,
    });
    const foundBooksJSON = foundBooks.map((b) => b.toJSON());
    const alphBooks = foundBooksJSON.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    if (foundBooks.length > 0) {
      return alphBooks;
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
    const bookFound = await Books.findByPk(ID, {
      include: Reviews,
    });
    bookFound ? bookFound : undefined;
    return bookFound;
  },

  getHomeBooks: async function () {
    let bestSellers = [];
    let mostPopular = [];
    let newReleases = [];

    const books = await Books.findAll();
    if (books) {
      const booksJSON = books.map((b) => b.toJSON());
      bestSellers = booksJSON
        .sort((a, b) => b.soldCopies - a.soldCopies)
        .slice(0, 30);
      mostPopular = booksJSON.sort((a, b) => b.rating - a.rating).slice(0, 30);
      newReleases = booksJSON
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        .slice(0, 15);

      return {
        mostPopular,
        bestSellers,
        newReleases,
      };
    }
    return undefined;
  },
  //-----------------------------------------------------------------------------------------
  //                                  CREATE
  //-----------------------------------------------------------------------------------------
  createBook: async function (book) {
    const verifyBook = await Books.findAll({
      where: {
        title: book.title.toLowerCase(),
      },
    });

    if (verifyBook.length > 0) return undefined;

    const authorValue = book.authors.map((a) => a.value);
    const authorCreated = book.authors.map((a) => a.created);
    const categoryValue = book.categories.map((c) => c.value);
    const categoryCreated = book.categories.map((c) => c.created);

    for (let i = 0; i < book.authors.length; i++) {
      if (authorCreated[i]) {
        Authors.findOrCreate({
          where: { name: authorValue[i] },
        });
      }
    }

    for (let i = 0; i < book.categories.length; i++) {
      if (categoryCreated[i]) {
        Categories.findOrCreate({
          where: { category: categoryValue[i] },
        });
      }
    }

    try {
      let hours;
      let minutes;
      if (book.pageCount !== 0) {
        const avgRT = (300 * book.pageCount) / 250 / 60;
        hours = Math.trunc(avgRT);
        minutes = Math.round((avgRT - Math.trunc(avgRT)) * 60);
      }
      const createdBook = await Books.create({
        title: book.title.toLowerCase(),
        description: book.description.toLowerCase(),
        price: book.price,
        authors: authorValue,
        categories: categoryValue,
        image: book.image,
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        pageCount: book.pageCount,
        language: book.language,
        rating: 0,
        avgReadingTime:
          book.pageCount === 0
            ? 'Cannot estimate reading time'
            : hours + ' hs and ' + minutes + ' minutes',
      });
      return createdBook;
    } catch (error) {
      return error;
    }
  },
  //-----------------------------------------------------------------------------------------
  //                                  MODIFY
  //-----------------------------------------------------------------------------------------
  modifyBooks: async function (changes, ID) {
    if (Object.keys(changes).length === 0) {
      return null;
    }

    const authorValue = changes.authors.map((a) => a.value);
    const authorCreated = changes.authors.map((a) => a.created);
    const categoryValue = changes.categories.map((c) => c.value);
    const categoryCreated = changes.categories.map((c) => c.created);

    for (let i = 0; i < changes.authors.length; i++) {
      if (authorCreated[i]) {
        Authors.findOrCreate({
          where: { name: authorValue[i] },
        });
      }
    }

    for (let i = 0; i < changes.categories.length; i++) {
      if (categoryCreated[i]) {
        Categories.findOrCreate({
          where: { category: categoryValue[i] },
        });
      }
    }

    try {
      const book = await Books.findByPk(ID);
      if (book === null) {
        return null;
      }
      let hours;
      let minutes;
      if (changes.pageCount !== 0) {
        const avgRT = (300 * changes.pageCount) / 250 / 60;
        hours = Math.trunc(avgRT);
        minutes = Math.round((avgRT - Math.trunc(avgRT)) * 60);
      }
      await book.update({
        title: changes.title.toLowerCase(),
        description: changes.description.toLowerCase(),
        price: changes.price,
        authors: authorValue,
        categories: categoryValue,
        image: changes.image,
        publishedDate: changes.publishedDate,
        publisher: changes.publisher,
        pageCount: changes.pageCount,
        language: changes.language,
        avgReadingTime:
          changes.pageCount === 0
            ? 'Cannot estimate reading time'
            : hours + ' hs and ' + minutes + ' minutes',
      });
      return book;
    } catch (error) {
      return null;
    }
  },

  //-----------------------------------------------------------------------------------------
  //                                  DELETE
  //-----------------------------------------------------------------------------------------
  deleteBook: async function (ID) {
    const book = await Books.findByPk(ID, {
      include: Reviews,
    });
    if (book) {
      const reviews = await Reviews.findAll({
        where: {
          bookID: ID,
        },
      });
      book.update({
        reviews: [],
      });

      if (reviews) reviews.map((r) => r.destroy());
      await book.destroy();
      return true;
    }
    return undefined;
  },
};
module.exports = BooksModel;
