const jwt = require('jsonwebtoken')
require('dotenv').config()

const generarJWT = ( rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin  ) => {
    const payload = { rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){ reject(err) }
            else { 
                resolve(token)
            }
        })
    })
}

const validarJWT = ( token ) => {
    return { rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin } = jwt.verify(token, process.env.SECRET_JWT_SEED)
}
module.exports = {
    generarJWT,
    validarJWT
}