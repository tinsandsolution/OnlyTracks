const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')


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

module.exports = router;
