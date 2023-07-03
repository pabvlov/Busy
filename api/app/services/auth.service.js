const crypto = require('crypto');
const db = require('./db');
const helper = require('../../config/helper.js');

async function validateLogin(rut, password){
  const rutt = rut.split('-')[0];
  const dv = rut.split('-')[1];
  const userSalt = await db.query(`SELECT salt FROM usuario where rut = '${ rut }'`);
  
  if (userSalt.length === 0) {
    return { ok: true, message: 'El usuario no existe en nuestra base de datos' }
  } else {
    const sha256Hasher = crypto.createHmac("sha256", userSalt[0].salt)
    const hash = sha256Hasher.update(password, "utf8").digest("base64")
    const login = await db.query(`SELECT JSON_OBJECT(
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
      'postulaciones', (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'id', p.id,
                  'id_estado', p.id_estado,
                  'fecha_publicacion', p.fecha_publicacion,
                  'trabajo', JSON_OBJECT(
                      'id', t.id,
                      'foto', t.foto,
                      'precio', t.precio,
                      'titulo', t.titulo,
                      'ubicacion', t.ubicacion,
                      'descripcion', t.descripcion,
                      'rut_empleador', t.rut_empleador,
                      'cantidad_personas', t.cantidad_personas,
                      'fecha_publicacion', t.fecha_publicacion,
                      'fecha_finalizacion', t.fecha_finalizacion,
                      'fecha_seleccion_postulante', t.fecha_seleccion_postulante,
                      'postulantes', (
                          SELECT JSON_ARRAYAGG(
                              JSON_OBJECT(
                                  'dv', up.dv,
                                  'rut', up.rut,
                                  'foto', up.foto,
                                  'mail', up.mail,
                                  'nombres', up.nombres,
                                  'apellidos', up.apellidos,
                                  'direccion', up.direccion,
                                  'ultima_visita', up.ultima_visita,
                                  'fecha_registro', up.fecha_registro,
                                  'fecha_nacimiento', up.fecha_nacimiento,
                                  'estado_postulacion', p.id_estado
                              )
                          )
                          FROM postulaciones p
                          INNER JOIN usuario up ON p.rut_trabajador = up.rut
                          WHERE p.id_trabajo = t.id
                      )
                  ),
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
          )
          FROM postulaciones p
          INNER JOIN trabajos t ON p.id_trabajo = t.id
          INNER JOIN usuario ue ON t.rut_empleador = ue.rut
          WHERE p.rut_trabajador = u.rut
      ),
      'trabajos', (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'id', t.id,
                  'foto', t.foto,
                  'precio', t.precio,
                  'titulo', t.titulo,
                  'ubicacion', t.ubicacion,
                  'descripcion', t.descripcion,
                  'rut_empleador', t.rut_empleador,
                  'cantidad_personas', t.cantidad_personas,
                  'fecha_publicacion', t.fecha_publicacion,
                  'fecha_finalizacion', t.fecha_finalizacion,
                  'fecha_seleccion_postulante', t.fecha_seleccion_postulante,
                  'postulantes', (
                      SELECT JSON_ARRAYAGG(
                          JSON_OBJECT(
                              'id_postulacion', p.id,
                              'dv', up.dv,
                              'rut', up.rut,
                              'foto', up.foto,
                              'mail', up.mail,
                              'nombres', up.nombres,
                              'apellidos', up.apellidos,
                              'direccion', up.direccion,
                              'ultima_visita', up.ultima_visita,
                              'fecha_registro', up.fecha_registro,
                              'fecha_nacimiento', up.fecha_nacimiento
                          )
                      )
                      FROM postulaciones p
                      INNER JOIN usuario up ON p.rut_trabajador = up.rut
                      WHERE p.id_trabajo = t.id
                  )
              )
          )
          FROM trabajos t
          WHERE t.rut_empleador = u.rut
      ),
      'servicios', (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'id', s.id,
                  'titulo', s.titulo,
                  'descripcion', s.descripcion,
                  'foto', s.foto,
                  'precio', s.precio
              )
          )
          FROM servicios s
          WHERE s.rut_usuario = u.rut
      )
  ) AS result
  FROM usuario u
  WHERE u.rut = ${ rutt } and u.password = '${ hash }'`);
  console.log(hash, rutt);
    if (login.length === 0 ) {
      return { ok: false, message: 'La contraseña es incorrecta' }
    } else return { ok: true, content: login };
  }
}

async function validateRut(rut){
  const fullname = await db.query(`SELECT nombres, apellidos FROM usuario where rut = '${ rut }'`);
  if(fullname.length > 0) {
    if(fullname[0].rut === rut) return true;
    else return false;
  }
}

async function createUser(rut, dv, mail, nombres, apellidos, password){
  const salt = helper.generateRandomString(6)
  const sha256Hasher = crypto.createHmac("sha256", salt)
  const hash = sha256Hasher.update(password, "utf8").digest("base64");

  const create = db.query(`INSERT INTO  usuario (rut, dv, mail, nombres, apellidos, password, salt, fecha_registro, ultima_visita) 
                                        VALUES 
                                            ('${ rut }', '${ dv }', '${ mail }', '${ nombres }','${ apellidos }', '${ hash }', '${ salt }', NOW(), NOW());`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err)
      return err;
    })
}

module.exports = {
  validateLogin,
  validateRut,
  createUser
}

/* 

{
    "rut": "20482869",
    "dv": "5",
    "nombres": "Pablo Javier",
    "apellidos": "Prieto Cepeda",
    "mail": "pablojavierprietocepeda@gmail.com",
    "password": "1q2w3e4r"
}

*/