import { StyleSheet } from 'react-native';

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
        bottom: 10,
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10
    },
    encabezado: {
        fontSize: 25,
        color: "#3C3C3C",
        fontWeight: "bold",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingLeft: 10
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
        width: "90%",
        borderColor: "grey",
        borderWidth: 1,
        marginBottom: 40,
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 19,
        color: "black"
    },
    boton: {
        width: 100,
        backgroundColor: '#74BCFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        left: 260
    },
    botonText: {
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center',
        fontSize: 15
    }
});