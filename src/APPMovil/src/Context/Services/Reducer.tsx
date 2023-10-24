import { ResultData } from "../../Interfaces/DataResponse";
import { CategoriaServicio } from "../../Interfaces/Servicio";


export interface ServicesState {
    status: 'requesting' | 'endRequest' | 'initState';
    result?: { data: ResultData, shootAlert: boolean };
    messageRequest?: string

    serviceCategories: CategoriaServicio[]
}

type ServicesAction =
    | { type: 'endRequest', payload: { data: ResultData, shootAlert: boolean } }
    | { type: 'cleanResult' }
    | { type: 'startRequest', payload: string }
    | { type: 'setServiceCategories', payload: CategoriaServicio[] }


export const ServicesReducer = (state: ServicesState, action: ServicesAction): ServicesState => {

    switch (action.type) {
        case 'endRequest':
            return {
                ...state,
                messageRequest: undefined,
                status: 'endRequest',
                result: action.payload
            }
        case 'startRequest':
            return {
                ...state,
                status: 'requesting',
                messageRequest: action.payload,
                result: undefined
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
        default:
            return state;
    }


}


