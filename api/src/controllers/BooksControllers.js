const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Books, Apibooks } = require('../db');

const maxResults = 40;
const term = [
  'sherlock',
  'ethereum',
  'little',
  'prince',
  'deep web',
  'lord of the rings',
  'javascript',
  'holmes',
  'shakespeare',
  'hamlet',
  'harry potter and',
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
  getBooks: async function () {
    const foundBooks = await Books.findAll();
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
    const bookFound = await Books.findByPk(ID);
    bookFound ? bookFound : undefined;
    return bookFound;
  },

  getHomeBooks: async function () {
    let bestSellers = [];
    let mostPopular = [];
    let newReleases = [];
    const random = Math.floor(Math.random() * 400) + 1;
    const books = await Books.findAll();
    if (books) {
      const booksJSON = books.map((b) => b.toJSON());
      mostPopular = booksJSON.sort((a, b) => b.rating - a.rating).slice(0, 30);
      bestSellers = booksJSON.slice(random, random + 15);
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
  createBook: async function (book) {
    const verifyBook = await Users.findAll({
      where: {
        title: book.title.toLowerCase(),
      },
    });

    if (verifyBook.length > 0) return undefined;
    try {
      const createdBook = await Books.create({
        title: book.name.toLowerCase(),
        description: book.description.toLowerCase(),
        price: book.price,
        authors: book.authors,
        categories: book.categories,
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        pageCount: book.pageCount,
        language: book.language,
      });
      return createdBook;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
module.exports = BooksModel;
