import { ImagePickerResponse } from "react-native-image-picker";
import { ImageRequestFormData, KeyValue } from "../Interfaces/DOMInterfaces";
import { LoginResponse } from "../Interfaces/DataResponse";
import { CategoriaServicio } from "../Interfaces/Servicio";
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