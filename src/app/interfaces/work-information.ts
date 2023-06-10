import { Applier } from "./applier";
import { Jobs } from "./jobs";
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
}
