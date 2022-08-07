const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const { createPDForder, createPDFebook } = require('./createPDF');
const { Books } = require('../../db');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookstore.online.arg@gmail.com',
    pass: 'tnfyzusfbumjxgre',
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve(path.join(__dirname, 'handlebars/')),
    defaultLayout: false,
  },
  viewPath: path.resolve(path.join(__dirname, 'handlebars/')),
};

transporter.use('compile', hbs(handlebarOptions));
let emailsModule = {
  sendMail: async function (data) {
    let context = {};
    let subject = '';
    let template = '';
    let attachments = [];
    if (data.emailType === 'register') {
      subject = 'Register';
      template = 'register';
      context = {
        ID: data.ID,
        name: data.name,
        username: data.username,
        token: data.token,
      };
    }
    if (data.emailType === 'reset') {
      subject = 'Reset Code';
      template = 'reset';
      context = {
        username: data.username,
        token: data.token,
      };
    }

    if (data.emailType === 'detail') {
      subject = 'Purchase Detail #' + data.ID;
      template = 'detail';
      let pdfOutput = await createPDForder(
        (orderDetails = { items: data.items.length, total: data.total })
      );
      attachments = [{ path: pdfOutput }];
      context = {
        username: data.username,
        items: data.items.length,
        total: data.total,
      };
    }
    if (data.emailType === 'eBook') {
      for (let i = 0; i < data.items.length; i++) {
        const book = await Books.findByPk(data.items[i].ID);
        const booksJSON = book.toJSON();
        let pdfOutput = await createPDFebook(data.items[i].ID);
        attachments = [{ path: pdfOutput }];
        subject = 'ebook: ' + booksJSON.title;
        template = 'ebook';
        context = {
          username: data.username,
          title: booksJSON.title,
          image: booksJSON.image,
        };
        var mailOptions = {
          from: '"BOOKSTORE" <bookstore.online.arg@gmail.com>',
          to: data.email,
          subject,
          template,
          context: context,
          attachments,
        };
        const response = new Promise((resolve, reject) => {
          try {
            transporter.sendMail(mailOptions, async function (error, info) {
              if (error) {
                console.log(error);
                reject();
              }
              console.log(info);
              resolve(info);
              return info;
            });
          } catch (error) {
            console.log(error);
            reject();
            return null;
          }
        });
        var array = [];
        array.push(
          await response.then((r) => {
            return r;
          })
        );
      }

      return Promise.all(array);
    } else {
      var mailOptions = {
        from: '"BOOKSTORE" <bookstore.online.arg@gmail.com>',
        to: data.email,
        subject,
        template,
        context: context,
        attachments,
      };
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            reject(error);
          }
          if (info) {
            console.log(info);
            resolve('Message sent: ', info.response);
          }
        });
      });
    }
  },
};
module.exports = emailsModule;
