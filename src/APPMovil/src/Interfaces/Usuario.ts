export interface EstatusUsuario {
    estatus: string
}

export interface Usuario {
    Id: string;
    Nombre: string;
    Apellidos: string;
    Telefono?: string | null;
    AvatarUrl?: string | null;
    UserName?: string | null;
    Email: string;
    Password?: string;
    Calle?: string | null;
    CodigoPostal?: string | null;
    ColoniaFraccionamiento?: string | null;
    Descripcion?: string | null;
    Estado?: string | null;
    Estatus: string;
    FechaHoraRegistro: Date;
    Municipio?: string | null;
    NumExterior?: number | null;
    NumInterior?: number | null;
    Rol: number;
    RolNombre: string;
    Foto?: any
}
