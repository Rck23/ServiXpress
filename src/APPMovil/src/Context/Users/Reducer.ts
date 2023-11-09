import { ResultData } from "../../Interfaces/DataResponse";
import { Usuario } from "../../Interfaces/Usuario";


export interface UsersState {
    status: 'requesting' | 'endRequest' | 'initState';
    result?: { data: ResultData, shootAlert: boolean };
    messageRequest?: string

    users: Usuario[]
    userDetail?: Usuario
}

type UsersAction =
    | { type: 'endRequest', payload: { data: ResultData, shootAlert: boolean } }
    | { type: 'cleanResult' }
    | { type: 'requesting', payload: string }
    | { type: 'setUsers', payload: Usuario[] }
    | {type: 'setUserDetail', payload: Usuario }


export const UsersReducer = (state: UsersState, action: UsersAction): UsersState => {

    switch (action.type) {
        case 'endRequest':
            return {
                ...state,
                messageRequest: undefined,
                status: 'endRequest',
                result: action.payload
            }
        case 'requesting':
            return {
                ...state,
                status: 'requesting',
                messageRequest: action.payload,
                result: undefined
            }
        case "setUsers":
            return {
                ...state,
                users: action.payload,
                status: 'endRequest',
            }
        case "setUserDetail":
            return {
                ...state,
                userDetail: action.payload,
                status: 'endRequest'
            }
        case 'cleanResult':
            return {
                ...state,
                messageRequest: undefined,
                status: 'initState',
                result: undefined
            }
        default:
            return state;
    }


}


