const db = require('./db');

async function getByTopic(id){
    const category = await db.query(`SELECT t.id, t.cuerpo, t.fecha, t.id_tema_fk, t.id_usuario_fk,
                                      u.nombre as usuario, te.titulo as tema, u.foto
                                      FROM hilo t
                                      INNER JOIN usuario u ON t.id_usuario_fk = u.id
                                      INNER JOIN tema te ON t.id_tema_fk = te.id
                                      WHERE id_tema_fk = ${id} ORDER BY fecha ASC`);
    return category;
}

async function post(cuerpo, id_tema, id_usuario) {
  return db.query(`INSERT INTO hilo (id, cuerpo, fecha, id_tema_fk, id_usuario_fk) VALUES (NULL, '${ cuerpo }', NOW(), ${ id_tema }, ${ id_usuario });`)
}

module.exports = {
  getByTopic,
  post,
}