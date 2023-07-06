import { User } from "./user";
import { TrabajoRealizado } from "./work-information";

export interface Postulaciones {
    id:                number;
    user:              User;
    id_estado:         number;
    id_trabajo:        number | null;
    rut_trabajador:    number | null;
    fecha_publicacion: Date;
    trabajo_realizado_propio: TrabajoRealizado;
}
