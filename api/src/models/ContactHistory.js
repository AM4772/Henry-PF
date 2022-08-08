const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('contacthistory', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    company: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
  },
    {
      timestamps: true
    }
  );
};