const jwt = require('jsonwebtoken')
require('dotenv').config()

const generarJWT = ( uid, name, foto ) => {
    const payload = { uid, name, foto };

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
    const { uid, name, foto } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    return { uid, name, foto }
}
module.exports = {
    generarJWT,
    validarJWT
}