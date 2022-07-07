const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')



// get all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    //console.log(songs)
    return res.json({"songs": songs})
})

// get all songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const songs = await Song.findAll({
        where: {
          artistId: req.user.id
        }
      })
    return res.json({"songs": songs})
})

// get details of a song from id
router.get('/:id', async (req, res) => {
    let song = await Song.findOne({
        where: {
          id: req.params.id
        },
        include:[
            {
                model: User,
                attributes: ['id', 'username', 'previewImage']
            }
        ]
      })
    //console.log(JSON.parse(song.toJSON()))

    song = song.toJSON()
    song.Artist = song.User
    delete song.User
    return res.send(song)
})
module.exports = router;
