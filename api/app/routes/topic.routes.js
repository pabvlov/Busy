const express = require('express');
const router = express.Router();
const topic = require('../services/topic.service.js');

router.get('/topics', async function(req, res, next) {
  try {
    res.json(await topic.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting topics `, err.message);
    next(err);
  }
});

router.get('/topics/:id', async function(req, res, next) {
  try {
    res.json(await topic.getByForum(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting topics from that forum `, err.message);
    next(err);
  }
});

router.get('/topic/:id', async function(req, res, next) {
  try {
    res.json(await topic.getById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting that topic `, err.message);
    next(err);
  }
});

router.get('/user/:id/topics', async function(req, res, next) {
  try {
    res.json(await topic.getByUser(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting that topic `, err.message);
    next(err);
  }
});

router.post('/post/', async function(req, res, next) {
  try {
    const { titulo, categoria, cuerpo, id_foro, id_usuario } = req.body
    await topic.post(titulo, categoria, cuerpo, id_foro, id_usuario)
    return res.status(201).json({
      ok: true,
      msg: 'El tema fue creado con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error posteando el tema: ' + err
    })
    next(err);
  }
});

router.post('/post/edit', async function(req, res, next) {
  try {
    const { id, titulo, categoria, cuerpo } = req.body
    await topic.editar(id, titulo, categoria, cuerpo)
    return res.status(201).json({
      ok: true,
      msg: 'El tema fue editado con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error editando el tema: ' + err
    })
    next(err);
  }
});

router.post('/post/hide', async function(req, res, next) {
  try {
    const { id } = req.body
    await topic.hide(id)
    return res.status(201).json({
      ok: true,
      msg: 'El tema fue escondido con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error escondiendo el tema: ' + err
    })
    next(err);
  }
});

router.post('/post/show', async function(req, res, next) {
  try {
    const { id } = req.body
    await topic.show(id)
    return res.status(201).json({
      ok: true,
      msg: 'El tema fue mostrado con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error mostrando el tema: ' + err
    })
    next(err);
  }
});

module.exports = router;