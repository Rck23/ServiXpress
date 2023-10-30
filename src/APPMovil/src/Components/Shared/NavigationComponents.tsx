import { ParamListBase, RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import { Icon } from "./IconComponents";
import { NavigationStyles } from "../../Styles/NavigationStyles";
import { Appbar } from "react-native-paper";
import { TextComponent } from "./SharedComponents";

export const TabBarIconsRNode = (route: RouteProp<ParamListBase, string>, focused: boolean, color: string, size: number) => {
    let iconName = 'ios-ellipse';

    switch (route.name) {
        case 'servicesDetailsNavigatorScreen':
            iconName = focused ? 'grid' : 'grid-outline'
            break;
        case 'serviceNavigatorScreen':
            iconName = focused ? 'home' : 'home-outline'
            break;
        case 'servicesMapScreen':
            iconName = focused ? 'location' : 'location-outline'
            break;
        case 'servicesBoardScreen':
            iconName = focused ? 'grid' : 'grid-outline'
            break;
        case 'userNavigatorScreen':
            iconName = focused ? 'person' : 'person-outline'
            break;
        case 'profileScreen':
            iconName = focused ? 'person-circle' : 'person-circle-outline'
            break;
    }

    return <View style={focused ? [NavigationStyles.tab, NavigationStyles.focusedTab] : NavigationStyles.tab}>
        <View>
            <Icon style={focused ? NavigationStyles.focusedTabIcon : NavigationStyles.tabIcon} name={iconName} size={28} library='ion' />
        </View>
    </View>
}



/**
 * Contenedor de pantallas principal
 * @param param0 
 * @returns 
 */
export const ScreenContainer = ({ children }: any) => {
    return (
        <View style={{ flex: 1, position: 'relative', paddingHorizontal: 2, marginBottom: 0, paddingTop: 5, paddingBottom: 0 }}>
            {children}
        </View>
    )
}



type MainScreenHeaderProps = {
    title: string
}
export const MainScreenHeader = (props: MainScreenHeaderProps) => {
    return (
        <Appbar.Header style={NavigationStyles.headerStyle}>
            <TextComponent text={props.title} style={NavigationStyles.headerText} />
        </Appbar.Header>
    );
}