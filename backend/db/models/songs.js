'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User)
      Song.belongsTo(models.Album)
      Song.hasMany(models.Comment, { sourceKey: 'id', foreignKey: 'songId' })

      Song.hasMany(models.PlaylistSong);
      Song.belongsToMany(
          models.Playlist,
          { through: models.PlaylistSong}
      );
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,

    },
    albumId: {
      type: DataTypes.INTEGER,

    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 256]
      }
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 256]
      }
    }
  }, {
    sequelize,
    modelName: 'songs',
  });
  return Song;
};
