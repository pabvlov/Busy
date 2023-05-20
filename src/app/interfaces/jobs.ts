export interface Jobs {
    id:                         number;
    rut_empleador:              number;
    titulo:                     string;
    descripcion:                string;
    foto:                       string;
    cantidad_personas:          string;
    ubicacion:                  null;
    fecha_publicacion:          Date;
    fecha_seleccion_postulante: Date;
    fecha_finalizacion:         Date;
    precio:                     null | string;
}
