import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './HomeNavigator';
import { AuthNavigator } from './AuthNavigator';
import { AuthContext } from '../Context/Auth/Context';
import { LoadingScreen } from '../Components/Shared/LoadingScreen';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { DomContext } from '../Context/Dom/Context';
import { BlockUI } from '../Components/Shared/BlockUI';
import { AlertModal } from '../Components/Modals/AlertModal';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { user, status } = useContext(AuthContext)
    const { messageRequest, statusDom, alertModal, AddEventOnCloseAlert } = useContext(DomContext)

    if (status == 'checking')
        return (<LoadingScreen visible />)


    return (
        <>
            <AlertModal {...alertModal} />
            <BlockUI visible={statusDom === 'requesting'} message={messageRequest} />

            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {
                    status === 'authenticated' ?
                        <Stack.Screen name="homeNavigator" component={HomeNavigator} />
                        :
                        <Stack.Screen name="authNavigator" component={AuthNavigator} />
                }
            </Stack.Navigator>
        </>
    );
}