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
    stage_name: DataTypes.STRING,
    rows: DataTypes.INTEGER,
    seats_in_row: DataTypes.INTEGER,
    number_of_seats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stage',
  });
  return stage;
};