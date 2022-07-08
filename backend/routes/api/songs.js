const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')



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
    // song.Artist = song.User
    // delete song.User
    return res.send(song)
})


// edit a song
router.get('/:id', requireAuth, async (req, res) => {
  const songs = await Song.findAll({
      where: {
        artistId: req.user.id
      }
    })
  return res.json({"songs": songs})
})
module.exports = router;
