import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { mainColors } from '../constants/Values';
import { HomeNavigator } from './HomeNavigator';
import { AuthNavigator } from './AuthNavigator';

const Stack = createStackNavigator();

const signedIn = false;

export const Navigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: mainColors.purpule
                }
            }}
        >
            {
                !signedIn ?
                    <Stack.Screen name="homeNavigator" component={AuthNavigator} />
                    :
                    <Stack.Screen name="homeNavigator" component={HomeNavigator} />
            }
        </Stack.Navigator>
    );
}