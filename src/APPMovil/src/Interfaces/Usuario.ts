import { ImageRequestFormData } from "./DOMInterfaces";

export interface EstatusUsuario {
    estatus: string
}

export interface Usuario {
    id: string;
    nombre: string;
    apellidos: string;
    telefono?: string;
    avatarUrl?: string;
    userName?: string;
    email: string;
    password?: string;
    calle?: string;
    codigoPostal?: string;
    coloniaFraccionamiento?: string;
    descripcion?: string;
    estado?: string;
    estatus: string;
    fechaHoraRegistro: Date;
    municipio?: string;
    numExterior?: number;
    numInterior?: number;
    rol: number;
    rolNombre: string;
    foto?: any;
}


export interface RegisterUser {
    Nombre: string;
    Apellidos: string;
    Telefono: string;
    Rol: number;
    Email: string;
    Password: string;
    Foto?: ImageRequestFormData
}
