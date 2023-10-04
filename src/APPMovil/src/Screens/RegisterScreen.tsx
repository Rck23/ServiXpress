import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { RegisterStyles } from '../Styles/LoginRegisterStyles';

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

interface Props extends StackScreenProps<AuthStackParams, 'registerScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {
    return (
        <>
            <ImageBackground
                source={image}

                style={RegisterStyles.backgroundImage}
            >
                <View style={RegisterStyles.container}>
                    <Image
                        source={require('../Images/Logo.png')}
                        style={RegisterStyles.logo}
                    ></Image>

                    <Text style={RegisterStyles.title}>Registrate</Text>

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Nombre(s)"
                        placeholderTextColor="rgb(75, 3, 75)"
                    />

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Apellidos"
                        placeholderTextColor="rgb(75, 3, 75)"
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Teléfono"
                        placeholderTextColor="rgb(75, 3, 75)"
                    />

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="rgb(75, 3, 75)"
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="rgb(75, 3, 75)"
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Tipo de usuario"
                        placeholderTextColor="rgb(75, 3, 75)"
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={RegisterStyles.button}>
                        <Text style={RegisterStyles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    )
}