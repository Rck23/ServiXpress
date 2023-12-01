import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";
import { GlobalStyles } from "./SharedStyles";

export const UserDetailsStyles = StyleSheet.create({
    Header: {
        height: 350,
        backgroundColor: mainColors.lightpurple,
        marginVertical: -10,
        marginHorizontal: -10,
        borderBottomRightRadius: 350,
        justifyContent: 'center',
        alignItems: "center"
    },
    UserContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    avatar: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 200,
        backgroundColor: mainColors.black,
        borderColor: mainColors.white,
        borderWidth: 4,
        marginBottom: 10
    },
    UserText: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 20
    },
    nombre: {
        fontSize: 18,
        color: mainColors.white,
        fontWeight: "bold"
    },
    servicio: {
        fontSize: 12,
        color: mainColors.ligtgray,
        fontWeight: "bold",
        textTransform: "capitalize"
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
        fontSize: 18,
        borderBottomColor: mainColors.ligtgray,
        borderBottomWidth: 2,
        textAlign: "justify"
    }
})