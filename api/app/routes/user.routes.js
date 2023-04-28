const express = require('express');
const router = express.Router();
const users = require('../services/user.service.js');

router.get('/users', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.get('/user/:id', async function(req, res, next) {
  try {
    res.json(await users.getById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting that user `, err.message);
    next(err);
  }
});



module.exports = router;