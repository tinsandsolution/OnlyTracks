const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const validateNewSong= [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Song title is required'),
    check('url')
      .exists({ checkFalsy: true})
      .withMessage('Audio is required'),
    handleValidationErrors
  ];

const validateNewAlbum= [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Song title is required'),
  handleValidationErrors
];


// create an album
// fetch('/api/albums', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `Le3bDITr-IFBuUw3sXQpRQCybYNjEo3qekRk`
//     },
//     body: JSON.stringify({
//         "title": "Time",
//         "description": "An album about time.",
//         "imageUrl": "image url"
//     })
//   }).then(res => res.json()).then(data => console.log(data));
router.post('/', requireAuth, async (req, res) => {
    //userId, description, title, previewImage
    //const userId = User.scope("currentUser");
    const params = req.body; // { description: "description",...}
    params.artistId = req.user.id

    let album = await Album.create(params)
    album = JSON.stringify(album)
    album = JSON.parse(album)

    console.log(typeof album)
    album["userId"] = album["artistId"]
    console.log(album)
    delete album["artistId"]
    return res.status(200).send(album)
})

router.get('/', async (req, res) => {
  const albums = await Album.findAll()
  return res.json({ "Albums" : albums} )
})

// get details of an album based on id
router.get('/:id', async (req, res) => {
  const albumId = req.params.id

  const albums = await Album.findAll({
    where: { id : albumId},
    include: Song
  })

  if (albums === null) {
    return res.status(404).json({
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }

  // const songs  = await Song.findAll({ where : {albumId : albumId}})

  // let returnObject = json.
  // returnObject.songs = songs.toJSON()
  return res.send(albums)
})

// get all albums created by the current user
router.get('/current', requireAuth, async (req, res) => {
  artistId = req.user.id

  const albums = await Album.findAll( { where: {artistId : artistId}})
  return res.json({ "Albums" : albums} )
})

//create a song for an album based on the album's id
router.post('/:id', requireAuth, validateNewSong, async (req, res, next) => {
    const userId = req.user.id
    const albumId = req.params.id
    const {title, description, url, previewImage} = req.body

    //album must exist
    //find album info based on albumid
    console.log("happens")
    const album = await Album.findOne({
        where: { id : albumId},
        attributes : ['artistId']
    })
    if (album === null) {
      return res.status(404).json(    {
        "message": "Album couldn't be found",
        "statusCode": 404
      })
    }
    console.log("still happens")
    const albumOwnerId = album.toJSON().artistId

    if (albumOwnerId !== userId) {
      return res.status(403).json({
        "message" : "Album must belong to the current user",
        "statusCode": 404
      })
    }

    const createdSong = await Song.create({
      userId: albumOwnerId,
      albumId: albumId,
      title: title,
      description: description,
      url: url,
      previewImage: previewImage,
    })

    return res.status(201).json(createdSong)
})


module.exports = router;
