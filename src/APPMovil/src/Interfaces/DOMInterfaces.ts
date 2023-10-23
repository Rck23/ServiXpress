import { AlertIcons } from "../Constants/Properties"
import { CategoriaServicio } from "./Servicio"

export interface AlertModalProps {
    title: string
    message?: string
    icon: AlertIcons
    visible?: boolean
    data?: any
    OnHideAlert?: (params?: any) => void
    OnConfirmAction?: (params?: any) => void
}


export interface TipoServicioModalProps {
    visible?: boolean
    categoriesList: CategoriaServicio[]
    OnHideModal?: (category?: CategoriaServicio, params?: any) => void
}