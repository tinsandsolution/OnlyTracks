const express = require('express')
const fileHandler = require("express-fileupload");
const path = require("path");
//import generateFileName from '../../utils/words';

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment} = require('../../db/models');

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

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Comment body text is required'),
  handleValidationErrors
];


// get all songs
router.get('/', async (req, res) => {
    let extraParams = {}

    let {page, size, title, createdAt} = req.query

    let con1 = !page || isNaN(page)
    let con2 = page < 0 || page > 10
    if (con1 || con2) page = 0

    let con3 = !size || isNaN(size)
    let con4 = size < 0 || size > 20
    if (con3 || con4) size = 20


    //console.log(page)
    //console.log(size)
    let pagination = 0
    let limit = 0
    let offset = 20
    if (page >= 1 && size >= 0) {
      pagination = 1
      limit = size;
      console.log(size)
      offset = size * (page - 1)
    }
    //console.log(limit)
    //console.log(offset)


    if (title !== undefined) extraParams.title = title
    if (createdAt !== undefined) extraParams.createdAt = createdAt

    let songs = {}
    if(pagination) songs = await Song.findAll({
      "limit": limit,
      "offset": offset,
      where: extraParams})
    else songs = await Song.findAll({where : extraParams})
    return res.json({"songs": songs, page, size})
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


//get all comments by a song's id
router.get('/:id/comments', async (req, res, next) => {
  let song = await Song.findByPk(req.params.id)

  if (!song){
    const err = Error("Couldn't find a song with the specified id");
    err.message = "Song couldn't be found"
    err.status = 404;
    err.title = "Couldn't find a song with the specified id";
    next(err)
  }

  let comments = await Comment.findAll({
    where: {
      songId: req.params.id
    },
    include : [{
      model: User,
      attributes: ["id", "username","previewImage"]
    }]
  })
  console.log("here is the comments", comments)

  return res.json(comments)
})

//create a comment for a song based on the song's id
router.post('/:id/comments', requireAuth, validateComment, async (req, res, next) => {
  let song = await Song.findByPk(req.params.id)

  if (!song){
    const err = Error("Couldn't find a song with the specified id");
    err.message = "Song couldn't be found"
    err.status = 404;
    err.title = "Couldn't find a song with the specified id";
    next(err)
  }
  // console.log("fsadfasdfdasfsdafdasfasdf")
  // console.log(req)
  let comment = await Comment.create({ songId: req.params.id, userId: req.user.id, body: req.body.body })

  return res.json(comment)
})

//upload a song file
// router.post('/upload', requireAuth, async (req, res, next) => {

//   if (!req.files.songFile){
//     const err = Error("No song exists");
//     err.message = "No song exists"
//     err.status = 404;
//     err.title = "Couldn't upload the song";
//     next(err)
//   }

//   if (!req.files.imageFile){
//     const err = Error("No image file exists");
//     err.message = "No image file exists"
//     err.status = 404;
//     err.title = "Couldn't upload the image file";
//     next(err)
//   }




//   return res.json({"fdsafasd" : "fdsafasdfds"})
// })



module.exports = router;
