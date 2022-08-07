const url = require('url');
const https = require('https');
const sizeOf = require('image-size');
const { Books, Apibooks } = require('../db');
let imgVer = {
  imgVerify: async function (img) {
    //console.log(img);
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
    let books = await Apibooks.findAll();
    const booksArray = [];
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
        booksArray.push(books[i]);
      }
    }

    booksArray &&
      booksArray.map(async (b) => {
        let hours;
        let minutes;
        if (b.pageCount !== 0) {
          const avgRT = (300 * b.pageCount) / 250 / 60;
          hours = Math.trunc(avgRT);
          minutes = Math.round((avgRT - Math.trunc(avgRT)) * 60);
        }
        await Books.findOrCreate({
          where: {
            title: b.title,
            description: b.description ? b.description : 'No description',
            price: b.price,
            image: b.image,
            authors: b.authors ? b.authors : [],
            categories: b.categories ? b.categories : [],
            publisher: b.publisher ? b.publisher : 'NO PUBLISHER',
            publishedDate: b.publishedDate ? b.publishedDate : 'NO DATE',
            pageCount: b.pageCount ? b.pageCount : 0,
            rating: 0,
            language: b.language ? b.language : 'NO INFO',
            avgReadingTime:
              b.pageCount === 0
                ? 'Cannot estimate reading time'
                : hours + ' hs and ' + minutes + ' minutes',
          },
        });
      });
    return booksArray;
  },
};
module.exports = imgVer;
