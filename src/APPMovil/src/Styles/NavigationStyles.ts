import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";


export const NavigationStyles = StyleSheet.create({
    tab: {
        width: 53,
        borderRadius: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedTab: {
        backgroundColor: mainColors.white,
        borderColor: mainColors.purpule3,
        borderWidth: 3,
        top: -10,
        ...GlobalStyles.boxShadow
    },
    focusedTabIcon: {
        color: mainColors.purpule3,
        fontSize: 35
    },
    tabIcon: {
        color: mainColors.gray
    },
    styleTabBar: {
        bottom: 5,
        ...GlobalStyles.boxShadow,
        borderRadius: 50,
        alignItems: 'center',
        alignContent: 'center',
        height: 53,
        backgroundColor: mainColors.white,
        borderColor: mainColors.blackLight,
    },
    labelText: {
        color: mainColors.gray,
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 8
    },
    headerStyle: {
        backgroundColor: mainColors.purpule3,
        ...GlobalStyles.boxShadow
    },
    headerText: {
        color: mainColors.white,
        textTransform: "uppercase"
    },
    Screencontainer: {
        flex: 1,
        position: 'relative',
        paddingBottom: Platform.OS == 'ios' ? 105 : 80,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%"
    }
})
