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
    roles: string[]
    rolNombre: string;
    foto?: any;
    token: string
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


export interface UpdateUser {
    nombre: string;
    apellidos: string;
    telefono: string;
    calle: string
    rol: number;
    coloniaFraccionamiento: string
    codigoPostal: string
    numExterior: number
    numInterior: number
    municipio: string
    estado: string
    descripcion: string
    email: string;
    password: string;
    foto?: ImageRequestFormData
}
