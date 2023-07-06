import { Postulaciones } from "./postulaciones";

export interface UserInformation {
    user?: UserInfo;
    trabajos?: Trabajo[];
    servicios?: Servicio[];
    postulaciones?: Postulacion[];
    trabajos_realizados_totales?: TrabajoRealizado[];
  }
  
  export interface UserInfo {
    dv: number;
    rut: number;
    foto: string;
    mail: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    ultima_visita: Date;
    fecha_registro: Date;
    fecha_nacimiento: Date;
  }
  
  export interface Trabajo {
    id: number;
    foto: string;
    precio: string;
    titulo: string;
    ubicacion: string | null;
    descripcion: string;
    postulantes: Postulante[] | null;
    rut_empleador: number;
    cantidad_personas: string;
    fecha_publicacion: Date;
    fecha_finalizacion: Date;
    trabajo_realizado_propio: TrabajoRealizado | null;
    fecha_seleccion_postulante: Date;
  }
  
  export interface Postulante {
    dv: number;
    rut: number;
    foto: string;
    mail: string;
    nombres: string;
    apellidos: string;
    direccion: string | null;
    ultima_visita: Date;
    fecha_registro: Date;
    id_postulacion: number;
    fecha_nacimiento: Date | null;
    estado_postulacion: number;
  }
  
  export interface TrabajoRealizado {
    id: number;
    evidencia: string;
    id_trabajo: number;
    fecha_termino: Date;
    id_trabajador: number;
    comentario_empleador: string;
    comentario_trabajador: string;
    calificacion_empleador: number | null;
    calificacion_trabajador: number;
  }
  
  export interface Servicio {
    id: number;
    foto: string;
    precio: number;
    titulo: string;
    descripcion: string;
  }
  
  export interface Postulacion {
    id: number;
    trabajo: TrabajoInfo;
    empleador: UserInfo;
    id_estado: number;
    fecha_publicacion: Date;
  }
  
  export interface TrabajoInfo {
    id: number;
    foto: string;
    precio: string;
    titulo: string;
    ubicacion: string | null;
    descripcion: string;
    postulantes: PostulanteInfo[];
    rut_empleador: number;
    cantidad_personas: string;
    fecha_publicacion: Date;
    fecha_finalizacion: Date;
    trabajo_realizado_propio: TrabajoRealizado | null;
    fecha_seleccion_postulante: Date;
  }
  
  export interface PostulanteInfo {
    dv: number;
    rut: number;
    foto: string;
    mail: string;
    nombres: string;
    apellidos: string;
    direccion: string | null;
    ultima_visita: Date;
    fecha_registro: Date;
    fecha_nacimiento: Date | null;
  }