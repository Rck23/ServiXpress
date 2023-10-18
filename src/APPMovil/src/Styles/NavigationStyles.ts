import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";


export const NavigationStyles = StyleSheet.create({
    tab: {
        width: 60,
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
        position: 'absolute',
        bottom: 10,
        ...GlobalStyles.boxShadow,
        right: 10,
        left: 10,
        borderRadius: 50,
        padding: 0,
        paddingBottom: -5,
        paddingTop: 5,
        alignItems: 'center',
        alignContent: 'center',
        height: 70,
        backgroundColor: mainColors.white,
        borderWidth: 1,
        borderColor: mainColors.blackLight
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
