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
      Comment.belongsTo(models.User, { sourceKey: "userId", foreignKey: "id"})
      Comment.belongsTo(models.Song, { sourceKey: "songId", foreignKey: "id"})
    }
  }
  Comment.init({
    userId: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
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
