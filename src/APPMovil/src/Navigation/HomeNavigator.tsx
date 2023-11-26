import { useContext, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServicesBoardScreen } from '../Screens/ServiceNavigation/ServicesBoardScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TabBarIconsRNode } from '../Components/Shared/NavigationComponents';
import { ServiceNavigator } from './ServiceNavigator';
import { UserNavigator } from './UserNavigator';
import { customTabScreenOpitons, customScreenOpitons } from '../Constants/Properties';
import { ServicesProvider } from '../Context/Services/Context';
import { AuthContext } from '../Context/Auth/Context';
import { mainColors } from '../Constants/Values';
import { ButtonRoundedIcon } from '../Components/Shared/SharedComponents';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { AlertModal } from '../Components/Modals/AlertModal';

export type HomeStackParams = {
    serviceNavigatorScreen: undefined
    profileScreen: undefined
    userNavigatorScreen: undefined
    servicesBoardScreen: undefined
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
    const { user, LogOut } = useContext(AuthContext)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)

    return (
        <HomeState>
            <AlertModal {...alertModal} OnHideAlert={() => setAlertModal(alertModalInitState)} />

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
                <Tab.Screen options={{ ...customScreenOpitons, title: 'Tablero de servicios' }} name="servicesBoardScreen" component={ServicesBoardScreen} />

                {
                    user?.roles[0]?.toLowerCase() === 'agente' &&
                    <Tab.Screen name="userNavigatorScreen" component={UserNavigator} />
                }

                <Tab.Screen
                    options={{
                        ...customScreenOpitons,
                        title: 'Mi perfil',
                        headerRight: () => (
                            <ButtonRoundedIcon
                                icon={{ name: 'log-out', library: 'ion' }}
                                onPress={() => {
                                    setAlertModal({ ...alertModal, title: '¿Cerrar sesión?', OnConfirmAction: LogOut, icon: 'question', visible: true })
                                }}
                                bgColor={mainColors.white}
                                iconColor={mainColors.purpule3}
                                size={40}
                            />
                        ),
                    }}
                    name="profileScreen"
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </HomeState>
    );
}