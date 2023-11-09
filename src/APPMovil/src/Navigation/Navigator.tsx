import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './HomeNavigator';
import { AuthNavigator } from './AuthNavigator';
import { mainColors } from '../Constants/Values';
import { AuthContext } from '../Context/Auth/Context';
import { LoadingScreen } from '../Components/Shared/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { user, status } = useContext(AuthContext)

    useEffect(() => {
    }, [])

    if (status == 'checking')
        return (<LoadingScreen visible />)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                status === 'not-authenticated' ?
                    <Stack.Screen name="homeNavigator" component={HomeNavigator} />
                    :
                    <Stack.Screen name="authNavigator" component={AuthNavigator} />
            }
        </Stack.Navigator>
    );
}