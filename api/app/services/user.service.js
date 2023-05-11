const db = require('./db');

async function getUsers(){
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos FROM usuario u;`);
}

async function getUserByRut(rut, dv = -1) {
    if(dv === -1) return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos, foto, direccion, esAdmin, fecha_nacimiento, fecha_registro, ultima_visita, aprobado FROM usuario u WHERE u.rut = "${ rut }";`)
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos, foto, direccion, esAdmin, fecha_nacimiento, fecha_registro, ultima_visita, aprobado FROM usuario u WHERE u.rut = "${ rut }" AND u.dv = "${ dv }";`)
}

async function uploadImage(imgName, rut) {
    return await db.query(`UPDATE usuario SET foto = "${ imgName }" WHERE rut = "${ rut }"`)
}

async function getImage(rut) {
    return await db.query(`SELECT foto FROM usuario WHERE rut = "${ rut }"`)
}

module.exports = {
    getUsers,
    getUserByRut,
    uploadImage,
    getImage
}