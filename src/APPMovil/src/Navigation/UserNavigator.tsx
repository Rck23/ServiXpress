import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserDetailsScreen } from '../Screens/UserNavigation/UserDetailsScreen';
import { UsersManageScreen } from '../Screens/UserNavigation/UsersManageScreen';
import { customScreenOpitons } from '../Constants/Properties';


export type UserStackParams = {
    userManageScreen: undefined
    userDetailsScreen: undefined
}

const Stack = createStackNavigator<UserStackParams>();

export const UserNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="userManageScreen"
            screenOptions={customScreenOpitons}
        >
            <Stack.Screen options={{ title: 'Gestión de usuarios' }} name="userManageScreen" component={UsersManageScreen} />
            <Stack.Screen options={{ title: 'Detalle de usuario' }} name="userDetailsScreen" component={UserDetailsScreen} />
        </Stack.Navigator>
    );
}