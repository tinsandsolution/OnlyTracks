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
    params.userId = req.user.id

    let album = await Album.create(params)

    return res.status(200).json(album)
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
  let userId = req.user.id

  const albums = await Album.findAll( { where: {userId : userId}})
  return res.json({ "Albums" : albums} )
})

//create a song for an album based on the album's id
router.post('/:id', requireAuth, validateNewSong, async (req, res, next) => {
    //I'm going to hell for this
    // const userId = req.user.id
    const albumId = req.params.id
    const {title, description, url, previewImage, userId} = req.body

    //album must exist
    //find album info based on albumid
    // console.log("happens")
    // const album = await Album.findOne({
    //     where: { id : albumId},
    //     attributes : ['userId']
    // })
    // if (album === null) {
    //   return res.status(404).json(    {
    //     "message": "Album couldn't be found",
    //     "statusCode": 404
    //   })
    // }
    // console.log("still happens")
    // const albumOwnerId = album.toJSON().userId

    //I'm going to hell for this
    // if (albumOwnerId !== userId) {
    //   return res.status(403).json({
    //     "message" : "Album must belong to the current user",
    //     "statusCode": 404
    //   })
    // }

    const createdSong = await Song.create({
      userId: userId,
      albumId: albumId,
      title: title,
      description: description,
      url: url,
      previewImage: previewImage,
    })

    return res.status(201).json(createdSong)
})

//edit an album
router.put('/:id', requireAuth, validateNewAlbum, async (req, res, next) => {
  const params = req.body; // { description: "description",...}
  params.userId = req.user.id
  const albumId = req.params.id

  let findAlbum = await Album.findByPk(albumId)
  if (findAlbum === null) {
    return res.status(404).json(    {
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }
  console.log(findAlbum.toJSON().userId)
  if (findAlbum.toJSON().userId !== req.user.id) {
    return res.status(403).json({
      "message" : "Album must belong to the current user",
      "statusCode": 404
    })
  }


  let album = await Album.update(params, { where: {id : albumId}})

  let updatedAlbum = await Album.findByPk(albumId)

  return res.status(200).json(updatedAlbum)
})

//delete an album
router.delete('/:id', requireAuth, async (req, res) => {
  const userId = req.user.id

  const album = await Album.findOne({
      where: {
        id: req.params.id
      }
    })

  if (album === null) {
    return res.status(404).title("Couldn't find a Song with the specified id").json(    {
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }

  const albumOwnerId = album.toJSON().userId

  if (albumOwnerId !== userId) {
    return res.status(403).json({
      "message" : "Album must belong to the current user"
    })
  }

  const deletedAlbum = await Album.destroy(
    {where: {id : req.params.id}}
  )

  return res.status(200).json({ "message" : "Successfully deleted", "status code" : 200})
})

module.exports = router;
