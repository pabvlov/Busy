const db = require('./db');
const helper = require('../../config/helper.js');
const config = require('../../config/db.config');

async function validateLogin(mail, password){
  const login = await db.query(`SELECT id, nombre, contrasena, foto FROM usuario where correo = '${ mail }' and contrasena = '${ password }'`);
  return login;
}

async function validateApodo(apodo){
  const nickname = await db.query(`SELECT apodo FROM usuario where apodo = '${ apodo }'`);
  if(nickname.length > 0) {
    if(nickname[0].apodo === apodo) return true;
    else return false;
  }
  
}

async function createUser(mail, name, nickname, password){
  const create = db.query(`INSERT INTO usuario (id, nombre, apodo, correo, contrasena, firma, ubicacion, foto, fecha_registro, ultima_visita, id_pais_fk) VALUES (NULL, '${ name }', '${ nickname }', '${ mail }', '${ password }', NULL, NULL, 'https://i.giphy.com/media/3oEduLzte7jSNmq4z6/giphy.webp', NOW(), NOW(), '1');`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
      return false;
    })
}

module.exports = {
  validateLogin,
  validateApodo,
  createUser
}