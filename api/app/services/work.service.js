const db = require('./db');
const helper = require('../../config/helper.js');
const { async } = require('rxjs');
const { get } = require('../routes/auth.routes');
const e = require('express');

async function getWorks() {
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
WHERE t.id NOT IN (
    SELECT DISTINCT p.id_trabajo
    FROM postulaciones p
    WHERE p.id_estado = 1
)
GROUP BY t.id
ORDER BY t.fecha_publicacion DESC;`);
}

async function getWorksByRut(rut) {
  return db.query(`SELECT * FROM trabajos WHERE rut_empleador = ${rut};`);
}

async function getWorkById(id) {
  return await db.query(`SELECT * FROM trabajos WHERE id = ${id};`);
}

async function uploadWork(work) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  let day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  let selectedDate = new Date(work.selectionDate);
  let formattedSelectedDate = selectedDate.toISOString().slice(0, 19).replace('T', ' ');

  let endDate = new Date(work.endDate);
  let formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

 

  const create = db.query(`INSERT INTO  trabajos (titulo, descripcion, fecha_publicacion, rut_empleador, foto, cantidad_personas, fecha_seleccion_postulante, fecha_finalizacion, precio, ubicacion) VALUES ('${work.title}', '${work.description}', '${ formattedDate }', ${work.rut_empleador}, '${work.image}', '${work.peopleNeeded}', '${ formattedSelectedDate }', '${ formattedEndDate }', '${work.price}', '${work.ubicacion}');`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
      return err;
    })
}

async function uploadWorkEvidence(workEvidence) {

  const { evidence, file } = workEvidence;

  let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  console.log(evidence, file);
  const create = db.query(`INSERT INTO  trabajos_realizados (id_trabajo, id_trabajador, fecha_termino, comentario_trabajador, calificacion_trabajador, evidencia) VALUES (${evidence.id_trabajo}, ${evidence.rut_trabajador}, '${ currentDate }', '${evidence.comentario}', ${evidence.calificacion}, '${file}');`)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      console.error(err)
      return err;
    })
}

async function getWorkAppliers(id) {
  return await db.query(`SELECT JSON_OBJECT(
    'id', t.id,
    'foto', t.foto,
    'precio', t.precio,
    'titulo', t.titulo,
    'ubicacion', t.ubicacion,
    'descripcion', t.descripcion,
    'trabajos_realizados_totales', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', tr_all.id,
                'id_trabajo', tr_all.id_trabajo,
                'id_trabajador', tr_all.id_trabajador,
                'fecha_termino', tr_all.fecha_termino,
                'comentario_trabajador', tr_all.comentario_trabajador,
                'comentario_empleador', tr_all.comentario_empleador,
                'calificacion_empleador', tr_all.calificacion_empleador,
                'calificacion_trabajador', tr_all.calificacion_trabajador,
                'evidencia', tr_all.evidencia
            )
        )
        FROM trabajos_realizados tr_all
        WHERE tr_all.id_trabajo = t.id
    ),
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
                'fecha_publicacion', p.fecha_publicacion,
                'trabajo_realizado_propio', (
                    SELECT JSON_OBJECT(
                        'id', tr.id,
                        'id_trabajo', tr.id_trabajo,
                        'id_trabajador', tr.id_trabajador,
                        'fecha_termino', tr.fecha_termino,
                        'comentario_trabajador', tr.comentario_trabajador,
                        'comentario_empleador', tr.comentario_empleador,
                        'calificacion_empleador', tr.calificacion_empleador,
                        'calificacion_trabajador', tr.calificacion_trabajador,
                        'evidencia', tr.evidencia
                    )
                    FROM trabajos_realizados tr
                    WHERE tr.id_trabajo = t.id AND tr.id_trabajador = p.rut_trabajador
                    LIMIT 1
                )
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
) AS result
FROM trabajos t
LEFT JOIN usuario ue ON t.rut_empleador = ue.rut
WHERE t.id = ${id}
GROUP BY t.id;`);
}

function applyWork(id_trabajo, rut_trabajador) {
  //db.query(`ALTER TABLE postulaciones DROP COLUMN fecha_publicacion;`)
  //db.query(`ALTER TABLE postulaciones ADD fecha_publicacion date;`)
  // check if already applied
  if (!alreadyApplied(id_trabajo, rut_trabajador)) {

    // check if is himself
    if (!checkHimself(id_trabajo, rut_trabajador)) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      let day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const create = db.query(`INSERT INTO postulaciones (id_trabajo, rut_trabajador, id_estado, fecha_publicacion) VALUES (${id_trabajo}, ${rut_trabajador}, 3 , '${ formattedDate }');`)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.error(err)
        })
    } else return false
  }

}

function applyWork(id_trabajo, rut_trabajador) {
  //db.query(`ALTER TABLE postulaciones DROP COLUMN fecha_publicacion;`)
  //db.query(`ALTER TABLE postulaciones ADD fecha_publicacion date;`)
  // check if already applied
  if (!alreadyApplied(id_trabajo, rut_trabajador)) {
    // check if is himself
    if (!checkHimself(id_trabajo, rut_trabajador)) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      let day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const create = db.query(`INSERT INTO postulaciones (id_trabajo, rut_trabajador, id_estado, fecha_publicacion) VALUES (${id_trabajo}, ${rut_trabajador}, 3 , '${ formattedDate }');`)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.error(err)
        })
    } else return false
  }

}

function chooseApplier(id_trabajo, rut_trabajador, state) {
    return db.query(`UPDATE postulaciones SET id_estado = ${state} WHERE id_trabajo = ${id_trabajo} and rut_trabajador = ${rut_trabajador};`)
}

function alreadyApplied(id_trabajo, rut_trabajador) {
  const query = db.query(`SELECT * FROM postulaciones WHERE id_trabajo = ${id_trabajo} and rut_trabajador = ${rut_trabajador}`)
    .then((rows) => {
      console.log(rows);
      if (rows.length > 0) {
        return true;
      } else {
        return false;
      }
    })
}

function alreadyEvidenced(id_trabajo, rut_trabajador) {
  return new Promise((resolve, reject) => {
    const query = db.query(`SELECT * FROM trabajos_realizados WHERE id_trabajo = ${id_trabajo} and id_trabajador = ${rut_trabajador}`)
      .then((rows) => {
        console.log(rows);
        if (rows.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

function checkHimself(id_trabajo, rut_trabajador) {
  const query = db.query(`SELECT * FROM trabajos WHERE id = ${id_trabajo}`)
    .then((rows) => {
      console.log(rows);
      if (rows.length > 0) {
        //console.log(rows[0].rut_empleador != rut_trabajador)
        return rows[0].rut_empleador != rut_trabajador;
      }
    })
}

function deleteWork(id) {
  const postulaciones = db.query(`DELETE FROM postulaciones WHERE id_trabajo = ${id}`)
  console.log(postulaciones);
  if (postulaciones) {
    const trabajos = db.query(`DELETE FROM trabajos WHERE id = ${id}`)
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
  deleteWork,
  chooseApplier,
  uploadWorkEvidence,
  alreadyEvidenced
}