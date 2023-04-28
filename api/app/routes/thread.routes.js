const express = require('express');
const router = express.Router();
const thread = require('../services/thread.service.js');

router.get('/threads/:id', async function(req, res, next) {
  try {
    res.json(await thread.getByTopic(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting threads from that topic `, err.message);
    next(err);
  }
});
router.post('/post/thread', async function(req, res, next) {
  try {
    const { cuerpo, id_usuario, id_tema } = req.body
    await thread.post(cuerpo, id_tema, id_usuario)
    return res.status(201).json({
      ok: true,
      msg: 'El hilo fue creado con exito'
    })
  } catch (err) {
    return res.status(200).json({
      ok: false,
      msg: 'Error posteando el hilo: ' + err
    })
    next(err);
  }
});

module.exports = router;