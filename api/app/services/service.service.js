const db = require('./db');

async function getServices() {
  return await db.query(`SELECT JSON_ARRAYAGG( JSON_OBJECT(
    'id', s.id, 
    'titulo', s.titulo,
    'descripcion', s.descripcion,
    'rut_usuario', s.rut_usuario,
    'foto', s.foto,
    'precio', s.precio,
    'user', JSON_OBJECT(
        'rut', u.rut, 
        'dv', u.dv, 
        'nombres', u.nombres,
        'apellidos', u.apellidos,
        'mail', u.mail,
        'direccion', u.direccion,
        'foto', u.foto,
        'fecha_nacimiento', u.fecha_nacimiento,
        'fecha_registro', u.fecha_registro,
        'ultima_visita', u.ultima_visita
         ) ) ) as 'result' FROM servicios s INNER JOIN usuario u ON s.rut_usuario = u.rut`);
}

async function getServicesByRut(rut) {
  return db.query(`SELECT * FROM servicios WHERE rut_usuario = ${rut};`);
}

async function getServiceById(id) {
  return await db.query(`SELECT * FROM servicios WHERE id = ${id};`);
}

async function uploadService(service) {

  const create = db.query(`INSERT INTO servicios (titulo, descripcion, rut_usuario, foto, precio) VALUES ('${service.titulo}', '${service.descripcion}', ${service.rut_usuario}, '${service.image}', '${service.precio}');`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
      return err;
    })
}

/* async function getHires(id){
  return await db.query(`SELECT u.rut, u.foto, u.nombres, u.apellidos, u.direccion, pos.fecha_publicacion FROM postulaciones pos join usuario u on pos.rut_trabajador = u.rut  WHERE pos.id_trabajo = ${ id }`);
} */

function applyService(id_trabajo, rut_trabajador) {
  //db.query(`ALTER TABLE postulaciones DROP COLUMN fecha_publicacion;`)
  //db.query(`ALTER TABLE postulaciones ADD fecha_publicacion date;`)
  const create = db.query(`INSERT INTO postulaciones (id_trabajo, rut_trabajador, id_estado, fecha_publicacion) VALUES (${id_trabajo}, ${rut_trabajador}, 3 , '${new Date().toISOString()}');`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
    })
}

function alreadyApplied(id_trabajo, rut_trabajador) {
  const query = db.query(`SELECT * FROM postulaciones WHERE id_trabajo = ${id_trabajo}`)
    .then((rows) => {
      if (rows.length > 0) {
        console.log(rows[0].rut_trabajador == rut_trabajador);
        return rows[0].rut_trabajador == rut_trabajador;
      } else {
        console.log(false);
        return false;
      }
    })
}

function checkHimself(id_trabajo, rut_trabajador) {
  const query = db.query(`SELECT * FROM trabajos WHERE id = ${id_trabajo}`)
    .then((rows) => {
      if (rows.length > 0) {
        //console.log(rows[0].rut_empleador != rut_trabajador)
        return rows[0].rut_empleador != rut_trabajador;
      }
    })
}

module.exports = {
  uploadService,
  getServices,
  getServicesByRut,
  getServiceById,
  applyService,
  alreadyApplied,
  checkHimself
}