const db = require('./db');

async function getUsers(){
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos FROM usuario u;`);
}

async function getUserByRut(rut, dv) {
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos FROM usuario u WHERE u.rut = "${ rut }" AND u.dv = "${ dv }";`)
}

module.exports = {
    getUsers,
    getUserByRut
}