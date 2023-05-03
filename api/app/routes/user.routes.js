const express = require('express');
const router = express.Router();
const user = require('../services/user.service.js');

router.get('/users', async function(req, res, next) {
    try {
      res.json(await user.getUsers(req.query.page));
    } catch (err) {
      console.error(`Error while getting all users: `, err.message);
      next(err);
    }
});

router.get('/user/:rut/:dv', async function(req, res, next) {
  try {
    return res.status(201).json(await user.getUserByRut(parseInt(req.params.rut), parseInt(req.params.dv)))
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error obteniendo el usuario: ' + err
    })
    next(err);
  }
});


module.exports = router;