const db = require('./db');

async function getUsers(){
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos FROM usuario u;`);
}

async function getUserByRut(rut, dv = -1) {
    if(dv === -1) return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos, foto, direccion, esAdmin, fecha_nacimiento, fecha_registro, ultima_visita, aprobado FROM usuario u WHERE u.rut = "${ rut }" LIMIT 1;`)
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos, foto, direccion, esAdmin, fecha_nacimiento, fecha_registro, ultima_visita, aprobado FROM usuario u WHERE u.rut = "${ rut }" AND u.dv = "${ dv }" LIMIT 1;`)
}

async function uploadImage(imgName, rut) {
    return await db.query(`UPDATE usuario SET foto = "${ imgName }" WHERE rut = "${ rut }"`)
}

async function getImage(rut) {
    return await db.query(`SELECT foto FROM usuario WHERE rut = "${ rut }"`)
}

async function updateUser(user) {
    
    const rut = user.rut.split('-')[0]
    const dv = user.rut.split('-')[1]
    return await db.query(`UPDATE usuario SET mail = "${ user.mail }", nombres = "${ user.nombres }", apellidos = "${ user.apellidos }", direccion = "${ user.direccion }", fecha_nacimiento = "${ user.fecha_nacimiento }" WHERE rut = "${ rut }"`)
}


module.exports = {
    getUsers,
    getUserByRut,
    uploadImage,
    getImage,
    updateUser,
}