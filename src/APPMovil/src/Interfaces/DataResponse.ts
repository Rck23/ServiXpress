import { AlertIcons } from "../Constants/Properties"

export interface ResultData {
    ok: boolean
    message?: string
    title?: string
    data?: any
    icon: AlertIcons
}


export interface ResponseApi {
    message?: string
    statusCode: number
    data?: any
    title?: string
}


export interface ResetPassword {
    email: string,
    token: string,
    password: string,
    confirmPassword: string
}