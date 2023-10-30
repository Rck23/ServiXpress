import { Usuario } from "./Usuario";

export interface Servicio {
    id: number;
    estado: string;
    municipio: string;
    telefonos: string;
    correos: string;
    otrosMediosContacto: string;
    descripcion: string;
    ubicacionMaps: string;
    precio: number;
    fechaHoraRegistro: Date;
    fechaVencimiento?: Date | null;
    usuarioId: string;
    usuario: Usuario;
    categoriaId: number;
    categoriaServicio: CategoriaServicio;
    tipo: string;
    tipoServicio: string;
}


export interface CategoriaServicio {
    id: number
    nombre: string
    fechaHoraRegistro?: Date
}

export interface TipoServicio {
    tipo: string
}

export interface ServiceCreate {
    estado: string;
    municipio: string;
    telefonos: string;
    correos: string;
    otrosMediosContacto: string;
    descripcion: string;
    precio: number;
    usuarioId: string;
    categoriaId: number;
    tipo: string;
}