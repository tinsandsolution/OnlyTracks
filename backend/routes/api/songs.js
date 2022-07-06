const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')



// get all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll()
    return res.json(songs)
})

// get all songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const songs = await Song.findAll({
        where: {
          artistId: req.user.id
        }
      })
    return res.json(songs)
})

// get details of a song from id
router.get('/:id', async (req, res) => {
    const song = await Song.findOne({
        where: {
          id: req.params.id
        }
      })
    return res.json(song)
})
module.exports = router;
