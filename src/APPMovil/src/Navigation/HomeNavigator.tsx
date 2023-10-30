import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServicesMapScreen } from '../Screens/ServicesMapScreen';
import { ServicesBoardScreen } from '../Screens/ServiceNavigation/ServicesBoardScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TabBarIconsRNode } from '../Components/Shared/NavigationComponents';
import { ServiceNavigator } from './ServiceNavigator';
import { UserNavigator } from './UserNavigator';
import { customTabScreenOpitons, customScreenOpitons } from '../Constants/Properties';
import { ServicesProvider } from '../Context/Services/Context';

export type HomeStackParams = {
    serviceNavigatorScreen: undefined
    servicesMapScreen: undefined
    profileScreen: undefined
    userNavigatorScreen: undefined
    servicesBoardScreen: undefined
    servicesDetailsNavigatorScreen: undefined
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
                    ...customTabScreenOpitons,
                })}
            >
                <Tab.Screen name="serviceNavigatorScreen" component={ServiceNavigator} />
                <Tab.Screen options={{ ...customScreenOpitons, title: 'Servicios por ubicación' }} name="servicesMapScreen" component={ServicesMapScreen} />
                <Tab.Screen options={{ ...customScreenOpitons, title: 'Tablero de servicios' }} name="servicesBoardScreen" component={ServicesBoardScreen} />
                <Tab.Screen name="userNavigatorScreen" component={UserNavigator} />
                <Tab.Screen options={{ ...customScreenOpitons, title: 'Mi perfil' }} name="profileScreen" component={ProfileScreen} />
            </Tab.Navigator>
        </HomeState>
    );
}