import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServicesMapScreen } from '../Screens/ServicesMapScreen';
import { ServicesBoardScreen } from '../Screens/ServicesBoardScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TabBarIconsRNode } from '../Components/Shared/NavigationComponents';
import { NavigationStyles } from '../Styles/NavigationStyles';
import { ServiceNavigator } from './ServiceNavigator';
import { UserNavigator } from './UserNavigator';

export type HomeStackParams = {
    serviceNavigatorScreen: undefined
    servicesMapScreen: undefined
    servicesBoardScreen: undefined
    usersManageScreen: undefined
    profileScreen: undefined
    userNavigatorScreen: undefined
}


const Tab = createBottomTabNavigator<HomeStackParams>();

export const HomeNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="serviceNavigatorScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return TabBarIconsRNode(route, focused, color, size)
                },
                headerShown: true,
                headerStyle: NavigationStyles.headerStyle,
                headerTitleStyle: NavigationStyles.headerText,
                tabBarLabelStyle: NavigationStyles.labelText,
                tabBarStyle: NavigationStyles.styleTabBar,
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name="serviceNavigatorScreen" options={{ title: 'ServiXpress' }} component={ServiceNavigator} />
            <Tab.Screen name="servicesMapScreen" options={{ title: 'Servicios' }} component={ServicesMapScreen} />
            <Tab.Screen name="servicesBoardScreen" options={{ title: 'Tablero servicios' }} component={ServicesBoardScreen} />
            <Tab.Screen name="userNavigatorScreen" options={{ title: 'Gestión de usuarios' }} component={UserNavigator} />
            <Tab.Screen name="profileScreen" options={{ title: 'Mi perfil' }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}