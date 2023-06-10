const db = require('./db');
const helper = require('../../config/helper.js');
const { async } = require('rxjs');
const { get } = require('../routes/auth.routes');
const e = require('express');

async function getWorks(){
  return await db.query(`SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'id', t.id,
        'foto', t.foto,
        'precio', t.precio,
        'titulo', t.titulo,
        'ubicacion', t.ubicacion,
        'descripcion', t.descripcion,
        'postulaciones', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', p.id,
                    'user', JSON_OBJECT(
                        'dv', u.dv,
                        'rut', u.rut,
                        'foto', u.foto,
                        'mail', u.mail,
                        'nombres', u.nombres,
                        'apellidos', u.apellidos,
                        'direccion', u.direccion,
                        'ultima_visita', u.ultima_visita,
                        'fecha_registro', u.fecha_registro,
                        'fecha_nacimiento', u.fecha_nacimiento
                    ),
                    'id_estado', p.id_estado,
                    'id_trabajo', p.id_trabajo,
                    'rut_trabajador', p.rut_trabajador,
                    'fecha_publicacion', p.fecha_publicacion
                )
            )
            FROM postulaciones p
            INNER JOIN usuario u ON p.rut_trabajador = u.rut
            WHERE p.id_trabajo = t.id
        ),
        'rut_empleador', t.rut_empleador,
        'cantidad_personas', t.cantidad_personas,
        'fecha_publicacion', t.fecha_publicacion,
        'fecha_finalizacion', t.fecha_finalizacion,
        'fecha_seleccion_postulante', t.fecha_seleccion_postulante,
        'empleador', JSON_OBJECT(
          'dv', ue.dv,
          'rut', ue.rut,
          'foto', ue.foto,
          'mail', ue.mail,
          'nombres', ue.nombres,
          'apellidos', ue.apellidos,
          'direccion', ue.direccion,
          'ultima_visita', ue.ultima_visita,
          'fecha_registro', ue.fecha_registro,
          'fecha_nacimiento', ue.fecha_nacimiento
        )
    )
) AS result
FROM trabajos t
LEFT JOIN usuario ue ON t.rut_empleador = ue.rut
GROUP BY t.id
ORDER BY t.fecha_publicacion DESC;`);
} 

async function getWorksByRut(rut){
  return db.query(`SELECT * FROM trabajos WHERE rut_empleador = ${ rut };`);
}

async function getWorkById(id){
  return await db.query(`SELECT * FROM trabajos WHERE id = ${ id };`);
}

async function uploadWork(work) {

    const create = db.query(`INSERT INTO  trabajos (titulo, descripcion, fecha_publicacion, rut_empleador, foto, cantidad_personas, fecha_seleccion_postulante, fecha_finalizacion, precio, ubicacion) VALUES ('${ work.title }', '${ work.description }', '${ new Date().toISOString() }', ${ work.rut_empleador }, '${ work.image }', '${ work.peopleNeeded }', '${ work.selectionDate }', '${ work.endDate }', '${ work.price }', '${ work.ubicacion }');`)
    .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err)
        return err;
      })
}

async function getWorkAppliers(rut){
  return await db.query(`SELECT JSON_OBJECT(
    'id', t.id,
    'foto', t.foto,
    'precio', t.precio,
    'titulo', t.titulo,
    'ubicacion', t.ubicacion,
    'descripcion', t.descripcion,
    'postulaciones', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', p.id,
                'user', JSON_OBJECT(
                    'dv', u.dv,
                    'rut', u.rut,
                    'foto', u.foto,
                    'mail', u.mail,
                    'nombres', u.nombres,
                    'apellidos', u.apellidos,
                    'direccion', u.direccion,
                    'ultima_visita', u.ultima_visita,
                    'fecha_registro', u.fecha_registro,
                    'fecha_nacimiento', u.fecha_nacimiento
                ),
                'id_estado', p.id_estado,
                'id_trabajo', p.id_trabajo,
                'rut_trabajador', p.rut_trabajador,
                'fecha_publicacion', p.fecha_publicacion
            )
        )
        FROM postulaciones p
        INNER JOIN usuario u ON p.rut_trabajador = u.rut
        WHERE p.id_trabajo = ${ rut }	
    ),
    'rut_empleador', t.rut_empleador,
    'cantidad_personas', t.cantidad_personas,
    'fecha_publicacion', t.fecha_publicacion,
    'fecha_finalizacion', t.fecha_finalizacion,
    'fecha_seleccion_postulante', t.fecha_seleccion_postulante,
    'empleador', JSON_OBJECT(
        'rut_empleador', ue.rut,
        'nombre_empleador', ue.nombres,
        'apellido_empleador', ue.apellidos,
        'direccion_empleador', ue.direccion,
        'foto_empleador', ue.foto
    )
) AS result
FROM trabajos t
LEFT JOIN usuario ue ON t.rut_empleador = ue.rut
WHERE t.id = ${ rut }	
GROUP BY t.id;`);
}

function applyWork(id_trabajo, rut_trabajador) {
 //db.query(`ALTER TABLE postulaciones DROP COLUMN fecha_publicacion;`)
  //db.query(`ALTER TABLE postulaciones ADD fecha_publicacion date;`)
  const create = db.query(`INSERT INTO postulaciones (id_trabajo, rut_trabajador, id_estado, fecha_publicacion) VALUES (${ id_trabajo }, ${ rut_trabajador }, 3 , '${ new Date().toISOString() }');`)
  .then(() => {
      return true;
    })
  .catch((err) => {
    console.error(err)
  })
}

function alreadyApplied(id_trabajo, rut_trabajador){
  const query = db.query(`SELECT * FROM postulaciones WHERE id_trabajo = ${ id_trabajo }`)
  .then((rows) => {
    if (rows.length > 0 ) {
      console.log(rows[0].rut_trabajador == rut_trabajador);
      return rows[0].rut_trabajador == rut_trabajador;
    } else {
      console.log(false);
      return false;
    }
  })
}

function checkHimself(id_trabajo, rut_trabajador){
  const query = db.query(`SELECT * FROM trabajos WHERE id = ${ id_trabajo }`)
  .then((rows) => {
    if(rows.length > 0) {
      //console.log(rows[0].rut_empleador != rut_trabajador)
      return rows[0].rut_empleador != rut_trabajador;
    }
  })
}

function deleteWork(id) {
  const postulaciones = db.query(`DELETE FROM postulaciones WHERE id_trabajo = ${ id }`)
  console.log(postulaciones);
  if (postulaciones) {
    const trabajos = db.query(`DELETE FROM trabajos WHERE id = ${ id }`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
    })
  } else {
    return false;
  }
  
  
}

module.exports = {
  uploadWork,
  getWorks,
  getWorksByRut,
  getWorkById,
  getWorkAppliers,
  applyWork,
  alreadyApplied,
  checkHimself,
  deleteWork
}