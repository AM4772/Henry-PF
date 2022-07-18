const server = require('./src/app.js');
const { getBooksApi } = require('./src/controllers/BooksControllers.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || '3001'; 

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { 
  server.listen(PORT, async () => {
    await getBooksApi();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
