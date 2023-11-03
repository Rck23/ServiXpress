import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: mainColors.white
    },
    headerText: {
        fontSize: 20,
        color: mainColors.purpule3
    },
    bodyText: {
        fontSize: 15
    },
    avatar: {
        marginVertical: 10
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: mainColors.blackLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
})