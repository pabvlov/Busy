const db = require('./db');

async function getAll(){
  return await db.query(`SELECT r.* FROM reaccion r;`);
}

async function getAllByTopic(id_topic) {
  return await db.query(`SELECT ttr.id_reaccion_fk as id_reaccion, r.reaccion, (SELECT COUNT(*) from tema_tiene_reacciones tt 
  WHERE tt.id_reaccion_fk = r.id AND tt.id_tema_fk = ${ id_topic }) as count
       FROM tema_tiene_reacciones ttr 
       INNER JOIN reaccion r on r.id = ttr.id_reaccion_fk
       INNER JOIN tema t on t.id = ttr.id_tema_fk
       WHERE ttr.id_tema_fk = ${ id_topic }
       GROUP BY ttr.id_reaccion_fk;`);
}

async function getById(id){
  const category = await db.query(`SELECT e.id, e.reaccion
                                    FROM emoji e
                                    WHERE e.id = ${id}`);
  return category;
}

async function add(reaccion) {
  return db.query(`INSERT INTO reaccion (id, reaccion) VALUES (NULL, '${ reaccion }');`)
}

async function addToTopic(id_tema, id_user, id_reaccion) {
  return db.query(`INSERT INTO tema_tiene_reacciones (id_tema_tiene_reacciones, id_usuario_fk, id_tema_fk, id_reaccion_fk) 
                                              VALUES (NULL, ${ id_user }, ${ id_tema }, ${ id_reaccion });`)
}

async function addToThread(id_hilo, id_user, id_reaccion) {
  return db.query(`INSERT INTO hilo_tiene_reacciones (id_hilo_tiene_reacciones, id_usuario_fk, id_hilo_fk, id_reaccion_fk) 
                                              VALUES (NULL, ${ id_user }, ${ id_hilo }, ${ id_reaccion });`)
}

module.exports = {
  getAll,
  getAllByTopic,
  getById,
  add,
  addToTopic,
  addToThread
}