export interface User {
    rut:              number;
    dv:               number;
    mail:             string;
    nombres:          string;
    apellidos:        string;
    foto:             string;
    direccion:        string | null;
    esAdmin?:          number;
    fecha_nacimiento?: Date | null;
    fecha_registro?:   Date;
    ultima_visita?:    Date;
    aprobado?:        Aprobado;
    ubicacion?:       Ubicacion;
}

export interface Ubicacion {
    lng?: number;
    lat?: number;
    direccion: string;
}

export interface Aprobado {
    type: string;
    data: number[];
}
