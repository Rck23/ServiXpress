export interface Usuario {
    // Id: string;
    Nombre?: string | null;
    Apellidos?: string | null;
    Telefono?: string | null;
    AvatarUrl?: string | null;
    UserName?: string | null;
    NormalizedUserName?: string | null;
    Email?: string | null;
    NormalizedEmail?: string | null;
    EmailConfirmed?: boolean;
    Password?: string | null;
    SecurityStamp?: string | null;
    ConcurrencyStamp?: string | null;
    PhoneNumber?: string | null;
    PhoneNumberConfirmed?: boolean;
    TwoFactorEnabled?: boolean;
    LockoutEnd?: Date | null;
    LockoutEnabled?: boolean;
    AccessFailedCount?: number;
    Calle?: string | null;
    CodigoPostal?: string | null;
    ColoniaFraccionamiento?: string | null;
    Descripcion?: string | null;
    Estado?: string | null;
    Estatus?: string | null;
    FechaHoraRegistro?: Date | null;
    Municipio?: string | null;
    NumExterior?: number | null;
    NumInterior?: number | null;
    Rol: number;
    Foto?: any
}
