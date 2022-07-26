const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('bookswithimg', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(10000),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(10000),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING(10000)),
      allowNull: false
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING(10000)),
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    publishedDate: {
      type: DataTypes.STRING(10000),
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
      type: DataTypes.STRING(10000),
      allowNull: true
    },
  },
    {
      timestamps: false
    }
  );
};
