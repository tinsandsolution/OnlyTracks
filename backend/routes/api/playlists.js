const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const validatePlaylist = [
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Playlist name is required'),
    handleValidationErrors
  ];

// get all playlist by current user
router.get('/current', requireAuth, async (req, res) => {
  const playlists = await Playlist.findAll({
      where: {
        userId: req.user.id
      }
    })
  return res.json({"playlists": playlists})
})

//create a comment for a song based on the song's id
router.post('/', requireAuth, validatePlaylist, async (req, res, next) => {
    let playlist = await Playlist.create({ "userId": req.user.id ,"name" : req.body.name, "previewImage" : req.body.previewImage })

    return res.json(playlist)
  })

//create a comment for a song based on the song's id
router.post('/:id', requireAuth, async (req, res, next) => {
    let playlistId = req.params.id
    let songId = req.body.songId
    let userId = req.user.id

    const playlist = await Playlist.findOne({
        where: {
          id: req.params.id
        }
      })

    if (playlist === null) {
      return res.status(404).title("Couldn't find a Playlist with the specified id").json(    {
        "message": "Playlist couldn't be found",
        "statusCode": 404
      })
    }

    const ownerId = playlist.toJSON().userId

    if (ownerId !== userId) {
      return res.status(403).json({
        "message" : "Playlist must belong to the current user"
      })
    }

    const song = await Song.findOne({
        where: {
          id: songId
        }
      })

    if (song === null) {
      return res.status(404).title("Couldn't find a Song with the specified id").json(    {
        "message": "Song couldn't be found",
        "statusCode": 404
      })
    }

    const songOwnerId = song.toJSON().userId

    if (songOwnerId !== userId) {
      return res.status(403).json({
        "message" : "Song must belong to the current user"
      })
    }

    let entry = await PlaylistSong.create({ "playlistId" : playlistId, "songId" : songId })
    let result = await PlaylistSong.findOne({
        where: {
            "playlistId" : playlistId, "songId" : songId
        },
        attributes: ["id", "playlistId", "songId"]
    })
    return res.json(result)
  })

// get details of a playlist from id
router.get('/:id', async (req, res, next) => {
  let playlist = await Playlist.findOne({
      where: {
        id: req.params.id
      },
      include:[
          {
              model: Song,
          }
      ]
    })
  if (!playlist){
    const err = Error("Couldn't find a playlist with the specified id");
    err.message = "Playlist couldn't be found"
    err.status = 404;
    err.title = "Couldn't find a playlist with the specified id";
    next(err)
  }

  return res.send(playlist)
})

// edit a playlist
router.put('/:id', requireAuth, validatePlaylist, async (req, res) => {
  const userId = req.user.id

  const playlist = await Playlist.findOne({
      where: {
        id: req.params.id
      }
    })

  if (playlist === null) {
    const err = Error("Couldn't find a playlist with the specified id");
    err.message = "Playlist couldn't be found"
    err.status = 404;
    err.title = "Couldn't find a playlist with the specified id";
    next(err)
  }

  const ownerId = playlist.toJSON().userId

  if (ownerId !== userId) {
    return res.status(403).json({
      "message" : "Playlist must belong to the current user"
    })
  }

  const editedPlaylist = await Playlist.update( req.body,
  {where: {id : req.params.id}}
  )

  const newPlaylist = await Playlist.findOne({
    where: {
      id: req.params.id
    }
  })

  return res.status(200).json(newPlaylist)
})

//delete a playlist
router.delete('/:id', requireAuth, async (req, res) => {
  const userId = req.user.id

  const playlist = await Playlist.findOne({
      where: {
        id: req.params.id
      }
    })

  if (playlist === null) {
    const err = Error("Couldn't find a playlist with the specified id");
    err.message = "Playlist couldn't be found"
    err.status = 404;
    err.title = "Couldn't find a playlist with the specified id";
    next(err)
  }

  const ownerId = playlist.toJSON().userId

  if (ownerId !== userId) {
    return res.status(403).json({
      "message" : "Playlist must belong to the current user"
    })
  }

  const deletedPlaylist = await Playlist.destroy(
    {where: {id : req.params.id}}
  )

  return res.status(200).json({ "message" : "Successfully deleted", "status code" : 200})
})



module.exports = router;
