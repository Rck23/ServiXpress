import React, { createContext, useEffect, useReducer, useState } from 'react';
import { DomReducer } from './Reducer';
import { ResultData } from '../../Interfaces/DataResponse';
import { AlertModalProps, DomState } from '../../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../../Interfaces/InterfacesInitState';

export const domInitState: DomState = {
    statusDom: 'initState',
    alerModal: alertModalInitState,
    messageRequest: undefined,
    resultDom: undefined,
}

type DomContextProps = {
    resultDom?: { data: ResultData, shootAlert: boolean };
    statusDom: 'requesting' | 'endRequest' | 'initState' | 'hideAlert';
    messageRequest?: string
    alertModal: AlertModalProps
    requestWithoutBlockUI?: boolean

    CleanResultDom: () => void
    RemoveAlertDom: () => void
    AddEventOnConfirmAlert: (callback: () => void) => void
    AddEventOnCloseAlert: (callback: () => void) => void
    InitRequest: (msg?: string, withoutBlockUI?: boolean) => void
    HandleEndrequest: (data: ResultData, shootAlert: boolean) => void
}


export const DomContext = createContext({} as DomContextProps);

export const DomProvider = ({ children }: any) => {
    const [stateDom, dispatch] = useReducer(DomReducer, domInitState);
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)

    useEffect(() => {
        AddEventOnCloseAlert(RemoveAlertDom)
    }, [])


    const CleanResultDom = () => {
        dispatch({ type: 'cleanResult' })
    }

    const RemoveAlertDom = () => {
        setAlertModal({ ...alertModal, OnHideAlert: RemoveAlertDom, visible: false, message: '', title: '' })
        dispatch({ type: 'hideAlert' });
    };

    const AddEventOnConfirmAlert = (callback: () => void) => {
        setAlertModal({
            ...alertModal,
            OnConfirmAction: callback
        })
        dispatch({ type: 'addEventOnConfirmAlert', payload: callback })
    }

    const AddEventOnCloseAlert = (callback: () => void) => {
        setAlertModal({
            ...alertModal,
            OnHideAlert: callback
        })
        dispatch({ type: 'addEventOnHideAlert', payload: callback })
    }

    const InitRequest = (msg?: string, withoutBlockUI?: boolean) => {
        dispatch({ type: 'requesting', payload: { text: msg ?? '', withoutBlockUI } })
    }

    const HandleEndrequest = (data: ResultData, shootAlert: boolean) => {
        setAlertModal({
            ...alertModal,
            visible: true,
            message: data.message,
            title: data.title ?? '',
            icon: data.icon
        })

        dispatch({ type: 'endRequest', payload: { data, shootAlert } })
    }


    return (
        <DomContext.Provider value={{
            ...stateDom,
            alertModal,
            HandleEndrequest,
            RemoveAlertDom,
            InitRequest,
            AddEventOnConfirmAlert,
            AddEventOnCloseAlert,
            CleanResultDom,
        }}>
            {children}
        </DomContext.Provider>
    )

}


