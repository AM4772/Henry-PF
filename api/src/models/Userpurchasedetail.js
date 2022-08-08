const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('userpurchasedetail', {
    items: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    gift: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
  },
    {
      timestamps: true
    }
  );
};