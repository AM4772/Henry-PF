const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('categories', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING(10000),
      allowNull: false
    },
  },
    {
      timestamps: false
    }
  );
};