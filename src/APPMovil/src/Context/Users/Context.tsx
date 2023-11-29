import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ResultData } from '../../Interfaces/DataResponse';
import { HandleException, StrIsNullOrEmpty } from '../../Helpers/GlobalFunctions';
import { apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { Usuario } from '../../Interfaces/Usuario';
import { UsersReducer, UsersState } from './Reducer';
import { DomContext } from '../Dom/Context';
import { usuarioInitState } from '../../Interfaces/InterfacesInitState';


type UsersContextProps = {
    result?: { data: ResultData, shootAlert: boolean };
    status: 'requesting' | 'endRequest' | 'initState';
    messageRequest?: string

    users: Usuario[]
    userDetail?: Usuario

    // UpdateUser: (user: RegisterUser) => Promise<void>
    GetAllUsers: () => Promise<void>
    GetUserDetail: (id: string) => Promise<void>
    CleanResult: () => void
    SearchUsers: (text: string) => Promise<void>
    ChangeUserStatus: (id: string, estatus: string) => Promise<void>
}

const usersInitState: UsersState = {
    status: 'initState',
    messageRequest: undefined,
    result: undefined,
    userDetail: undefined,
    users: []
}


export const UsersContext = createContext({} as UsersContextProps);

export const UsersProvider = ({ children }: any) => {
    const { InitRequest, CleanResultDom, HandleEndrequest } = useContext(DomContext)
    const [state, dispatch] = useReducer(UsersReducer, usersInitState);

    useEffect(() => {
    }, [])


    const GetAllUsers = async () => {
        InitRequest('Cargando catálogo de usuarios...')

        try {
            const { data } = await API.get<Usuario[]>(apiEnpoints.getUsers);

            dispatch({ type: 'setUsers', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, "Error al obtener el catalogo de usuarios")
        } finally {
            CleanResultDom()
        }
    };

    const GetUserDetail = async (id: string) => {
        InitRequest('Cargando detalle de usuario...')

        try {
            const { data } = await API.get<Usuario>(`${apiEnpoints.getUserDetail}${id}`);

            dispatch({ type: 'setUserDetail', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, "Error al obtener la información del usuario")
        } finally {
            CleanResultDom()
        }
    };

    const SearchUsers = async (text: string) => {
        InitRequest('Buscando usuarios...', true)
        if (StrIsNullOrEmpty(text) || text.trim().length <= 3)
            return dispatch({ type: 'endRequest', payload: { data: { ok: true, icon: 'info' }, shootAlert: false } })

        try {
            const { data } = await API.get<Usuario[]>(apiEnpoints.searchUsers + text);

            dispatch({ type: 'setUsers', payload: data });
        } catch (error: any) {
            LocalHandleExeption(error, 'Error al encontrar usuarios')
        } finally {
            CleanResultDom()
        }
    };
    
    const ChangeUserStatus = async (id: string, estatus: string) => {
        InitRequest('Cambiando status del usuario...')

        try {
            const { data } = await API.post(`${apiEnpoints.changeUserStatus}`, {
                usuarioId: id,
                nuevoEstatus: estatus
            });

            HandleEndrequest({icon: 'success', ok: true, message:'Se ha actualizado el estatus', title:'Status actualizado'}, true);
        } catch (error: any) {
            LocalHandleExeption(error, "Error al actualizar el status del usuario")
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
        <UsersContext.Provider value={{
            ...state,
            GetAllUsers,
            GetUserDetail,
            CleanResult,
            SearchUsers,
            ChangeUserStatus
        }}>
            {children}
        </UsersContext.Provider>
    )

}


