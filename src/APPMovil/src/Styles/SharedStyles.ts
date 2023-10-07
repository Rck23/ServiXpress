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
    }
})