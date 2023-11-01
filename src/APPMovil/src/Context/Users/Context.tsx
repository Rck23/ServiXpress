import React, { createContext, useEffect, useReducer } from 'react';
import { LoginResponse, ResultData } from '../../Interfaces/DataResponse';
import { HandleException } from '../../Helpers/GlobalFunctions';
import { apiEnpoints } from '../../Constants/Values';
import API from '../../Api/Api';
import { Usuario } from '../../Interfaces/Usuario';
import { UsersReducer, UsersState } from './Reducer';
import { ConvertLoginResponseToUserList } from '../../Helpers/InterfaceConverter';


type UsersContextProps = {
    result?: { data: ResultData, shootAlert: boolean };
    status: 'requesting' | 'endRequest' | 'initState';
    messageRequest?: string

    users: Usuario[]
    userDetail?: Usuario

    // UpdateUser: (user: RegisterUser) => Promise<void>
    GetAllUsers: () => Promise<void>
    CleanResult: () => void
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
    const [state, dispatch] = useReducer(UsersReducer, usersInitState);

    useEffect(() => {
    }, [])


    const GetAllUsers = async () => {
        dispatch({ type: 'requesting', payload: 'Cargando catálogo de usuarios...' })

        try {
            const { data } = await API.get<LoginResponse[]>(apiEnpoints.getUsers);
            const usersData = ConvertLoginResponseToUserList(data)

            dispatch({ type: 'setUsers', payload: usersData });
        } catch (error: any) {
            const errorData = await HandleException(error)
            dispatch({
                type: 'endRequest',
                payload: {
                    data: {
                        ...errorData,
                        title: "Error al obtener el catalogo de usuarios"
                    },
                    shootAlert: true
                }
            })
        }
    };


    const CleanResult = () => {
        dispatch({ type: 'cleanResult' })
    }


    return (
        <UsersContext.Provider value={{
            ...state,
            GetAllUsers,
            CleanResult
        }}>
            {children}
        </UsersContext.Provider>
    )

}


