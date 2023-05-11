const express = require('express');
const router = express.Router();
const user = require('../services/user.service.js');
const multer = require('multer');

const storageEngineProfile = multer.diskStorage({
  destination: "./app/images/profiles",
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
storage: storageEngineProfile,
limits: { fileSize: 10000000 },
});

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

router.post('/user/upload', upload.single("file"), (req, res) => {
  try {
      console.log(req.file);
      
      if (req.file) {
        user.uploadImage(req.file.filename, req.body.rut)
          res.json(
              {
                  ok: true,
                  message: {
                    "image": req.file.filename,
                  }
              }
          );
          
      } else {
          res.status(400).json({
              ok: false,
              message: "No file uploaded, please upload a valid one",
          });
      }
  } catch (err) {
      console.error(`Error while getting all works: `, err.message);
      next(err);
  }
});


module.exports = router;