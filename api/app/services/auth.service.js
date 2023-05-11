const crypto = require('crypto');
const db = require('./db');
const helper = require('../../config/helper.js');

async function validateLogin(rut, password){
  const userSalt = await db.query(`SELECT salt FROM usuario where rut = '${ rut }'`);
  
  if (userSalt.length === 0) {
    return { ok: true, message: 'El usuario no existe en nuestra base de datos' }
  } else {
    const sha256Hasher = crypto.createHmac("sha256", userSalt[0].salt)
    const hash = sha256Hasher.update(password, "utf8").digest("base64")
    const login = await db.query(`SELECT rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin FROM usuario where rut = '${ rut }' and password = '${ hash }'`);
    if (login.length === 0 ) {
      return { ok: false, message: 'La contraseña es incorrecta' }
    } else return { ok: true, content: login };
  }
}

async function validateRut(rut){
  const fullname = await db.query(`SELECT nombres, apellidos FROM usuario where rut = '${ rut }'`);
  if(fullname.length > 0) {
    if(fullname[0].rut === rut) return true;
    else return false;
  }
}

async function createUser(rut, dv, mail, nombres, apellidos, password){
  const salt = helper.generateRandomString(6)
  const sha256Hasher = crypto.createHmac("sha256", salt)
  const hash = sha256Hasher.update(password, "utf8").digest("base64");

  const create = db.query(`INSERT INTO  usuario (rut, dv, mail, nombres, apellidos, password, salt, fecha_registro, ultima_visita) 
                                        VALUES 
                                            ('${ rut }', '${ dv }', '${ mail }', '${ nombres }','${ apellidos }', '${ hash }', '${ salt }', NOW(), NOW());`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
      return err;
    })
}

module.exports = {
  validateLogin,
  validateRut,
  createUser
}

/* 

{
    "rut": "20482869",
    "dv": "5",
    "nombres": "Pablo Javier",
    "apellidos": "Prieto Cepeda",
    "mail": "pablojavierprietocepeda@gmail.com",
    "password": "1q2w3e4r"
}

*/