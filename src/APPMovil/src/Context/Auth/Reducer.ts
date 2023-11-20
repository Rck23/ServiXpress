import { ResultData } from "../../Interfaces/DataResponse";
import { Usuario } from "../../Interfaces/Usuario";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    result?: ResultData;
    user: Usuario | null;
    messageRequest?: string
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, usuario: Usuario } }
    | { type: 'ok', payload: { token: string, usuario: Usuario } }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }


export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signUp':
        case 'ok':
            return {
                ...state,
                result: undefined,
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.usuario
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }
        default:
            return state;
    }


}


