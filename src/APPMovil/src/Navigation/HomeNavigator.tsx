import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Screens/HomeScreen';
import { ServicesMapScreen } from '../Screens/ServicesMapScreen';
import { ServicesBoardScreen } from '../Screens/ServicesBoardScreen';
import { UsersManageScreen } from '../Screens/UsersManageScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';

export type HomeStackParams = {
    homeScreen: undefined
    servicesMapScreen: undefined
    servicesBoardScreen: undefined
    usersManageScreen: undefined
    profileScreen: undefined
}


const Tab = createBottomTabNavigator<HomeStackParams>();

export const HomeNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="homeScreen">
            <Tab.Screen name="homeScreen" component={HomeScreen} />
            <Tab.Screen name="servicesMapScreen" component={ServicesMapScreen} />
            <Tab.Screen name="servicesBoardScreen" component={ServicesBoardScreen} />
            <Tab.Screen name="usersManageScreen" component={UsersManageScreen} />
            <Tab.Screen name="profileScreen" component={ProfileScreen} />
        </Tab.Navigator>
    );
}