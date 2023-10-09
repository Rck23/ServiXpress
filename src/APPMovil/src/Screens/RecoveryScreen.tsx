import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { RecoveryStyles } from '../Styles/RecoveryStyles';
import { ButtonGlobal } from '../Components/Shared/FormsComponents';

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    return (
        <>
            <ImageBackground
                source={image}

                style={RecoveryStyles.backgroundImage}
            >
                <View style={RecoveryStyles.container}>
                    <View style={RecoveryStyles.contenedor}>
                        <Image
                            source={require('../Images/Logo.png')}
                            style={RecoveryStyles.logo}
                        ></Image>
                        <Text style={RecoveryStyles.encabezado}>Recupera tu contraseña</Text>

                        <Text style={RecoveryStyles.texto}>
                            Introduce tu correo electrónico para recuperar tu contraseña.
                        </Text>

                        <TextInput style={RecoveryStyles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="grey"
                        ></TextInput>


                        <ButtonGlobal text='Enviar' icon={{ name: 'send', library: 'fontAwesome' }} />
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}