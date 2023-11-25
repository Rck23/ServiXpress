import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";

export const ServicesStyles = StyleSheet.create({
    Header: {
        height: 300,
        backgroundColor: mainColors.blue,
        marginVertical: -10,
        marginHorizontal: -10,
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 200,
        backgroundColor: mainColors.black,
        borderColor: mainColors.white,
        borderWidth: 4,
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        color: mainColors.purpule,
        fontWeight: "bold",
        marginBottom: 15
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: mainColors.white
    },
    DataContainer: {
        width: "100%",
        flexDirection: "column",
        marginBottom: 10,
        textAlign: "justify"
    },
    DataTitle: {
        fontSize: 20,
        marginBottom: 5,
        color: mainColors.purpule3,
        fontWeight: "bold"
    },
    DataValue: {
        fontSize: 20,
        borderBottomColor: mainColors.ligtgray,
        borderBottomWidth: 2
    },
    bodyText: {
        fontSize: 15
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
    }
})