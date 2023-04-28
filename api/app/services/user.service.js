const db = require('./db');
const helper = require('../../config/helper.js');
const config = require('../../config/db.config');

async function getMultiple(){
  //const offset = helper.getOffset(page, config.listPerPage);
  const users = await db.query(`SELECT * FROM usuario`);
  return users;
}

async function getById(id){
  const category = await db.query(`SELECT u.id, u.nombre, u.apodo, u.correo, u.firma, u.ubicacion, u.foto, u.fecha_registro, u.ultima_visita,
                                    p.pais
                                    FROM usuario u
                                    INNER JOIN pais p ON u.id_pais_fk = p.id
                                    WHERE U.id = ${id}`);
  return category;
}

module.exports = {
  getMultiple,
  getById,
}