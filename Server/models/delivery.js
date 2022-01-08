"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  delivery.init(
    {
      order_id: DataTypes.INTEGER,
      storage_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "delivery",
    }
  );
  return delivery;
};
