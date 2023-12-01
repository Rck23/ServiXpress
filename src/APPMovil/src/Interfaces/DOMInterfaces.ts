import { AlertIcons } from "../Constants/Properties"
import { Usuario } from "./Usuario";
import { ResultData } from "./DataResponse";

export interface KeyValue {
    key: string;
    value: any
    name: string
}

export interface AlertModalProps {
    title: string
    message?: string
    icon: AlertIcons
    visible?: boolean
    data?: any
    OnHideAlert?: (params?: any) => void
    OnConfirmAction?: (params?: any) => void
}


export interface ModalOptionsSelectorProps {
    visible?: boolean
    title?: string
    options: KeyValue[]
    OnHideModal?: (selected?: KeyValue) => void
}
export interface ModalStatusUserProps {
    visible?: boolean
    title?: string
    options: KeyValue[]
    OnHideModal?: (selected?: KeyValue) => void
}

export interface ModalEditProfileProps {
    visible?: boolean
    data: Usuario,
    title?: string
    OnHideModal?: () => void
}


export interface ImageSelectorModalProps {
    visible?: boolean
    title?: string
    imageUrl?: string
    OnHideModal?: (image?: ImageRequestFormData) => void
}


export interface ImageRequestFormData {
    uri: string
    type: string
    name: string
}

export interface DomState {
    statusDom: 'requesting' | 'endRequest' | 'initState' | 'hideAlert';
    resultDom?: { data: ResultData, shootAlert: boolean };
    messageRequest?: string,
    requestWithoutBlockUI?: boolean
    alerModal: AlertModalProps
    callback?: () => void
}