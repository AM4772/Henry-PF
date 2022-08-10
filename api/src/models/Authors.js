const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'authors',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
