'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Song)
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
