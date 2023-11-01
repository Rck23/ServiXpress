import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserDetailsScreen } from '../Screens/UserNavigation/UserDetailsScreen';
import { UsersManageScreen } from '../Screens/UserNavigation/UsersManageScreen';
import { customScreenOpitons } from '../Constants/Properties';
import { UsersProvider } from '../Context/Users/Context';


export type UserStackParams = {
    userManageScreen: undefined
    userDetailsScreen: undefined
}


const MangeUserState = ({ children }: any) => {
    return (
        <UsersProvider>
            {children}
        </UsersProvider>
    )
}

const Stack = createStackNavigator<UserStackParams>();

export const UserNavigator = () => {
    return (
        <MangeUserState>
            <Stack.Navigator
                initialRouteName="userManageScreen"
                screenOptions={customScreenOpitons}
            >
                <Stack.Screen options={{ title: 'Gestión de usuarios' }} name="userManageScreen" component={UsersManageScreen} />
                <Stack.Screen options={{ title: 'Detalle de usuario' }} name="userDetailsScreen" component={UserDetailsScreen} />
            </Stack.Navigator>
        </MangeUserState>
    );
}