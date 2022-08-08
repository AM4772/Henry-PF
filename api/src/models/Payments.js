const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'payments',
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mpID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gift: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      giftrecipient: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
