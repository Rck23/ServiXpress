import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginNavigation/LoginScreen';
import { RegisterScreen } from '../Screens/LoginNavigation/RegisterScreen';
import { RecoveryScreen } from '../Screens/LoginNavigation/RecoveryScreen';
import { customScreenOpitons } from '../Constants/Properties';
import { ResetPasswordScreen } from '../Screens/LoginNavigation/ResetPasswordScreen';


export type AuthStackParams = {
    loginScreen: undefined
    registerScreen: undefined
    recoveryScreen: undefined
    resetPasswordScreen: undefined
}

const Stack = createStackNavigator<AuthStackParams>();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="loginScreen"
            screenOptions={{ ...customScreenOpitons }}
        >
            <Stack.Screen options={{ title: 'Crear cuenta' }} name="registerScreen" component={RegisterScreen} />
            <Stack.Screen options={{ title: 'Recuperar contraseña' }} name="recoveryScreen" component={RecoveryScreen} />
            <Stack.Screen options={{ headerShown: false }} name="loginScreen" component={LoginScreen} />
            <Stack.Screen options={{ title: 'Actualizar contraseña' }} name='resetPasswordScreen' component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}