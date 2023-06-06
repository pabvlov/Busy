import { User } from "./user";

export interface Service {
    id:          number;
    foto:        string;
    user:        User;
    precio:      number;
    titulo:      string;
    descripcion: string;
    rut_usuario: number;
}
