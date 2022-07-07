const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const validateNewAlbum = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Song title is required'),
    check('url')
      .exists({ checkFalsy: true})
      .withMessage('Audio is required'),
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

    const album = await Album.create(params)
    console.log(album)
    return res.json(req.body)
})

//create a song for an album based on the album's id
router.post('/:id', requireAuth, validateNewAlbum, async (req, res, next) => {
    const userId = req.user.id
    const albumId = req.params.id

    //album must exist
    //find album info based on albumid
    const album = Album.findByPk(albumId)
    if (!album) {
        const err = Error("Album couldn't be found");
        err.title = "Not Found Error"
        err.status = 404;
        next(err)
    }


    //album must belong to current user
        //find userId of current album using album id, assign to albumOwnerId
        //if albumOwnerId is not equal to ownerId, create an error
        // const err = Error("Album must belong to the current user");
        // err.title = "Authorization Error"
        // err.status = 403;
        // next(err)

    //create album




    return res.json({test: "test"})
})


module.exports = router;
