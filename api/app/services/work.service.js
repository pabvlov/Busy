const db = require('./db');
const helper = require('../../config/helper.js');

async function uploadWork(work) {
    const create = db.query(`INSERT INTO  trabajo (titulo, descripcion, fecha_publicacion, fecha_modificacion, rut_empleador, foto, cantidad_personas, fecha_seleccion_postulantes) 
                                        VALUES 
                                            ('${ work.titulo }', '${ work.descripcion }', NOW(), NOW(), '${ work.rut_empleador }');`)
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