const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('setupStatus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    initialSetupDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
