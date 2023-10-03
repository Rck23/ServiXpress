import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { useState } from 'react';

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

interface Props extends StackScreenProps<AuthStackParams, 'loginScreen'> { }

export const LoginScreen = ({ navigation, route }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aquí puedes agregar la lógica para verificar las credenciales
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <>
            <ImageBackground
                source={image}

                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../Images/Logo.png')}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de usuario"
                        placeholderTextColor="rgb(75, 3, 75)"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="rgb(75, 3, 75)"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.BotonRegistrar} onPress={handleLogin}>
                        <Text style={styles.BotonRegistrarText}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <Text
                        style={styles.recuperacion}
                    >¿Olvidaste la contraseña?</Text>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
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
    recuperacion: {
        color: "black",
        fontSize: 15,
        marginBottom: 15
    },
    BotonRegistrar: {
        width: 90,
        padding: 2,
        marginBottom: 7,
        borderBottomColor: 'rgb(75, 3, 75)',
        borderBottomWidth: 2
    },
    BotonRegistrarText: {
        fontWeight: "bold",
        color: 'rgb(75, 3, 75)',
        textAlign: 'center',
        fontSize: 15
    }
});