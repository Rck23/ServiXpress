import React, { createContext, useEffect, useReducer } from 'react';
import { ServicesReducer, ServicesState } from './Reducer';
import { ResultData } from '../../Interfaces/DataResponse';
import { HandleException } from '../../Helpers/GlobalFunctions';
import { apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { CategoriaServicio, ServiceCreate, Servicio } from '../../Interfaces/Servicio';
import { ValidateRegisterServiceForm } from '../../Helpers/FormsFunctions';


type ServicesContextProps = {
    result?: { data: ResultData, shootAlert: boolean };
    status: 'requesting' | 'endRequest' | 'initState';
    messageRequest?: string

    serviceCategories: CategoriaServicio[]
    services: Servicio[]

    CreateService: (service: ServiceCreate) => Promise<void>
    GetServicesCategories: () => Promise<void>
    GetServices: () => Promise<void>
    CleanResult: () => void
}

const servicesInitState: ServicesState = {
    status: 'initState',
    messageRequest: undefined,
    result: undefined,
    serviceCategories: [],
    services: []
}


export const ServicesContext = createContext({} as ServicesContextProps);

export const ServicesProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(ServicesReducer, servicesInitState);

    useEffect(() => {
        GetServicesCategories()
    }, [])


    /**
     * Get all services categories from API
     */
    const GetServicesCategories = async () => {
        dispatch({ type: 'requesting', payload: 'Cargando categorias...' })

        try {
            const { data } = await API.get<CategoriaServicio[]>(apiEnpoints.getCategories);

            dispatch({ type: 'setServiceCategories', payload: data });
        } catch (error: any) {
            dispatch({
                type: 'endRequest',
                payload: {
                    data: await HandleException(error),
                    shootAlert: true
                }
            })
        }
    };


    const GetServices = async () => {
        dispatch({ type: 'requesting', payload: 'Cargando catálogo de servicios...' })

        try {
            const { data } = await API.get<Servicio[]>(apiEnpoints.getServices);

            dispatch({ type: 'setServices', payload: data });
        } catch (error: any) {
            dispatch({
                type: 'endRequest',
                payload: {
                    data: await HandleException(error),
                    shootAlert: true
                }
            })
        }
    };


    const CreateService = async (service: ServiceCreate) => {
        dispatch({ type: 'requesting', payload: 'Registrando servicio...' })

        try {
            const validResult = ValidateRegisterServiceForm(service)
            if (!validResult.ok) return dispatch({ type: 'endRequest', payload: { data: validResult, shootAlert: true } })

            const { data } = await API.post<Servicio>(apiEnpoints.createService, service);

            dispatch({
                type: 'endRequest', payload: {
                    data: { ok: true, icon: 'success', message: 'Se ha creado el servicio correctamente', title: 'Servicio creado y publicado' },
                    shootAlert: true
                }
            });
        } catch (error: any) {
            dispatch({
                type: 'endRequest',
                payload: { data: await HandleException(error), shootAlert: true }
            })
        }
    };


    const CleanResult = () => {
        dispatch({ type: 'cleanResult' })
    }


    return (
        <ServicesContext.Provider value={{
            ...state,
            GetServicesCategories,
            CreateService,
            GetServices,
            CleanResult
        }}>
            {children}
        </ServicesContext.Provider>
    )

}


