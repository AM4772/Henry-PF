require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DATABASE_URL = undefined,
} = process.env;

let sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
      native: false,
    })
  : new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      { logging: false, native: false }
    );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Books,
  Users,
  Apibooks,
  Payments,
  Reviews,
  Userpurchasedetail,
  Authors,
  Categories,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Users.belongsToMany(Books, { through: 'user_bookfav', as: 'favourite' });
Books.belongsToMany(Users, { through: 'user_bookfav', as: 'favourite' });
Users.belongsToMany(Books, { through: 'user_bookcart', as: 'cart' });
Books.belongsToMany(Users, { through: 'user_bookcart', as: 'cart' });
Books.hasMany(Reviews);
Reviews.belongsTo(Books);
Users.hasMany(Reviews);
Reviews.belongsTo(Users);
Users.hasMany(Payments);
Payments.belongsTo(Users);
Users.hasMany(Userpurchasedetail);
Userpurchasedetail.belongsTo(Users);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
