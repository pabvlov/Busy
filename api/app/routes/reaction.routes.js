const express = require('express');
const router = express.Router();
const reaction = require('../services/reaction.service.js');

router.get('/reactions', async function(req, res, next) {
  try {
    res.json(await reaction.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting reactions `, err.message);
    next(err);
  }
});

router.get('/reaction/:id', async function(req, res, next) {
  try {
    res.json(await reaction.getById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting that reaction `, err.message);
    next(err);
  }
});

router.post('/add/reaction', async function(req, res, next) {
  try {
    const { reaccion } = req.body
    await reaction.add(reaccion)
    return res.status(201).json({
      ok: true,
      msg: 'La reacción fue creada con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error creando la reacción: ' + err
    })
    next(err);
  }
});

router.post('/topic/add/reaction', async function(req, res, next) {
  try {
    const { id_tema, id_user, id_reaccion } = req.body
    await reaction.addToTopic(id_tema, id_user, id_reaccion)
    return res.status(201).json({
      ok: true,
      msg: 'La reacción se añadió al tema' + id_tema
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error añadiendo la reacción: ' + err
    })
    next(err);
  }
});

router.post('/thread/add/reaction', async function(req, res, next) {
  try {
    const { id_hilo, id_user, id_reaccion } = req.body
    await reaction.addToThread(id_hilo, id_user, id_reaccion)
    return res.status(201).json({
      ok: true,
      msg: 'La reacción se añadió al hilo' + id_hilo
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error añadiendo la reacción: ' + err
    })
    next(err);
  }
});

router.get('/topic/reactions/:id', async function(req, res, next) {
  try {
    return res.status(201).json(await reaction.getAllByTopic(parseInt(req.params.id)))
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error obteniendo reacciones: ' + err
    })
    next(err);
  }
});

module.exports = router;