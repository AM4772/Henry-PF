const server = require("./src/app.js");
const { getBooksApi } = require("./src/controllers/BooksControllers.js");
const { Books } = require("./src/db");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || "3001";

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    const booksDb = await Books.findAll();
    booksDb.length > 0 ? null : await getBooksApi();
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
