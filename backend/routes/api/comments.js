const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const validateComment = [
    check('body')
      .exists({ checkFalsy: true })
      .withMessage('Comment body text is required'),
    handleValidationErrors
  ];

//edit a comment
router.put('/:id', requireAuth, validateComment, async (req, res, next) => {
    let comment = await Comment.findByPk(req.params.id)

    if (!comment){
      const err = Error("Couldn't find a comment with the specified id");
      err.message = "Comment couldn't be found"
      err.status = 404;
      err.title = "Couldn't find a comment with the specified id";
      next(err)
    }

    const commentOwnerId = comment.toJSON().userId

    if (commentOwnerId !== req.user.id) {
      return res.status(403).json({
        "message" : "Comment must belong to the current user"
      })
    }

    const editedComment = await Comment.update(
        {
            body : req.body.body
        },
      {where: {id : req.params.id}}
      )

      const newComment = await Comment.findOne({
        where: {
          id: req.params.id
        }
      })

    return res.status(200).json(newComment)
})

// delete a comment
router.delete('/:id', requireAuth, async (req, res) => {
    const userId = req.user.id

    const comment = await Comment.findOne({
        where: {
          id: req.params.id
        }
      })

    if (comment === null) {
      return res.status(404).title("Couldn't find a Comment with the specified id").json(    {
        "message": "Comment couldn't be found",
        "statusCode": 404
      })
    }

    const ownerId = comment.toJSON().userId

    if (ownerId !== userId) {
      return res.status(403).json({
        "message" : "Comment must belong to the current user"
      })
    }

    const deletedComment = await Comment.destroy(
      {where: {id : req.params.id}}
    )

    return res.status(200).json({ "message" : "Successfully deleted", "status code" : 200})
  })

module.exports = router;
