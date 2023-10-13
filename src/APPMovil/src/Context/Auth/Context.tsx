import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthReducer } from './Reducer';
import { Usuario } from '../../Interfaces/Usuario';
import { LoginResponse, ResponseApi, ResultData } from '../../Interfaces/DataResponse';
import { GetResponseDataFromConstants, HandleException } from '../../Helpers/GlobalFunctions';
import { alertStr, apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { LocalStorageStoreData } from '../../Helpers/LocalStorage';
import { ConvertLoginResponseToUser } from '../../Helpers/InterfaceConverter';


type AuthContextProps = {
    result?: ResultData;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated' | 'ok';
    SignIn: (email: string, password: string) => Promise<void>;
    LogOut: () => Promise<void>;
    RemoveAlert: () => void;
    SendEmailResetPassword: (email: string) => Promise<ResultData>
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    result: undefined
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, authInicialState);

    useEffect(() => {
        CheckToken();
    }, [])

    /**
     * Validacion de token y datos de usuario almacenados en el dispositivo
     * @returns 
     */
    const CheckToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const usuarioString = await AsyncStorage.getItem('userData')

            if (!token) return dispatch({ type: 'notAuthenticated' });
            const usuarioJSON: Usuario = usuarioString ? JSON.parse(usuarioString) : undefined;
            return dispatch({
                type: 'ok',
                payload: {
                    token: token,
                    usuario: usuarioJSON
                }
            });
        } catch (error: any) {
            return dispatch({
                type: 'showAlert',
                payload: GetResponseDataFromConstants(false, alertStr.tokenNotFound)
            })
        }
    }


    /**
     * Metodo para autenticar el usaurio por el correo y contraseña
     * @param email 
     * @param password 
     */
    const SignIn = async (email: string, password: string) => {
        try {
            const { data } = await API.post<LoginResponse>(apiEnpoints.authenticate, { email, password });
            const userData = ConvertLoginResponseToUser(data)

            await AsyncStorage.setItem('token', data.token);
            await LocalStorageStoreData('userData', userData)
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    usuario: userData
                }
            });
        } catch (error: any) {
            dispatch({
                type: 'showAlert',
                payload: await HandleException(error)
            })
        }
    };

    const LogOut = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userData')
        dispatch({ type: 'logout' });
    };



    const RemoveAlert = () => {
        dispatch({ type: 'hideAlert' });
    };



    /**
     * Realiza la peticion para enviar correo de recuperacion de contraseña
     * @param email 
     * @returns 
     */
    const SendEmailResetPassword = async (email: string): Promise<ResultData> => {
        try {
            const response = await API.post<ResponseApi>(apiEnpoints.sendEmailUser, { email })
            const resCode = response.data.statusCode

            return { ok: resCode == 200, message: response.data.message, title: response.data.title, icon: resCode == 200 ? 'success' : 'error' }
        } catch (error) {
            return await HandleException(error)
        }
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            SignIn,
            LogOut,
            RemoveAlert,
            SendEmailResetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )

}


