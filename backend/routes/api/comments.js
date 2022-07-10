const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

module.exports = router;
