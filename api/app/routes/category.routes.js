
const express = require('express');
const router = express.Router();
const category = require('../services/category.service.js');

router.get('/categories', async function(req, res, next) {
  try {
    res.json(await category.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

router.get('/categorie/:id/forums', async function(req, res, next) {
  try {
    res.json(await category.getCategoryForums(req.query.page, parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting category's forums `, err.message);
    next(err);
  }
});

module.exports = router;