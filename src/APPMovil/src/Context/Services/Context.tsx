import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ServicesReducer, ServicesState } from './Reducer';
import { ResultData } from '../../Interfaces/DataResponse';
import { HandleException, StrIsNullOrEmpty } from '../../Helpers/GlobalFunctions';
import { apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { CategoriaServicio, ServiceCreate, Servicio } from '../../Interfaces/Servicio';
import { ValidateRegisterServiceForm } from '../../Helpers/FormsFunctions';
import { servicioInitState } from '../../Interfaces/InterfacesInitState';
import { DomContext } from '../Dom/Context';
import { UserReview } from '../../Interfaces/Usuario';
import { AuthContext } from '../Auth/Context';


type ServicesContextProps = {
    result?: { data: ResultData, shootAlert: boolean };
    status: 'requesting' | 'endRequest' | 'initState';
    messageRequest?: string

    serviceCategories: CategoriaServicio[]
    services: Servicio[]
    serviceDetails: Servicio
    searchServices: Servicio

    CreateService: (service: ServiceCreate) => Promise<void>
    GetServicesCategories: () => Promise<void>
    GetServices: () => Promise<void>
    CleanResult: () => void
    GetServiceDetails: (id: string) => Promise<void>
    SearchServices: (text: string) => Promise<void>
    ReviewUserSend: (calificacion: UserReview, onSucces?: () => void) => Promise<void>
}

const servicesInitState: ServicesState = {
    status: 'initState',
    messageRequest: undefined,
    result: undefined,
    serviceCategories: [],
    services: [],
    serviceDetails: servicioInitState,
    searchServices: servicioInitState
}


export const ServicesContext = createContext({} as ServicesContextProps);

export const ServicesProvider = ({ children }: any) => {
    const { InitRequest, CleanResultDom, HandleEndrequest } = useContext(DomContext)
    const [state, dispatch] = useReducer(ServicesReducer, servicesInitState);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        GetServicesCategories()
    }, [])


    /**
     * Get all services categories from API
     */
    const GetServicesCategories = async () => {
        InitRequest('Cargando categorias...')

        try {
            const { data } = await API.get<CategoriaServicio[]>(apiEnpoints.getCategories);

            dispatch({ type: 'setServiceCategories', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al cargar las categorias')
        }
        finally {
            CleanResultDom()
        }
    };


    const GetServices = async () => {
        InitRequest('Cargando catálogo de servicios...')

        try {
            const { data } = await API.get<Servicio[]>(apiEnpoints.getServices);

            dispatch({ type: 'setServices', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al cargar servicios')
        } finally {
            CleanResultDom()
        }
    };

    const GetServiceDetails = async (id: string) => {
        InitRequest('Cargando detalles de servicios...')

        try {
            const { data } = await API.get<Servicio>(apiEnpoints.getServiceDetails + id);

            dispatch({ type: 'setServiceDetails', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al obtener el detalle del servicio')
        } finally {
            CleanResultDom()
        }
    };

    const SearchServices = async (text: string) => {
        InitRequest('Buscando servicios...', true)
        if (StrIsNullOrEmpty(text) || text.trim().length <= 3)
            return dispatch({ type: 'endRequest', payload: { data: { ok: true, icon: 'info' }, shootAlert: false } })

        try {
            const { data } = await API.get<Servicio[]>(apiEnpoints.searchServices + text);

            dispatch({ type: 'setServices', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al consultar servicios')
        } finally {
            CleanResultDom()
        }
    };


    const CreateService = async (service: ServiceCreate) => {
        InitRequest('Registrando servicio...')
        console.log(service)
        try {
            const validResult = ValidateRegisterServiceForm(service)
            if (!validResult.ok) return dispatch({ type: 'endRequest', payload: { data: validResult, shootAlert: true } })

            await API.post<Servicio>(apiEnpoints.createService, service);

            HandleEndrequest({ ok: true, icon: 'success', message: 'Se ha creado el servicio correctamente', title: 'Servicio creado y publicado' }, true);
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al crear el servicio')
            console.log(error)
        } finally {
            CleanResultDom()
        }
    };

    const ReviewUserSend = async (calificacion: UserReview, onSucces?: () => void) => {
        InitRequest('Creando calificación del usuario...')

        console.log(calificacion)
        try {
            if (calificacion.CalificacionUser == 0 || StrIsNullOrEmpty(calificacion.Comentarios)) {
                return HandleEndrequest({
                    icon: 'error',
                    ok: true,
                    message: 'Debes enviar una calificacion y comentarios validos',
                    title: 'Datos requeridos'
                }, true, onSucces);
            }

            const { data } = await API.post(`${apiEnpoints.reviewUserSend}`, calificacion);

            HandleEndrequest({
                icon: 'success',
                ok: true,
                message: 'Se ha calificado el usuario',
                title: 'Calificacion exitosa'
            }, true);
        } catch (error: any) {
            LocalHandleExeption(error, "Error al calificar al usuario")
        } finally {
            CleanResultDom()
        }
    };


    const CleanResult = () => {
        dispatch({ type: 'cleanResult' })
    }

    const LocalHandleExeption = async (ex: any, headMsg?: string) => {
        const data = await HandleException(ex)
        if (headMsg) data.title = headMsg

        HandleEndrequest(data, true)
    }


    return (
        <ServicesContext.Provider value={{
            ...state,
            GetServicesCategories,
            CreateService,
            GetServices,
            CleanResult,
            GetServiceDetails,
            SearchServices,
            ReviewUserSend
        }}>
            {children}
        </ServicesContext.Provider>
    )

}


