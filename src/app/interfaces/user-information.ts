export interface UserInformation {
    usuario:       Usuario;
    trabajos:      Trabajo[];
    servicios:     Servicio[];
    postulaciones: Postulaciones[];
}

export interface Postulaciones {
    id:                number;
    trabajo:           Trabajo;
    empleador:         Usuario;
    id_estado:         number;
    fecha_publicacion: Date;
}

export interface Usuario {
    dv:               number;
    rut:              number;
    foto:             string;
    mail:             string;
    nombres:          string;
    apellidos:        string;
    direccion:        null | string;
    ultima_visita:    Date;
    fecha_registro:   Date;
    fecha_nacimiento: Date | null;
}

export interface Trabajo {
    id:                         number;
    foto:                       string;
    precio:                     string;
    titulo:                     string;
    ubicacion:                  null | string;
    descripcion:                string;
    postulantes:                Postulante[] | null;
    rut_empleador:              number;
    cantidad_personas:          string;
    fecha_publicacion:          Date;
    fecha_finalizacion:         Date;
    fecha_seleccion_postulante: Date;
}

export interface Postulante {
    rut_trabajador:     number;
    estado_postulacion: number;
    trabajador:        Usuario;
}

export interface Servicio {
    id:          number;
    foto:        string;
    precio:      number;
    titulo:      string;
    descripcion: string;
}

