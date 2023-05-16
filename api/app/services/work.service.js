const db = require('./db');
const helper = require('../../config/helper.js');

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

module.exports = {
  uploadWork
}