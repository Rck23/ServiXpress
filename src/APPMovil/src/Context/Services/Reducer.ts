import { ResultData } from "../../Interfaces/DataResponse";
import { CategoriaServicio, Servicio } from "../../Interfaces/Servicio";


export interface ServicesState {
    status: 'requesting' | 'endRequest' | 'initState';
    result?: { data: ResultData, shootAlert: boolean };
    messageRequest?: string

    serviceCategories: CategoriaServicio[]
    services: Servicio[]
    serviceDetails: Servicio
    searchServices: Servicio
}

type ServicesAction =
    | { type: 'endRequest', payload: { data: ResultData, shootAlert: boolean } }
    | { type: 'cleanResult' }
    | { type: 'setServiceCategories', payload: CategoriaServicio[] }
    | { type: 'setServices', payload: Servicio[] }
    | { type: 'setServiceDetails', payload: Servicio }
    | { type: 'setSearchServicios', payload: Servicio }


export const ServicesReducer = (state: ServicesState, action: ServicesAction): ServicesState => {

    switch (action.type) {
        case 'endRequest':
            return {
                ...state,
                messageRequest: undefined,
                status: 'endRequest',
                result: action.payload
            }
        case 'cleanResult':
            return {
                ...state,
                messageRequest: undefined,
                status: 'initState',
                result: undefined
            }
        case 'setServiceCategories':
            return {
                ...state,
                serviceCategories: action.payload,
                status: 'endRequest'
            }
        case 'setServices':
            return {
                ...state,
                services: action.payload,
                status: 'endRequest',
            }
        case 'setServiceDetails':
            return {
                ...state,
                serviceDetails: action.payload,
                status: 'endRequest',
            }
        case 'setSearchServicios':
            return {
                ...state,
                searchServices: action.payload,
                status: 'endRequest'
            }
        default:
            return state;
    }


}


