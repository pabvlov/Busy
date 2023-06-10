import { Postulaciones } from "./postulaciones";
import { User } from "./user";

export interface Jobs {
    id:                         number;
    foto:                       string;
    precio:                     string | null;
    titulo:                     string;
    ubicacion:                  string | null;
    descripcion:                string;
    postulaciones:              Postulaciones[] | null;
    rut_empleador:              number;
    cantidad_personas:          string;
    fecha_publicacion:          Date;
    fecha_finalizacion:         Date;
    fecha_seleccion_postulante: Date;
}
