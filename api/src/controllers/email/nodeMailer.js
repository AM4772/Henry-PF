const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const { createPDF } = require('./createPDF');
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
    partialsDir: path.resolve('./src/controllers/email/handlebars/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/controllers/email/handlebars/'),
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
        ID: data.ID,
        username: data.username,
        token: data.token,
      };
    }
    if (data.emailType === 'eBook') {
      for (let i = 0; i < data.items.length; i++) {
        subject = 'eBook';
        template = 'eBook';
        const book = await Books.findByPk(data.items[i].ID);
        const booksJSON = book.toJSON();
        let pdfOutput = await createPDF(data.items[i].ID);
        attachments = [{ path: pdfOutput }];
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
      console.log('array', array);
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
