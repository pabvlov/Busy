const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service.js');
const { generarJWT, validarJWT } = require('../utils/jwt');

router.post('/auth/login', async function(req, res, next) {
    try {
      const { rut, password } = req.body;
      const rows = await auth.validateLogin(rut, password)
      let count = 0;
      for(var row in rows.content) count++;
      if(count === 1) {
        if (!rows.ok) {
          return res.status(401).json({
            ok: false,
            message: 'Hubo un error',
          })
        }
        const token = await generarJWT( rows.content[0].rut, rows.content[0].nombres, rows.content[0].apellidos, rows.content[0].foto, rows.content[0].mail )
        return res.status(202).json({
            ok: true,
            content: {
              rut: rows.content[0].rut,
              token: token,
              nombre: rows.content[0].nombres,
              apellidos: rows.content[0].apellidos,
              foto: rows.content[0].foto,
              mail: rows.content[0].mail
            }
            
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
      for(var row in rows.content) count++;
      if (!rows.ok) {
        return res.status(401).json(rows)
      } else if(count === 1) {
        return res.status(200).json({
            ok: false,
            message: 'El RUT que usted especificó ya está registrado'
        })
      } else {
        await auth.createUser(rut, dv, mail, nombres, apellidos, password).then(() => {
          
        return res.status(202).json({
            ok: true,
            message: 'Usuario creado con éxito'
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
        message: 'Error en el token'
      })

      try {
        const { rut, nombres, apellidos, foto, mail } = validarJWT(token)
        return res.status(201).json({
          ok: true,
          content: {
            rut, 
            token,
            nombres,
            apellidos,
            foto,
            mail
          }
        })
      } catch (error) {
        return res.status(200).json({
          ok: false,
          message: 'Token no valido: ' + error
        })
      }
    } catch (err) {
      console.error(`Error while getting that auth service `, err.message);
      next(err);
    }
});

module.exports = router;