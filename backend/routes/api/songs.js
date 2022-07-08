const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Song title is required'),
  check('url')
    .exists({ checkFalsy: true})
    .withMessage('Audio is required'),
  handleValidationErrors
];

// get all songs
router.get('/', async (req, res) => {
    let songs = await Song.findAll( {
      attributes: ["id","userId","albumId","title","description","url","createdAt","updatedAt","previewImage"]
    })
    return res.json({"songs": songs})
})

// get all songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const songs = await Song.findAll({
        where: {
          userId: req.user.id
        },
        attributes: ["id","userId","albumId","title","description","url","createdAt","updatedAt","previewImage"]
      })
    return res.json({"songs": songs})
})

// get details of a song from id
router.get('/:id', async (req, res, next) => {
    let song = await Song.findOne({
        attributes: ["id","userId","albumId","title","description","url","createdAt","updatedAt","previewImage"],
        where: {
          id: req.params.id
        },
        include:[
            {
                model: User,
                attributes: ['id', 'username', 'previewImage']
            },
            {
              model: Album,
              attributes: ['id', 'title', 'previewImage']
          },
        ]
      })
    if (!song){
      const err = Error("Couldn't find a song with the specified id");
      err.message = "Song couldn't be found"
      err.status = 404;
      err.title = "Couldn't find a song with the specified id";
      next(err)
    }
    //console.log(JSON.parse(song.toJSON()))

    song = song.toJSON()
    song.Artist = song.User
    delete song.User
    return res.send(song)
})


// edit a song
router.put('/:id', requireAuth, validateSong, async (req, res) => {
  const userId = req.user.id
  const {title, description, url, previewImage} = req.body

  const song = await Song.findOne({
      where: {
        id: req.params.id
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

  const editedSong = await Song.update(
    {
      title: title,
      description: description,
      url: url,
      previewImage: previewImage,
    },
  {where: {id : req.params.id}}
  )

  const newSong = await Song.findOne({
    where: {
      id: req.params.id
    }
  })

  return res.status(200).json(newSong)
})


// delete a song
router.delete('/:id', requireAuth, async (req, res) => {
  const userId = req.user.id

  const song = await Song.findOne({
      where: {
        id: req.params.id
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

  const deletedSong = await Song.destroy(
    {where: {id : req.params.id}}
  )

  return res.status(200).json({ "message" : "Successfully deleted", "status code" : 200})
})
module.exports = router;
