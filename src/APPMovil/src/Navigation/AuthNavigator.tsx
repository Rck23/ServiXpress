import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegisterScreen } from '../Screens/RegisterScreen';
import { RecoveryScreen } from '../Screens/RecoveryScreen';
import { RequestScreen } from '../Screens/RequestScreen';


export type AuthStackParams = {
    loginScreen: undefined
    registerScreen: undefined
    recoveryScreen: undefined
    requestScreen: undefined
}

const Stack = createStackNavigator<AuthStackParams>();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="loginScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="registerScreen" component={RegisterScreen} />
            <Stack.Screen name="recoveryScreen" component={RecoveryScreen} />
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="requestScreen" component={RequestScreen} />
        </Stack.Navigator>
    );
}