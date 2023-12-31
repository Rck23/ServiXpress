import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { ServiceFormScreen } from '../Screens/ServiceNavigation/ServiceFormScreen';
import { customScreenOpitons } from '../Constants/Properties';
import { ServicesBoardScreen } from '../Screens/ServiceNavigation/ServicesBoardScreen';
import { ServicesDetailsScreen } from '../Screens/ServiceNavigation/SerivcesDetailsScreen';
import { ServicesCalificationScreen } from '../Screens/ServiceNavigation/SerivcesCalificationScreen';


export type ServiceStackParams = {
    homeScreen: undefined
    serviceFormScreen: { tipoServicio: string }
    serviceDetailsScreen: { id: string }
    servicesBoardScreen: undefined
    servicesCalificationScreen: undefined
}

const Stack = createStackNavigator<ServiceStackParams>();

export const ServiceNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="homeScreen"
            screenOptions={customScreenOpitons}
        >
            <Stack.Screen options={{ title: 'Detalle de servicio' }} name="serviceDetailsScreen" component={ServicesDetailsScreen} />
            <Stack.Screen options={{ title: 'ServiXpress' }} name="homeScreen" component={HomeScreen} />
            <Stack.Screen options={{ title: 'Catálogo de servicios' }} name="servicesBoardScreen" component={ServicesBoardScreen} />
            <Stack.Screen options={{ title: 'Alta de servicios' }} name="serviceFormScreen" component={ServiceFormScreen} />
            <Stack.Screen options={{ title: 'Califica el servicio' }} name="servicesCalificationScreen" component={ServicesCalificationScreen} />
        </Stack.Navigator>
    );
}