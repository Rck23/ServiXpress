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
        width: "60%",
        backgroundColor: mainColors.purpule,
        padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    GlobalButtonText: {
        fontWeight: "bold",
        color: mainColors.white,
        textAlign: 'center',
        fontSize: 17
    },
    GlobalButtonIcon: {
        fontSize: 17,
        margin: "auto",
        color: mainColors.white,
        fontWeight: "bold"
    },
    GlobalHipervinculo: {
        padding: 2,
        marginTop: 10,
        borderBottomColor: mainColors.purpule,
        borderBottomWidth: 2
    },
    GlobalHipervinculoText: {
        fontWeight: "bold",
        color: mainColors.purpule,
        textAlign: 'center',
        fontSize: 15
    },
    GlobalcontainerStyle: {
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.78)"
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
})