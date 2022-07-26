const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user_purchase_detail', {
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
      timestamps: false
    }
  );
};