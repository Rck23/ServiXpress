import { ResultData } from "../Interfaces/DataResponse";
import { ServiceCreate } from "../Interfaces/Servicio";
import { RegisterUser } from "../Interfaces/Usuario";
import { StrIsNullOrEmpty } from "./GlobalFunctions";


export const ValidateUpdateUserForm = (userData: RegisterUser): ResultData => {
    const result: ResultData = { icon: 'warning', ok: false, title: 'Ingrese la información correctamente.' }

    if (StrIsNullOrEmpty(userData.Nombre))
        return { ...result, message: "Debe ingresar su nombre(s)" }
    if (StrIsNullOrEmpty(userData.Apellidos))
        return { ...result, message: "Debe ingresar sus apellidos" }
    if (StrIsNullOrEmpty(userData.Telefono))
        return { ...result, message: "Debe ingresar un número de teléfono" }
    if (StrIsNullOrEmpty(userData.Email))
        return { ...result, message: "Debe ingresar un correo electrónico" }
    if (userData.Rol == null || userData.Rol == undefined)
        return { ...result, message: "Debe seleccionar una opción de uso de la aplicación" }

    return { ...result, ok: true }
}

export const ValidateRegisterUserForm = (userData: RegisterUser): ResultData => {
    const result: ResultData = { icon: 'warning', ok: false, title: 'Por favor complete la información faltante' }

    if (StrIsNullOrEmpty(userData.Nombre))
        return { ...result, message: "Debe ingresar su nombre(s)" }
    if (StrIsNullOrEmpty(userData.Apellidos))
        return { ...result, message: "Debe ingresar sus apellidos" }
    if (StrIsNullOrEmpty(userData.Telefono))
        return { ...result, message: "Debe ingresar un número de teléfono" }
    if (StrIsNullOrEmpty(userData.Email))
        return { ...result, message: "Debe ingresar un correo electrónico" }
    if (StrIsNullOrEmpty(userData.Password))
        return { ...result, message: "Debe ingresar una contraseña segura" }
    if (userData.Rol == null || userData.Rol == undefined)
        return { ...result, message: "Debe seleccionar una opción de uso de la aplicación" }

    return { ...result, ok: true }
}



export const ValidateRegisterServiceForm = (service: ServiceCreate): ResultData => {
    const result: ResultData = { icon: 'warning', ok: false, title: 'Por favor complete la información faltante' }

    if (StrIsNullOrEmpty(service.descripcion))
        return { ...result, message: "Debe ingresar una descripción para el servicio." }
    if (StrIsNullOrEmpty(service.estado))
        return { ...result, message: "Debe ingresar el estado en donde se oferta/requiere el servicio." }
    if (StrIsNullOrEmpty(service.telefonos))
        return { ...result, message: "Debe ingresar al menos un número de teléfono de contacto." }
    // if (StrIsNullOrEmpty(service.correos))
    //     return { ...result, message: "Debe ingresar un correo electrónico" }
    if (StrIsNullOrEmpty(service.municipio))
        return { ...result, message: "Debe ingresar el municipio donde se oferta/requiere el servicio." }
    if (service.categoriaId == null || service.categoriaId == 0)
        return { ...result, message: "Debe seleccionar una categoría para el servicio." }

    return { ...result, ok: true }
}