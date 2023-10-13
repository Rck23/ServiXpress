import { alertStr } from "../Constants/Values";
import { AlertModalProps } from "../Interfaces/DOMInterfaces";
import { ResultData } from "../Interfaces/DataResponse"

/**
 * Manejar los errores provocados por exenciones al ejecutar peticiones http o errores internos de la app
 * @param error 
 * @returns 
 */
export const HandleException = async (error: any): Promise<ResultData> => {
    return typeof error === 'string' ? GenerateErrorMessage(1, error)
        : error.message && error.message?.includes('Network')
            ? await GenerateErrorMessage(10, {})
            : error.response && error.response?.data && error.response?.data?.statusCode
                ? await GenerateErrorMessage(error.response.data.statusCode, error.response.data)
                : error.status && error.message
                    ? await GenerateErrorMessage(502, error)
                    : await GenerateErrorMessage(error.response?.status ?? 100, error.message ?? error)
}




/**
 * Método para generar un mensaje de alerta cuando un error sucede en peticiones http o errores internos de la app
 * @param statusCode 
 * @param response 
 * @returns ResultData [mensaje, status, titulo]
 */
export const GenerateErrorMessage = async (statusCode: number, response: any, icon?: 'success' | 'error' | 'info' | 'warning'): Promise<ResultData> => {
    var responseMessage: string;
    switch (statusCode) {
        case 10:
            return { ok: false, title: alertStr.lostConn.title, message: alertStr.lostConn.message, icon: 'error' }
        case 503:
        case 502:
        case 500:
            return { ok: false, message: alertStr.response500.message, title: alertStr.response500.title, icon: 'error' }
        case 400:
        case 404:
            return { ok: false, message: alertStr.response400.message, title: alertStr.response400.title, icon: 'warning' }
        case 401:
            return { ok: false, message: alertStr.response401.message, title: alertStr.response401.title, icon: 'warning' }
        case 300:
            return { ok: false, message: response.data?.message ?? response.message, title: response.data?.title ?? response.title, icon: 'info' }
        case 0:
            return { ok: false, message: response.message, title: response.title, icon: icon ?? 'info' }
        case 1:
            return { ok: false, message: response, title: alertStr.internalError.title, icon: icon ?? 'error' }
        default:
            responseMessage = response.data?.errors ? response.data?.errors?.id[0] : response.data?.message ?? alertStr.internalError.message
            return { ok: false, message: responseMessage, title: alertStr.internalError.title, icon: 'error' }
    }
}


export const ShootAlertOnResult = (result: ResultData, CloseEvent: () => void): AlertModalProps => {
    return {
        icon: result.icon,
        message: result.message,
        title: result.title ?? '',
        OnHideAlert: CloseEvent,
        visible: true
    }
}


export const ShootAlert = (title: string, message?: string, icon?: 'success' | 'error' | 'info' | 'warning' | 'question', closeEvent?: () => void, confirmEvent?: () => void): AlertModalProps => {
    return {
        icon: icon ?? 'info',
        message,
        title,
        OnHideAlert: closeEvent,
        OnConfirmAction: confirmEvent,
        visible: true
    }
}


export const GetResponseDataFromConstants = (ok: boolean, constant: any, icon?: 'success' | 'error' | 'info' | 'warning' | 'question'): ResultData => {
    return {
        ok,
        message: constant.message,
        title: constant.title,
        icon: icon ?? (ok ? 'success' : 'error')
    }
}
