'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Thread.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Thread.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
    }
  }
  Thread.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Thread',
    underscored: true
  });
  return Thread;
};