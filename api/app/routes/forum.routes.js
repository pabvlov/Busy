const express = require('express');
const router = express.Router();
const forums = require('../services/forum.service.js');

router.get('/forums', async function(req, res, next) {
  try {
    res.json(await forums.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting forums `, err.message);
    next(err);
  }
});

router.get('/forum/:id', async function(req, res, next) {
  try {
    res.json(await forums.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting forum `, err.message);
    next(err);
  }
});

router.get('/forum/borrar', async function(req, res, next) {
  try {

    res.json(await forums.delete(req.params.id));
  } catch (err) {
    console.error(`Error while getting forum `, err.message);
    next(err);
  }
});

router.get('/forum/crear', async function(req, res, next) {
  try {
    const { nombre, descripcion, foto, id_categoria } = req.body;
    res.json(await forums.delete(nombre, descripcion, foto, id_categoria));
  } catch (err) {
    console.error(`Error while getting forum `, err.message);
    next(err);
  }
});

router.post('/forum/editar', async function(req, res, next) {
  try {
    const { id, nombre, descripcion, foto, id_categoria_fk } = req.body;
    await forums.editar(id, nombre, descripcion, foto, id_categoria_fk);
    return res.status(202).json({
      ok: true,
      msg: "foro editado con exito"
    })
  } catch (err) {
    console.error(`Error while editting forum `, err.message);
    next(err);
  }
});

router.get('/user/:id/forums', async function(req, res, next) {
  try {
    res.json(await forums.getByUser(req.params.id));
  } catch (err) {
    console.error(`Error while getting forum `, err.message);
    next(err);
  }
});

module.exports = router;
