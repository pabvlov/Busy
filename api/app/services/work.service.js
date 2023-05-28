const db = require('./db');
const helper = require('../../config/helper.js');
const { async } = require('rxjs');
const { get } = require('../routes/auth.routes');
const e = require('express');

async function getWorks(){
  return await db.query(`SELECT * FROM trabajos;`);
} 

async function getWorksByRut(rut){
  return db.query(`SELECT * FROM trabajos WHERE rut_empleador = ${ rut };`);
}

async function getWorkById(id){
  return await db.query(`SELECT * FROM trabajos WHERE id = ${ id };`);
}

async function uploadWork(work) {

    const create = db.query(`INSERT INTO  trabajos (titulo, descripcion, fecha_publicacion, rut_empleador, foto, cantidad_personas, fecha_seleccion_postulante, fecha_finalizacion, precio) VALUES ('${ work.title }', '${ work.description }', '${ new Date().toISOString() }', ${ work.rut_empleador }, '${ work.image }', '${ work.peopleNeeded }', '${ work.selectionDate }', '${ work.endDate }', '${ work.price }');`)
    .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err)
        return err;
      })
}

async function getWorkAppliers(id){
  return await db.query(`SELECT u.rut, u.foto, u.nombres, u.apellidos, u.direccion, pos.fecha_publicacion FROM postulaciones pos join usuario u on pos.rut_trabajador = u.rut  WHERE pos.id_trabajo = ${ id }`);
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

module.exports = {
  uploadWork,
  getWorks,
  getWorksByRut,
  getWorkById,
  getWorkAppliers,
  applyWork,
  alreadyApplied,
  checkHimself
}