const server = require('./src/app.js');
const { fillAuthors } = require('./src/controllers/AuthorsControllers.js');
const { getBooksApi } = require('./src/controllers/BooksControllers.js');
const { booksWithImg } = require('./src/controllers/BooksWithLargeImage.js');
const {
  fillCategories,
} = require('./src/controllers/CategoriesControllers.js');
const { Apibooks, Books, Categories, Authors } = require('./src/db');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || '3001';

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    const apiBooksDb = await Apibooks.findAll();
    const booksDb = await Books.findAll();
    const categoriesDb = await Categories.findAll();
    const authorsDb = await Authors.findAll();

    if (apiBooksDb.length > 0) {
      console.log('Table ApiBooks already with books, nothing to add');
    } else {
      console.log('Filling ApiBooks table...');
      await getBooksApi();
      console.log('Done');
    }
    if (booksDb.length > 0) {
      console.log('Table Books already with books, nothing to add');
    } else {
      console.log('Filling Books table...');
      await booksWithImg();
      console.log('Done');
    }
    if (categoriesDb.length > 0) {
      console.log('Table Categories already with data, nothing to add');
    } else {
      console.log('Filling Categories table...');
      await fillCategories();
      console.log('Done');
    }
    if (authorsDb.length > 0) {
      console.log('Table Authors already with data, nothing to add');
    } else {
      console.log('Filling Authors table...');
      await fillAuthors();
      console.log('Done');
    }

    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
