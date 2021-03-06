"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tickets.init(
    {
      schedule_id: DataTypes.INTEGER,
      seat_id: DataTypes.INTEGER,
      who_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tickets",
    }
  );
  return tickets;
};
