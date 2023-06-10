import { User } from "./user";

export interface Postulaciones {
    id:                number;
    user:              User;
    id_estado:         number;
    id_trabajo:        number;
    rut_trabajador:    number;
    fecha_publicacion: Date;
}
