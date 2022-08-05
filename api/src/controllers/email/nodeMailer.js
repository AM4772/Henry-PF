const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

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
    var mailOptions = {
      from: '"BOOKSTORE" <bookstore.online.arg@gmail.com>',
      to: data.email,
      subject,
      template,
      context: context,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('Message sent: ' + info.response);
      return true;
    });
  },
};
module.exports = emailsModule;
