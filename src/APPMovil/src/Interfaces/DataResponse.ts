export interface ResultData {
    ok: boolean
    message?: string
    title?: string
    data?: any
    icon: 'success' | 'error' | 'info' | 'warning' | 'question'
}


export interface ResponseApi {
    message?: string
    statusCode: number
    data?: any
    title?: string
}