import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { RecoveryStyles } from '../../Styles/RecoveryStyles';
import { ButtonGlobal, InputGlobal } from '../../Components/Shared/FormsComponents';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { useState } from 'react';
import { BackgroudImage, LogoImage } from '../../Components/Shared/SharedComponents';

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    const [recovery, setRecovery] = useState('');

    return (
        <>
            <BackgroudImage>
                <View style={GlobalStyles.Globalcontainerdad}>
                    <View style={GlobalStyles.Globalcontainer}>
                        <LogoImage />

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
            </BackgroudImage>
        </>
    )
}