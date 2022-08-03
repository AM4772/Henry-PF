const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('payments', {
    mpID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    gift: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    giftrecipient: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
    {
      timestamps: true
    }
  );
};