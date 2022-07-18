const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('books', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(9999),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publishedDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
    {
      timestamps: false
    }
  );
};
