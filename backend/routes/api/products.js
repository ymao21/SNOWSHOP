const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const { User, Song, Album, Comment} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors} = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const product = require('../../db/models/product');
const router = express.Router();


//get all products

router.get("/home", async (req, res, next) => {





    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);

    }
    const songs = await Song.findAll({
        ...pagination,
    })

    return res.json({songs, page, size})
})
