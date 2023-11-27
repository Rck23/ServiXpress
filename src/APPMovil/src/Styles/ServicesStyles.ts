import { Platform, StyleSheet } from "react-native";
import { mainColors } from "../Constants/Values";

export const ServicesStyles = StyleSheet.create({
    Header: {
        height: 350,
        backgroundColor: mainColors.lightpurple,
        marginVertical: -10,
        marginHorizontal: -10,
        borderBottomRightRadius: 350,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 2
    },
    UserContainer: {
        flexDirection: "row",
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
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: mainColors.white
    },
    DataContainer: {
        flexDirection: "row",
        marginBottom: 10,
        textAlign: "justify",
        alignItems: "center"
    },
    DataTitle: {
        fontSize: 20,
        color: mainColors.purpule3
    },
    DataValue: {
        fontSize: 18,
        marginLeft: 10,
        textAlign: "justify"
    },
    DescriptionContainer: {
        width: "88%"
    },
    Filter: {
        width: "100%",
        borderColor: mainColors.purpule,
        borderWidth: 2,
        alignSelf: "center",
        marginBottom: 2,
        borderRadius: 50,
        padding: 0,
        height: 45,
        color: mainColors.purpule
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
    }
})