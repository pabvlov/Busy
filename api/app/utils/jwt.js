const jwt = require('jsonwebtoken')
require('dotenv').config()

const generarJWT = ( rut, nombres, apellidos, foto, mail ) => {
    const payload = { rut, nombres, apellidos, foto, mail };

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
    const { rut, nombres, apellidos, foto, mail } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    return { rut, nombres, apellidos, foto, mail }
}
module.exports = {
    generarJWT,
    validarJWT
}