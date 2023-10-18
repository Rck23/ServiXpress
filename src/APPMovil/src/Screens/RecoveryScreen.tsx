import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { RecoveryStyles } from '../Styles/RecoveryStyles';
import { ButtonGlobal, InputGlobal } from '../Components/Shared/FormsComponents';
import { GlobalStyles } from '../Styles/SharedStyles';
import { useState } from 'react';

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    const [recovery, setRecovery] = useState('');

    return (
        <>
            <ImageBackground
                source={require('../Images/Background.jpg')}

                style={GlobalStyles.GlobalBackground}
            >
                <View style={GlobalStyles.Globalcontainerdad}>
                    <View style={GlobalStyles.Globalcontainer}>
                        <Image
                            source={require('../Images/Logo.png')}
                            style={RecoveryStyles.logo}
                        ></Image>
                        <Text style={RecoveryStyles.encabezado}>Recupera tu contraseña</Text>

                        <Text style={RecoveryStyles.texto}>
                            Introduce tu correo electrónico para recuperar tu contraseña.
                        </Text>

                        <InputGlobal
                            placeholder='Correo electrónico'
                            value={recovery}
                            onChange={setRecovery} />


                        <ButtonGlobal
                            text='Enviar'
                            icon={{ name: 'send', library: 'fontAwesome' }} />
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}