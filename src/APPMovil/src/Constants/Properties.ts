import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { NavigationStyles } from "../Styles/NavigationStyles"
import { mainColors } from "./Values"

export const customScreenOpitons = {
    headerShown: true,
    headerTintColor: mainColors.white,
    headerStyle: NavigationStyles.headerStyle,
    headerTitleStyle: NavigationStyles.headerText,
}


export const customTabScreenOpitons: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabelStyle: NavigationStyles.labelText,
    tabBarStyle: NavigationStyles.styleTabBar,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true
}


export type AlertIcons = 'success' | 'error' | 'info' | 'warning' | 'question'
export type IconLibraries = 'material' | 'ion' | 'zocial' | 'antDesign' | 'entypo' | 'evil' | 'fontAwesome' | 'foundation' | 'materialCommunity'