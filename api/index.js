const server = require('./src/app.js');
const { getBooksApi } = require('./src/controllers/BooksControllers.js');
const { booksWithImg } = require('./src/controllers/BooksWithLargeImage.js');
const { Apibooks } = require('./src/db');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || '3001';

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    const booksDb = await Apibooks.findAll();
    booksDb.length > 0 ? null : await getBooksApi();
    await booksWithImg();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
