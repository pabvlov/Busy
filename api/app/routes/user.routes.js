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
limits: { fileSize: 100000000 },
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
    const usuario = await user.getUserByRut(parseInt(req.params.rut), parseInt(req.params.dv));

    // Check if the user array is not empty
    if (usuario.length > 0) {
      // Get the first user
      const firstUser = usuario[0].result;

      return res.status(201).json({
        ok: true,
        content: {
          // Assign the first user to the 'user' property
          user: firstUser
        }
      });
    } else {
      // User array is empty
      return res.status(200).json({
        ok: false,
        message: 'No se encontró ningún usuario'
      });
    }
  } catch (err) {
    return res.status(200).json({
      ok: false,
      message: 'Error obteniendo el usuario: ' + err
    });
    next(err);
  }
});

router.get('/user/profile/:rut/:dv', async function(req, res, next) {
  try {
    const usuario = await user.getUserByRut(parseInt(req.params.rut), parseInt(req.params.dv))
    
    if (usuario.length > 0) {
      // Get the first user
      const firstUser = usuario[0].result;

      return res.status(201).json({
        ok: true,
        content: {
          // Assign the first user to the 'user' property
          user: firstUser
        }
      });
    } else {
      // User array is empty
      return res.status(200).json({
        ok: false,
        message: 'No se encontró ningún usuario'
      });
    }
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

router.put('/user/edit', async function(req, res, next) {
  try {
    const data = req.body
    await user.updateUser(data)
    return res.status(201).json(
      {
        ok: true,
        message: 'Usuario actualizado correctamente'
      }
    )
  } catch (err) {
    return res.status(200).json({
      ok: false,
      message: 'Error obteniendo el usuario: ' + err
    })
    next(err);
  }
});


module.exports = router;