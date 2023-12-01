import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { ResultData } from "../../Interfaces/DataResponse"
import { HandleException } from "../../Helpers/GlobalFunctions"
import { Platform } from "react-native"
import { requestMultiple, PERMISSIONS } from "react-native-permissions"
import { alertStr } from "../../Constants/Values"

/**
 * Abre la galería del dispositivo para tomar una imagen y regresa el resultado (ResultData => data = temp uri)
 * @returns 
 */
export const TakeImageFromGallery = async (): Promise<ResultData> => {
    try {
        const result: ResultData = { ok: false, icon: 'error', title: '¡Imagen no capturada!' }
        const responseData = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }).then(response => {
            if (response.didCancel) return { ...result, ok: true }
            if (response.assets && response.assets[0].uri) {
                result.data = response
                result.ok = true
                return result
            }
            result.message = 'No se ha capturado la imagen correctamente.\nPor favor intente nuevamente.'
            return result
        }).catch(async error => {
            const errorFormatted = await HandleException(error)
            result.message = errorFormatted.message
            return result;
        })
        return responseData;
    } catch (error) {
        return await HandleException(error)
    }
}


/**
 * Metodo para almacenar las imagenes capturadas desde la camara del dispositivo
 * @returns 
 */
export const TakePhoto = async (): Promise<ResultData> => {
    var permissions = Platform.OS == 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]

    var statuses = await requestMultiple(permissions);
    var resultCamera = Platform.OS == 'ios' ? statuses['ios.permission.CAMERA'] : statuses['android.permission.CAMERA'];

    if (resultCamera.includes('denied') || resultCamera.includes('blocked'))
        return { ok: false, message: alertStr.permissionsDenied.message, title: alertStr.permissionsDenied.title, icon: 'error' }

    return await launchCamera({
        mediaType: 'photo',
        quality: 0.6,
        maxHeight: 1200,
        maxWidth: 1200,
        saveToPhotos: true
    }).then(response => {
        var result: ResultData = { ok: true, icon: 'info' }
        if (response.didCancel) return result
        else if (!response.assets) result = { ok: false, title: 'No se capturó la fotografía', message: 'No se pudo obtener la fotografía.\nIntente nuevamente.', icon: 'error' }
        else result = { ok: true, icon: 'success', data: response }
        
        return result
    }).catch(error => {
        return HandleException(error)
    })
}