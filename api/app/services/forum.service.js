const db = require('./db');

async function getMultiple(){
  const category = await db.query(`SELECT * FROM foro`);
  return category;
}

async function getById(id){
    const category = await db.query(`SELECT * FROM foro WHERE id = ${id}`);
    return category;
}

async function borrar(id) {
  return await db.query(`UPDATE foro SET activo = 0 WHERE id = ${id}`);
}

async function editar(id, nombre, descripcion, foto, id_categoria) {
  return await db.query(`UPDATE foro SET nombre = "${nombre}", descripcion = "${descripcion}", foto = "${foto}", id_categoria_fk = ${id_categoria} WHERE id = ${id}`);
}

async function crear(nombre, descripcion, foto, id_categoria) {
  return await db.query(`INSERT INTO foro (id, nombre, descripcion, foto, id_categoria_fk, activo) VALUES (NULL, "${nombre}", "${descripcion}", "${foto}", ${id_categoria}, 1)`);
}

module.exports = {
  getMultiple,
  getById,
  borrar, 
  editar,
  crear
}