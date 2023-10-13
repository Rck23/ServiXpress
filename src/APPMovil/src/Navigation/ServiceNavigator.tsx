import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { ServiceFormScreen } from '../Screens/ServiceNavigation/ServiceFormScreen';


export type ServiceStackParams = {
    homeScreen: undefined
    serviceFormScreen: undefined
}

const Stack = createStackNavigator<ServiceStackParams>();

export const ServiceNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="homeScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="homeScreen" component={HomeScreen} />
            <Stack.Screen name="serviceFormScreen" component={ServiceFormScreen} />
        </Stack.Navigator>
    );
}