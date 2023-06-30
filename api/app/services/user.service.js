const db = require('./db');

async function getUsers(){
    return await db.query(`SELECT u.rut, u.dv, u.mail, u.nombres, u.apellidos FROM usuario u;`);
}

async function getUserByRut(rut, dv = -1) {
    if(dv === -1) return await db.query(`SELECT JSON_OBJECT(
        'usuario', JSON_OBJECT(
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
                                    'fecha_nacimiento', up.fecha_nacimiento
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
                                'fecha_nacimiento', up.fecha_nacimiento,
                                'estado_postulacion', p.id_estado
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
    WHERE u.rut = ${ rut } LIMIT 1;`)
    return await db.query(`SELECT JSON_OBJECT(
        'usuario', JSON_OBJECT(
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
    WHERE u.rut = ${ rut } and u.dv = ${ dv } LIMIT 1;`)
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