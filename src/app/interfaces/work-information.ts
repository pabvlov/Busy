import { Postulaciones } from "./postulaciones";
import { User } from "./user";

export interface WorkInformation {
    id:                         number;
    foto:                       string;
    precio:                     string;
    titulo:                     string;
    empleador:                  User;
    ubicacion:                  string;
    descripcion:                string;
    postulaciones:              Postulaciones[];
    rut_empleador:              number;
    cantidad_personas:          string;
    fecha_publicacion:          Date;
    fecha_finalizacion:         Date;
    fecha_seleccion_postulante: Date;
    trabajos_realizados_totales:TrabajoRealizado[]
}

export interface TrabajoRealizado {
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