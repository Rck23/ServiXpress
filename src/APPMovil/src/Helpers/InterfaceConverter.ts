import { ImagePickerResponse } from "react-native-image-picker";
import { ImageRequestFormData, KeyValue } from "../Interfaces/DOMInterfaces";
import { LoginResponse } from "../Interfaces/DataResponse";
import { CategoriaServicio } from "../Interfaces/Servicio";
import { Usuario } from "../Interfaces/Usuario";

export const ConvertLoginResponseToUser = (data: LoginResponse): Usuario => {
    return {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellidos,
        avatarUrl: data.avatar,
        telefono: data.telefono,
        estatus: '',
        fechaHoraRegistro: new Date(),
        email: data.email,
        rolNombre: data.roles?.length > 0 ? data.roles[0] : '',
        rol: 1
    }
}


export const ConvertLoginResponseToUserList = (data: LoginResponse[]): Usuario[] => {
    const result: Usuario[] = []
    data.forEach(item => {
        result.push({
            id: item.id,
            nombre: item.nombre,
            apellidos: item.apellidos,
            avatarUrl: item.avatar,
            telefono: item.telefono,
            rolNombre: item.roles[0] ?? '',
            email: item.email,
            estatus: '',
            fechaHoraRegistro: new Date(),
            rol: 0
        })
    })

    return result
}


export const ConvertToKeyValueList = (inputList: CategoriaServicio[]): KeyValue[] => {
    const outputList = inputList.map(item => {
        return {
            key: item.id?.toString(),
            value: item.id?.toString(),
            name: item.nombre
        }
    })

    return outputList
}


export const ConvertImgPickerToImageRequest = (inputImage?: ImagePickerResponse): ImageRequestFormData => {
    if (inputImage && inputImage.assets)
        return {
            uri: inputImage.assets[0].uri ?? '',
            type: inputImage.assets[0].type ?? '',
            name: inputImage.assets[0].fileName ?? ''
        }

    return {
        uri: '',
        type: '',
        name: ''
    }
}