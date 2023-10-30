import { AlertIcons } from "../Constants/Properties";
import { alertStr } from "../Constants/Values";
import { AlertModalProps } from "../Interfaces/DOMInterfaces";
import { ResultData } from "../Interfaces/DataResponse"

/**
 * Manejar los errores provocados por exenciones al ejecutar peticiones http o errores internos de la app
 * @param error 
 * @returns 
 */
export const HandleException = async (error: any): Promise<ResultData> => {
    return typeof error === 'string' ? TriggerErrorMessage(1, error)
        : error.message && error.message?.includes('Network')
            ? await TriggerErrorMessage(10, {})
            : error.response?.data
                ? await TriggerErrorMessage(error.response.status, error.response.data)
                : error.status && error.message
                    ? await TriggerErrorMessage(502, error)
                    : await TriggerErrorMessage(error.response?.status ?? 100, error.message ?? error)
}




/**
 * Método para generar un mensaje de alerta cuando un error sucede en peticiones http o errores internos de la app
 * @param statusCode 
 * @param response 
 * @returns ResultData [mensaje, status, titulo]
 */
export const TriggerErrorMessage = async (statusCode: number, responseData: any, icon?: AlertIcons): Promise<ResultData> => {
    var errors: object = responseData.errors ?? undefined
    var responseMessageList: string[] = responseData.message ?? []
    var responseMessage: string | undefined = responseMessage = typeof responseData == 'string'
        ? responseData : responseMessageList.length > 0
            ? responseMessageList.join('\n')
            : typeof responseData.errors == 'object' ? "ERROR" : undefined
    if (responseMessage == "ERROR") {
        var errorMsg = ''
        Object.keys(errors).forEach(key => {
            const errorKey: string = key;
            const errorValue: any = (errors as any)[key]
            const listMessages: string[] = typeof errorValue == 'object' ? errorValue : []

            errorMsg += listMessages.length == 0 ? `${errorKey}: ${errorValue}\n` : `${errorKey}: ${listMessages.join('\n')}`
        });
        responseMessage = errorMsg
    }
    switch (statusCode) {
        case 10:
            return { ok: false, title: alertStr.lostConn.title, message: alertStr.lostConn.message, icon: 'error' }
        case 503:
        case 502:
        case 500:
            return { ok: false, message: responseMessage ?? alertStr.response500.message, title: alertStr.response500.title, icon: 'error' }
        case 400:
        case 404:
            return { ok: false, message: responseMessage ?? alertStr.response400.message, title: alertStr.response400.title, icon: 'warning' }
        case 401:
            return { ok: false, message: responseMessage ?? alertStr.response401.message, title: alertStr.response401.title, icon: 'warning' }
        case 300:
            return { ok: false, message: responseMessage ?? responseData.data?.message ?? responseData.message, title: responseData.data?.title ?? responseData.title, icon: 'info' }
        case 0:
            return { ok: false, message: responseMessage ?? responseData.message, title: responseData.title, icon: icon ?? 'info' }
        case 1:
            return { ok: false, message: responseData, title: alertStr.internalError.title, icon: icon ?? 'error' }
        default:
            return { ok: false, message: responseMessage ?? alertStr.internalError.message, title: alertStr.internalError.title, icon: 'error' }
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


export const ShootAlert = (title: string, message?: string, icon?: AlertIcons, closeEvent?: () => void, confirmEvent?: () => void): AlertModalProps => {
    return {
        icon: icon ?? 'info',
        message,
        title,
        OnHideAlert: closeEvent,
        OnConfirmAction: confirmEvent,
        visible: true
    }
}


export const GetResponseDataFromConstants = (ok: boolean, constant: any, icon?: AlertIcons): ResultData => {
    return {
        ok,
        message: constant.message,
        title: constant.title,
        icon: icon ?? (ok ? 'success' : 'error')
    }
}


export const StrIsNullOrEmpty = (value: string) => {
    value = value.replace(/\s/g, '')
    return (value == "" || value == null || value.length == 0)
}
