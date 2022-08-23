const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "KeyValue",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        tpe: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "KeyValue",
      timestamps,
    }
  );
};
