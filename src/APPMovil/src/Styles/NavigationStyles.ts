import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";


export const NavigationStyles = StyleSheet.create({
    tab: {
        width: 55,
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedTab: {
        backgroundColor: mainColors.purpule3,
        top: -10,
        ...GlobalStyles.boxShadow
    },
    focusedTabIcon: {
        color: mainColors.white,
        fontSize: 30
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
        height: 60,
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
    }
})
