const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('reviews', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reports: {
        type: DataTypes.STRING,
        allowNull: false
      },
  },
    {
      timestamps: false
    }
  );
};