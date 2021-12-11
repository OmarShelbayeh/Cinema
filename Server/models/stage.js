'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  stage.init({
    stageName: DataTypes.STRING,
    rows: DataTypes.INTEGER,
    seatsInRow: DataTypes.INTEGER,
    numberOfSeats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stage',
  });
  return stage;
};