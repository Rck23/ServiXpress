import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ServicesBoardScreen } from '../Screens/ServicieDetailsNavigation/ServicesBoardScreen';
import { ServicesDetailsScreen } from '../Screens/ServicieDetailsNavigation/SerivcesDetailsScreen';


export type ServiceDetailsStackParams = {
    servicesBoardScreen: undefined
    servicesDetailsScreen: undefined
}

const Stack = createStackNavigator<ServiceDetailsStackParams>();

export const ServiceDetailsNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="servicesBoardScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="servicesBoardScreen" component={ServicesBoardScreen} />
            <Stack.Screen name="servicesDetailsScreen" component={ServicesDetailsScreen} />
        </Stack.Navigator>
    );
}