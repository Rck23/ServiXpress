import React, { createContext, useEffect, useReducer } from 'react';
import { ServicesReducer, ServicesState } from './Reducer';
import { ResultData } from '../../Interfaces/DataResponse';
import { HandleException } from '../../Helpers/GlobalFunctions';
import { apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { CategoriaServicio } from '../../Interfaces/Servicio';


type ServicesContextProps = {
    result?: { data: ResultData, shootAlert: boolean };
    status: 'requesting' | 'endRequest' | 'initState';
    messageRequest?: string

    serviceCategories: CategoriaServicio[]

    GetServicesCategories: () => Promise<void>
}

const servicesInitState: ServicesState = {
    status: 'initState',
    messageRequest: undefined,
    result: undefined,
    serviceCategories: []
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
        dispatch({ type: 'startRequest', payload: 'Cargando categorias...' })

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


    return (
        <ServicesContext.Provider value={{
            ...state,
            GetServicesCategories,
        }}>
            {children}
        </ServicesContext.Provider>
    )

}


