
export interface Applier {
    id:                number;
    trabajo:           Trabajo;
    empleador:         Empleador;
    id_estado:         number;
    fecha_publicacion: Date;
}

export interface Empleador {
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
    ubicacion:                  string;
    descripcion:                string;
    postulantes:                Empleador[];
    rut_empleador:              number;
    cantidad_personas:          string;
    fecha_publicacion:          Date;
    fecha_finalizacion:         Date;
    trabajo_realizado_propio:   TrabajoRealizadoPropio;
    fecha_seleccion_postulante: Date;
}

export interface TrabajoRealizadoPropio {
    id:                      number;
    evidencia:               string;
    id_trabajo:              number;
    fecha_termino:           Date;
    id_trabajador:           number;
    comentario_empleador:    string;
    comentario_trabajador:   string;
    calificacion_empleador:  null;
    calificacion_trabajador: number;
}