const server = require('./src/app.js');
const { fillAuthors } = require('./src/controllers/AuthorsControllers.js');
const { getBooksApi } = require('./src/controllers/BooksControllers.js');
const { booksWithImg } = require('./src/controllers/BooksWithLargeImage.js');
const {
  fillCategories,
} = require('./src/controllers/CategoriesControllers.js');
const { SetupStatus } = require('./src/db');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || '3001';
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

conn.sync({ force: false }).then(() => {
  server.listen(PORT, HOST, async () => {
    const setupStatus = await SetupStatus.findOne({ where: { id: 1 } });

    if (!setupStatus || !setupStatus.initialSetupDone) {
      console.log('Filling ApiBooks table...');
      await getBooksApi();
      console.log('Done ✅');

      console.log('Filling Books table...');
      await booksWithImg();
      console.log('Done ✅');

      console.log('Filling Categories table...');
      await fillCategories();
      console.log('Done ✅');

      console.log('Filling Authors table...');
      await fillAuthors();
      console.log('Done ✅');

      await SetupStatus.upsert({ id: 1, initialSetupDone: true });
    } else {
      console.log('Initial setup already done, skipping...');
    }

    console.log(`Listening at ${PORT} 🤠`);
  });
});
