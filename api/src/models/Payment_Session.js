const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('payment_session', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mpID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.ARRAY,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
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