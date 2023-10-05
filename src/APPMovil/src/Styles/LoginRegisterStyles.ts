import { StyleSheet } from 'react-native';

export const LoginStyles = StyleSheet.create({
    container: {
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
        color: "#545454",
        fontWeight: 'bold'
    },
    input: {
        width: 340,
        height: 60,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 40,
        color: "black",
        fontSize: 20
    },
    button: {
        width: 250,
        backgroundColor: '#74BCFF',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    buttonText: {
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center',
        fontSize: 23
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    BotonRegistrar: {
        width: 90,
        padding: 2,
        marginBottom: 10,
        borderBottomColor: 'rgb(75, 3, 75)',
        borderBottomWidth: 2
    },
    BotonRegistrarText: {
        fontWeight: "bold",
        color: 'rgb(75, 3, 75)',
        textAlign: 'center',
        fontSize: 15
    },
    BotonRecuperar: {
        width: 170,
        padding: 2,
        borderBottomColor: 'rgb(75, 3, 75)',
        borderBottomWidth: 2
    },
    BotonRecuperarText: {
        fontWeight: "bold",
        color: 'rgb(75, 3, 75)',
        textAlign: 'center',
        fontSize: 15
    }
});

export const RegisterStyles = StyleSheet.create({
    container: {
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
        color: "#545454",
        fontWeight: 'bold'
    },
    input: {
        width: 340,
        height: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
        color: "black",
        fontSize: 15
    },
    button: {
        width: 250,
        backgroundColor: '#74BCFF',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    buttonText: {
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center',
        fontSize: 23
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})