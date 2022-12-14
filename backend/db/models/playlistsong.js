'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // PlaylistSong.belongsToMany(models.Playlist)
      // PlaylistSong.belongsToMany(models.Song)
    }
  }
  PlaylistSong.init({
    playlistId: {
      type: DataTypes.INTEGER,
      references: { model: Model.Playlist, key: 'id', foreignKey: 'playlistId' }
    },
    songId: {
      type: DataTypes.INTEGER,
      references: { model: Model.Song, key: 'id', foreignKey: 'songId' }
    },
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};
