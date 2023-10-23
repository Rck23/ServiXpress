import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServicesMapScreen } from '../Screens/ServicesMapScreen';
import { ServicesBoardScreen } from '../Screens/ServicesBoardScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TabBarIconsRNode } from '../Components/Shared/NavigationComponents';
import { ServiceNavigator } from './ServiceNavigator';
import { UserNavigator } from './UserNavigator';
import { customTabScreenOpitons } from '../Constants/Properties';
import { ServicesProvider } from '../Context/Services/Context';

export type HomeStackParams = {
    serviceNavigatorScreen: undefined
    servicesMapScreen: undefined
    servicesBoardScreen: undefined
    usersManageScreen: undefined
    profileScreen: undefined
    userNavigatorScreen: undefined
}

const HomeState = ({ children }: any) => {
    return (
        <ServicesProvider>
            {children}
        </ServicesProvider>
    )
}


const Tab = createBottomTabNavigator<HomeStackParams>();

export const HomeNavigator = () => {
    return (
        <HomeState>
            <Tab.Navigator
                initialRouteName="serviceNavigatorScreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return TabBarIconsRNode(route, focused, color, size)
                    },
                    ...customTabScreenOpitons
                })}
            >
                <Tab.Screen name="serviceNavigatorScreen" component={ServiceNavigator} />
                <Tab.Screen options={{ headerShown: true, title: 'Servicios' }} name="servicesMapScreen" component={ServicesMapScreen} />
                <Tab.Screen options={{ headerShown: true, title: 'Tablero' }} name="servicesBoardScreen" component={ServicesBoardScreen} />
                <Tab.Screen name="userNavigatorScreen" component={UserNavigator} />
                <Tab.Screen options={{ headerShown: true, title: 'Perfil' }} name="profileScreen" component={ProfileScreen} />
            </Tab.Navigator>
        </HomeState>
    );
}