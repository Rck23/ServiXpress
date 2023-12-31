import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthReducer } from './Reducer';
import { RegisterUser, Usuario } from '../../Interfaces/Usuario';
import { ResetPassword, ResultData } from '../../Interfaces/DataResponse';
import { GetResponseDataFromConstants, HandleException, StrIsNullOrEmpty } from '../../Helpers/GlobalFunctions';
import { alertStr, apiEnpoints } from '../../Constants/Values';
import API, { formDataHeaders } from '../../Api/Api';
import { LocalStorageStoreData } from '../../Helpers/LocalStorage';
import { ConvertUserToUpdateUser } from '../../Helpers/InterfaceConverter';
import { ValidateRegisterUserForm } from '../../Helpers/FormsFunctions';
import { DomContext } from '../Dom/Context';


type AuthContextProps = {
    result?: ResultData;
    token: string | null;
    user?: Usuario;
    status: 'checking' | 'authenticated' | 'not-authenticated' | 'ok'

    SignIn: (email: string, password: string) => Promise<void>;
    SignUp: (user: RegisterUser, image?: any) => Promise<void>
    LogOut: () => Promise<void>;
    SendEmailResetPassword: (email: string) => Promise<void>
    UpdateProfile: (user: Usuario) => Promise<void>
    ResetPassword: (params: ResetPassword) => Promise<void>
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: undefined,
    result: undefined
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const { InitRequest, CleanResultDom, HandleEndrequest } = useContext(DomContext)
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
            LocalHandleExeption(error, 'Error al validar la información de la sesión')
        }
    }


    const SignIn = async (email: string, password: string) => {
        InitRequest('Validando información...')

        try {
            if (StrIsNullOrEmpty(email) || StrIsNullOrEmpty(password))
                return HandleEndrequest(GetResponseDataFromConstants(false, alertStr.emptyFieldsLogin), true)

            const { data } = await API.post<Usuario>(apiEnpoints.authenticate, { email, password });

            await AsyncStorage.setItem('token', data.token);
            await LocalStorageStoreData('userData', data)
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    usuario: data
                }
            });
        } catch (error: any) {
            LocalHandleExeption(error, 'Autenticación fallida')
            console.log(error)
        } finally {
            CleanResultDom()
        }
    };


    const SignUp = async (user: RegisterUser, image?: any) => {
        InitRequest('Creando cuenta...')

        try {
            const resultValidation = ValidateRegisterUserForm(user)
            if (!resultValidation.ok)
                return HandleEndrequest(resultValidation, true)

            const formData = new FormData();
            Object.keys(user).forEach(key => {
                formData.append(key, (user as any)[key]);
            });


            const { data } = await API.post<Usuario>(apiEnpoints.registerUser, formData, { headers: formDataHeaders });

            await AsyncStorage.setItem('token', data.token);
            await LocalStorageStoreData('userData', data)

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    usuario: data
                }
            });
        } catch (error: any) {
            LocalHandleExeption(error, 'No se ha podido crear su cuenta')
        } finally {
            CleanResultDom()
        }
    };



    const UpdateProfile = async (paramUser: Usuario) => {
        InitRequest('Actualizando información...')

        try {
            const user = ConvertUserToUpdateUser(paramUser)

            const formData = new FormData();
            Object.keys(user).forEach(key => {
                formData.append(key, (user as any)[key]);
            });


            const { data } = await API.put<Usuario>(apiEnpoints.updateUser, formData, { headers: formDataHeaders });

            await AsyncStorage.setItem('token', data.token);
            await LocalStorageStoreData('userData', data)
            dispatch({ type: 'setUserSession', payload: data })

            HandleEndrequest({ ok: true, icon: 'success', title: 'Información actualizada', message: 'Se ha guardado su información correctamente.' }, true)
        } catch (error: any) {
            LocalHandleExeption(error, 'No se ha actualizado su información correctamente')
        } finally {
            CleanResultDom()
        }
    };



    const LogOut = async () => {
        InitRequest('Cerrando sesión...')

        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userData')
        dispatch({ type: 'logout' });
        CleanResultDom()
    };




    /**
     * Realiza la peticion para enviar correo de recuperacion de contraseña
     * @param email 
     * @returns 
     */
    const SendEmailResetPassword = async (email?: string): Promise<void> => {
        InitRequest('Enviando correo...')

        if (StrIsNullOrEmpty(email))
            return HandleEndrequest(GetResponseDataFromConstants(false, alertStr.emptyFieldsSendEmail, 'info'), true)
        try {
            await API.post<string>(apiEnpoints.sendEmailUser, { email })

            HandleEndrequest({ ok: true, title: "Corrreo electrónico enviado", message: "Revise su bandeja y siga las instrucciones.", icon: 'success' }, true);
        } catch (error) {
            LocalHandleExeption(error, "No se ha enviado el correo")
        } finally {
            CleanResultDom()
        }
    }

    const ResetPassword = async (params: ResetPassword): Promise<void> => {
        InitRequest('Aplicando cambios, espere...')

        if (StrIsNullOrEmpty(params.password) || StrIsNullOrEmpty(params.confirmPassword) || StrIsNullOrEmpty(params.token) || params.password != params.confirmPassword)
            return HandleEndrequest(GetResponseDataFromConstants(false, alertStr.resetPasswordIssue, 'info'), true)

        try {
            await API.post<string>(apiEnpoints.resetPassword, params)

            HandleEndrequest({ ok: true, title: "Contraseña actualizda", message: "Se ha cambiado su contraseña, ahora puede ingresar con su nueva contraseña.", icon: 'success' }, true);
        } catch (error) {
            LocalHandleExeption(error, "No ha sido posible actualizar su contraseña")
        } finally {
            CleanResultDom()
        }
    }


    const LocalHandleExeption = async (ex: any, headMsg?: string) => {
        const data = await HandleException(ex)
        if (headMsg) data.title = headMsg

        HandleEndrequest(data, true)
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            SignIn,
            SignUp,
            LogOut,
            SendEmailResetPassword,
            UpdateProfile,
            ResetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )

}


