const url = require('url');
const https = require('https');
const sizeOf = require('image-size');
const { Books } = require('../db');
let imgVer = {
  imgVerify: async function (img) {
    // const imgUrl =
    //   'https://images-na.ssl-images-amazon.com/images/P/0345247868.01._SX180_SCLZZZZZZZ_.jpg';

    const options = url.parse(img);
    return new Promise((resolve, reject) => {
      https.get(options, function (response) {
        const chunks = [];
        let imgSize;
        response
          .on('data', function (chunk) {
            chunks.push(chunk);
          })

          .on('end', function () {
            const buffer = Buffer.concat(chunks);
            imgSize = sizeOf(buffer);
            resolve(imgSize);
          });
      });
    });
  },

  booksWithImg: async function () {
    let books = await Books.findAll();
    const books2 = [];
    books = await books.map((b) =>
      imgVer.imgVerify(b.image).then(async (r) => {
        let img;
        img = r.width <= 1 ? undefined : b;
        return img;
      })
    );
    books = await Promise.all(books.map(async (v) => await v));
    for (let i = 0; i < books.length; i++) {
      if (books[i] !== undefined) {
        books2.push(books[i]);
      }
    }
    console.log(books2);
    return books2;
  },
};
module.exports = imgVer;
