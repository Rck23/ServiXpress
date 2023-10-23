import { LoginResponse } from "../Interfaces/DataResponse";
import { Usuario } from "../Interfaces/Usuario";

export const ConvertLoginResponseToUser = (data: LoginResponse): Usuario => {
    return {
        Id: data.id,
        Nombre: data.nombre,
        Apellidos: data.apellidos,
        AvatarUrl: data.avatar,
        Telefono: data.telefono,
        Estatus: '',
        FechaHoraRegistro: new Date(),
        Email: data.email,
        RolNombre: data.roles?.length > 0 ? data.roles[0] : '',
        Rol: 1
    }
}