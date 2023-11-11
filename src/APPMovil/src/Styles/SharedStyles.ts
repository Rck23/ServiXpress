import { StyleSheet, TextStyle } from 'react-native';
import { mainColors } from '../Constants/Values';

const shadow = {
    shadowColor: mainColors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
};

export const GlobalStyles = StyleSheet.create({
    boxShadow: {
        ...shadow
    },
    Scrollview: {
    },
    globalInputContainer: {
        width: '100%',
        marginVertical: 5
    },
    GlobalInput: {
        width: "100%",
        borderColor: mainColors.gray,
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        color: mainColors.purpule3,
        fontSize: 15
    },
    GlobalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    globalButtonSmall: {
        paddingVertical: 5
    },
    GlobalButtonText: {
        fontWeight: "600",
        textAlign: 'center',
        fontSize: 16,
    },
    globalButtonTextSmall: {
        fontSize: 13,
    },
    globalButtonIconSmall: {
        fontSize: 14
    },
    GlobalButtonIcon: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10
    },
    GlobalHipervinculo: {
        padding: 2,
        marginVertical: 5,
        borderBottomColor: mainColors.purpule,
        borderBottomWidth: 2
    },
    GlobalHipervinculoText: {
        fontWeight: "bold",
        color: mainColors.purpule,
        textAlign: 'center',
        fontSize: 15
    },
    Globalcontainerdad: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.78)"
    },
    Globalcontainer: {
        backgroundColor: mainColors.white,
        borderRadius: 10,
        width: '100%',
        ...shadow,
        padding: 5
    },
    GlobalBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    GlobalButtonPrincipal: {
        backgroundColor: mainColors.white,
        borderColor: mainColors.gray,
        ...shadow,
        borderWidth: 1,
        paddingVertical: 35,
        marginVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    GlobalButtonIconPrincipal: {
        color: mainColors.gray,
        fontSize: 25,
        alignSelf: "center"
    },
    GlobalButtonTextPrincipal: {
        color: mainColors.gray,
        fontSize: 20,
        alignSelf: "center"
    },
    GlobalLogo: {
        width: 226.09,
        height: 100,
        bottom: 4,
        alignSelf: 'center'
    },
    GlobalItem: {
        borderLeftWidth: 5,
        borderLeftColor: mainColors.purpule3,
        padding: 15,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: mainColors.white,
        ...shadow
    },
    GlobalItemText: {
        fontSize: 17,
        bottom: 2,
        textAlign: 'justify',
        fontWeight: 'bold',
        color: mainColors.black
    },
    Globalitemicon: {
        fontSize: 20,
        textAlign: 'justify',
        fontWeight: 'bold',
        color: mainColors.black,
        marginRight: 10
    },
    Globalcontaineruser: {
        paddingVertical: 50,
        backgroundColor: mainColors.white,
        width: "90%",
        borderRadius: 10,
        padding: 10
    },
    row: {
        flexDirection: 'row'
    },
    Titulo: {
        color: mainColors.purpule,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    Dato: {
        color: mainColors.black,
        fontSize: 17,
        textAlign: 'justify'
    },
    DatCont: {
        marginBottom: 30
    },
    ScrollContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})