import { StyleSheet } from 'react-native';
import { mainColors } from '../Constants/Values';
import { GlobalStyles } from './SharedStyles';

export const RecoveryStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.78)",
    },
    logo: {
        alignSelf: "center",
        width: 226.09,
        height: 100,
        marginBottom: 20
    },
    contenedor: {
        backgroundColor: mainColors.white,
        width: "90%",
        borderRadius: 10,
        ...GlobalStyles.boxShadow,
        padding: 5
    },
    encabezado: {
        fontSize: 25,
        color: mainColors.textColor,
        textAlign: 'center',
        padding: 8,
        fontWeight: "bold",
        borderBottomColor: mainColors.blackLight,
        borderBottomWidth: 1,
        marginBottom: 15
    },
    texto: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        color: "black",
        textAlign: "justify",
        marginBottom: 20
    },
    input: {
        alignSelf: "center",
        width: "95%",
        borderColor: mainColors.blackLight,
        borderWidth: 2,
        marginBottom: 40,
        borderRadius: 10,
        padding: 10,
        fontSize: 19,
        color: mainColors.textColor
    },
    boton: {
        backgroundColor: mainColors.purpule3,
        padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        marginHorizontal: 20
    },
    botonText: {
        fontWeight: "bold",
        color: mainColors.white,
        textAlign: 'center',
        fontSize: 15
    }
});