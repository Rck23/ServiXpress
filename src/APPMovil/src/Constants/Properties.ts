import { NavigationStyles } from "../Styles/NavigationStyles"
import { mainColors } from "./Values"

export const customScreenOpitons = {
    headerShown: true,
    headerTintColor: mainColors.white,
    headerStyle: NavigationStyles.headerStyle,
    headerTitleStyle: NavigationStyles.headerText,
}


export const customTabScreenOpitons = {
    headerShown: false,
    tabBarLabelStyle: NavigationStyles.labelText,
    tabBarStyle: NavigationStyles.styleTabBar,
    tabBarShowLabel: false
}