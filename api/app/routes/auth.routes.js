const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service.js');
const user = require('../services/user.service.js');
const { generarJWT, validarJWT } = require('../utils/jwt');

router.post('/auth/login', async function(req, res, next) {
    try {
      const { rut, password } = req.body;
      const rows = await auth.validateLogin(rut, password)
      console.log(rows);
      let count = 0;
      for(var row in rows.content) count++;
      if(count === 1) {
        if (!rows.ok) {
          return res.status(401).json({
            ok: false,
            message: 'Hubo un error',
          })
        }
        // destructuring
        const userInfo = rows.content[0].result;
        // regenerar jwt con datos nuevos
        const token = await generarJWT( userInfo )
        return res.status(202).json({
            ok: true,
            content: {
              user: userInfo,
              token
            },
        })
      } else {
        return res.status(401).json({
          ok: false,
          message: "Usuario no existe o contraseña incorrecta"
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
        message: 'Error en el token: ' + res
      })

      try {
        const userInfo = validarJWT(token)
        console.log(userInfo);
        return res.status(201).json({
          ok: true,
          content: {
            user: userInfo,
            token
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

router.post('/auth/regenerate', async function(req, res, next) {
  try {
    const { token } = req.body
    if(!token) res.status(200).json({
      ok: false,
      message: 'No existe token'
    })
    try {
      const userInfo = validarJWT(token)
      const rows = await user.getUserByRut(userInfo.user.rut)
      if(rows.length > 0) {
        if (!rows[0].result) {
          return res.status(401).json({
            ok: false,
            message: 'Hubo un error',
          })
        } else {
          const userInfoNew = rows[0].result;
          console.log(rows[0].result);
          // regenerar jwt con datos nuevos
          const token = await generarJWT( userInfoNew )
          return res.status(202).json({
              ok: true,
              content: {
                user: rows[0].result,
                token
              }
          })
        }
      } else {
        return res.status(400).json({
          ok: false,
          message: "No existe un usuario con ese rut"
        })
      }
    } catch (error) {
      console.log(error);
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