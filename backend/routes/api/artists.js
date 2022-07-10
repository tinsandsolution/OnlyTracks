const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')


//get details of an artist from id
router.get('/:id', async (req, res, next) => {
    const artist = await User.findOne({
        where: { id : req.params.id },
        attributes : [
            'id',
            'username',
            'previewImage',
        ],
    })
    if (!artist){
        const err = Error("Couldn't find an Artists with the specified id");
        err.message = "Artists couldn't be found"
        err.status = 404;
        err.title = "Couldn't find an Artists with the specified id";
        next(err)
      }

    const totalSongs = await Song.count({
        where : {
            userId : req.params.id
        }
    })

    const totalAlbums = await Album.count({
        where : {
            userId : req.params.id
        }
    })
    let returnObj = artist.toJSON()
    returnObj.totalSongs = totalSongs
    returnObj.totalAlbums = totalAlbums

    res.status(200).send(returnObj)
})

//get songs of an artist from id
router.get('/:id/songs', async (req, res, next) => {
    const artist = await User.findOne({
        where: { id : req.params.id },
        attributes : [
            'id',
            'username',
            'previewImage',
        ],
    })
    if (!artist){
        const err = Error("Couldn't find an Artists with the specified id");
        err.message = "Artists couldn't be found"
        err.status = 404;
        err.title = "Couldn't find an Artists with the specified id";
        next(err)
      }

    const songs = await Song.findAll({
        where : {
            userId : req.params.id
        }
    })

    res.status(200).json(songs)
})

//get songs of an artist from id
router.get('/:id/albums', async (req, res, next) => {
    const artist = await User.findOne({
        where: { id : req.params.id },
        attributes : [
            'id',
            'username',
            'previewImage',
        ],
    })
    if (!artist){
        const err = Error("Couldn't find an Artists with the specified id");
        err.message = "Artists couldn't be found"
        err.status = 404;
        err.title = "Couldn't find an Artists with the specified id";
        next(err)
      }

    const albums = await Album.findAll({
        where : {
            userId : req.params.id
        }
    })

    res.status(200).json(albums)
})

module.exports = router;
