import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { ServiceFormScreen } from '../Screens/ServiceNavigation/ServiceFormScreen';
import { customScreenOpitons } from '../Constants/Properties';


export type ServiceStackParams = {
    homeScreen: undefined
    serviceFormScreen: undefined
}

const Stack = createStackNavigator<ServiceStackParams>();

export const ServiceNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="homeScreen"
            screenOptions={customScreenOpitons}
        >
            <Stack.Screen options={{ title: 'ServiXpress' }} name="homeScreen" component={HomeScreen} />
            <Stack.Screen options={{ title: 'Alta de servicios' }} name="serviceFormScreen" component={ServiceFormScreen} />
        </Stack.Navigator>
    );
}