import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserDetailsScreen } from '../Screens/UserNavigation/UserDetailsScreen';
import { UsersManageScreen } from '../Screens/UserNavigation/UsersManageScreen';


export type UserStackParams = {
    userManageScreen: undefined
    userDetailsScreen: undefined
}

const Stack = createStackNavigator<UserStackParams>();

export const UserNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="userManageScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="userManageScreen" component={UsersManageScreen} />
            <Stack.Screen name="userDetailsScreen" component={UserDetailsScreen} />
        </Stack.Navigator>
    );
}