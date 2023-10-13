import { StyleSheet } from 'react-native';
import { mainColors } from '../Constants/Values';

export const GlobalStyles = StyleSheet.create({
    boxShadow: {
        shadowColor: mainColors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3
    },
    Scrollview: {
        bottom: 20,
        marginVertical: 30,
        padding: 10
    },
    GlobalInput: {
        width: "100%",
        borderColor: mainColors.textColor,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
        color: mainColors.textColor,
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
        width: "95%",
        borderRadius: 10,
        shadowColor: mainColors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        padding: 5
    },
    GlobalBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    GlobalButtonPrincipal: {
        bottom: 20,
        width: 310,
        backgroundColor: mainColors.white,
        borderColor: mainColors.gray,
        borderWidth: 1,
        paddingVertical: 35,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 25,
        flexDirection: "column"
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
})