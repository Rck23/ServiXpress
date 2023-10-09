import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Screens/HomeScreen';
import { ServicesMapScreen } from '../Screens/ServicesMapScreen';
import { ServicesBoardScreen } from '../Screens/ServicesBoardScreen';
import { UsersManageScreen } from '../Screens/UsersManageScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TabBarIconsRNode } from '../Components/Shared/NavigationComponents';
import { NavigationStyles } from '../Styles/NavigationStyles';

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
        <Tab.Navigator
            initialRouteName="homeScreen"
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
            <Tab.Screen name="homeScreen" options={{ title: 'ServiXpress' }} component={HomeScreen} />
            <Tab.Screen name="servicesMapScreen" options={{ title: 'Servicios' }} component={ServicesMapScreen} />
            <Tab.Screen name="servicesBoardScreen" options={{ title: 'Tablero servicios' }} component={ServicesBoardScreen} />
            <Tab.Screen name="usersManageScreen" options={{ title: 'Gestión de usuarios' }} component={UsersManageScreen} />
            <Tab.Screen name="profileScreen" options={{ title: 'Mi perfil' }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}