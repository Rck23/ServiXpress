import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { useState } from 'react';
import { LoginStyles } from '../Styles/LoginRegisterStyles';
import { mainColors } from '../Constants/Values';
import { Icon } from '../Components/Shared/IconComponents';

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
                style={LoginStyles.backgroundImage}
            >
                <View style={LoginStyles.container}>
                    <Image
                        source={require('../Images/Logo.png')}
                        style={LoginStyles.logo}
                    ></Image>
                    <Text style={LoginStyles.title}>Iniciar Sesión</Text>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Nombre de usuario"
                        placeholderTextColor={mainColors.purpule}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Contraseña"
                        placeholderTextColor={mainColors.purpule}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />

                    <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
                        <Icon name='login' library='antDesign' color={mainColors.white}/>
                        <Text style={LoginStyles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={LoginStyles.BotonRegistrar} onPress={() => navigation.navigate("registerScreen")}>
                        <Text style={LoginStyles.BotonRegistrarText}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={LoginStyles.BotonRecuperar} onPress={() => navigation.navigate("recoveryScreen")}>
                        <Text style={LoginStyles.BotonRecuperarText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    )
}