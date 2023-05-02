const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service.js');
const { generarJWT, validarJWT } = require('../utils/jwt');

router.post('/auth/login', async function(req, res, next) {
    try {
      const { mail, password } = req.body;
      const rows = await auth.validateLogin(mail, password)
      let count = 0;
      for(var row in rows) count++;
      if(count === 1) {
        const token = await generarJWT( rows[0].id, rows[0].nombre, rows[0].foto )
        return res.status(202).json({
            ok: true,
            uid: rows[0].id,
            token: token,
            nombre: rows[0].nombre,
            foto: rows[0].foto
        })
      } else {
        return res.status(401).json({
          ok: false,
          resp: "Usuario no existe o contraseña incorrecta"
      })
      }
      
    } catch (err) {
      console.error(`Error while getting that auth service:`, err.message);
      next(err);
    }
});

router.post('/auth/register', async function(req, res, next) {
try {
    const { rut, dv, mail, nombres, apellidos, password } = req.body;
    const rows = await auth.validateLogin(rut, password)
      let count = 0;
      for(var row in rows) count++;
      if(count === 1) {
        
        return res.status(200).json({
            ok: false,
            resp: 'El RUT que usted especificó ya está registrado'
        })
      } else {
        await auth.createUser(rut, dv, mail, nombres, apellidos, password).then(() => {
          
        return res.status(202).json({
            ok: true
        })
      }
    )}
} catch (err) {
    console.error(`Error while getting that auth service: `, err.message);
    next(err);
}
});

router.post('/auth/renew', async function(req, res, next) {
    try {
      const { token } = req.body
      if(!token) return res.status(200).json({
        ok: false,
        resp: 'Error en el token'
      })

      try {
        const { uid, name, foto } = validarJWT(token)
        return res.status(201).json({
          ok: true,
          uid, 
          nombre: name,
          foto
        })
      } catch (error) {
        return res.status(200).json({
          ok: false,
          resp: 'Token no valido'
        })
      }
    } catch (err) {
      console.error(`Error while getting that auth service `, err.message);
      next(err);
    }
});

module.exports = router;