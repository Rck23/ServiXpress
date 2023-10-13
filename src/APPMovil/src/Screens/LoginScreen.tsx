import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { useState } from 'react';
import { LoginStyles } from '../Styles/LoginRegisterStyles';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal } from '../Components/Shared/FormsComponents';

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
                    />

                    <InputGlobal
                        placeholder='Correo electronico'
                        value={username}
                        onChange={setUsername} />
                    
                    <InputGlobal
                        placeholder='Contraseña'
                        value={password}
                        onChange={setPassword} />

                    <ButtonGlobal
                        text='Iniciar sesion'
                        icon={{name: 'login', library: 'antDesign'}} />
                    
                    <HipervinculoGlobal
                        text='Crear cuenta'
                        onClick={() => navigation.navigate("registerScreen")} />
                    
                    <HipervinculoGlobal
                        text='¿Olvidaste tu contraseña?'
                        onClick={() => navigation.navigate("recoveryScreen")} />
                </View>
            </ImageBackground>
        </>
    )
}