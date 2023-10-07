import { StyleSheet } from 'react-native';
import { mainColors } from '../Constants/Values';

export const LoginStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.78)",
    },
    logo: {
        width: 226.09,
        height: 100,
        bottom: 75
    },
    title: {
        right: 85,
        fontSize: 30,
        marginBottom: 20,
        color: mainColors.textColor,
        fontWeight: 'bold'
    },
    buttonText: {
        fontWeight: "bold",
        color: mainColors.white,
        textAlign: 'center',
        fontSize: 23
    },
    buttonicon: {
        fontSize: 23,
        margin: "auto"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    BotonRegistrar: {
        padding: 2,
        marginBottom: 10,
        borderBottomColor: mainColors.purpule,
        borderBottomWidth: 2
    },
    BotonRegistrarText: {
        fontWeight: "bold",
        color: mainColors.purpule2,
        textAlign: 'center',
        fontSize: 15
    },
    BotonRecuperar: {
        padding: 2,
        borderBottomColor: mainColors.purpule2,
        borderBottomWidth: 2
    },
    BotonRecuperarText: {
        fontWeight: "bold",
        color: mainColors.purpule2,
        textAlign: 'center',
        fontSize: 15
    }
});




export const RegisterStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.78)",
    },
    logo: {
        width: 226.09,
        height: 100,
        bottom: 15
    },
    title: {
        right: 105,
        fontSize: 30,
        marginBottom: 10,
        color: mainColors.textColor,
        fontWeight: 'bold'
    },
    input: {
        width: 340,
        height: 50,
        borderColor: mainColors.textColor,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
        color: mainColors.textColor,
        fontSize: 15
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})