import { Image, Text, View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { RecoveryStyles } from "../../Styles/RecoveryStyles";

interface Props extends StackScreenProps<AuthStackParams, 'resetPasswordScreen'> { }

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

export const ResetPasswordScreen = ({ navigation, route }: Props) => {
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [countdown, setCountdown] = useState(30); // tiempo del contador del boton

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0 && !buttonEnabled) {
                setCountdown(countdown - 1);
            } else if (countdown === 0 && !buttonEnabled) {
                setCountdown(30); // tiempo del contador del boton
                setButtonEnabled(true);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [countdown, buttonEnabled]);

    const handleButtonPress = () => {
        if (buttonEnabled) {
            setButtonEnabled(false);
        }
    };

    return (
        <View style={GlobalStyles.Globalcontainer}>
            <View style={GlobalStyles.Globalcontainerdad}>
                <Image
                    source={require('./Images/Logo.png')}
                    style={GlobalStyles.GlobalLogo}
                ></Image>
                <Text style={RecoveryStyles.encabezado}>Correo Enviado</Text>
                <Text style={RecoveryStyles.texto}>
                    Enviamos un codigo de verificacion a tu correo electronico, introduce tu codigo aquí
                </Text>
                <TextInput style={RecoveryStyles.input}
                    placeholder="Codigo"
                    placeholderTextColor="grey"
                    keyboardType="numeric"
                ></TextInput>
                <TouchableOpacity onPress={handleButtonPress} disabled={!buttonEnabled} style={{
                    backgroundColor: buttonEnabled ? 'blue' : 'gray',
                    padding: 10,
                    borderRadius: 50,
                    marginBottom: 10,
                    marginHorizontal: 20
                }}>
                    <Text style={RecoveryStyles.botonText}>{buttonEnabled ? 'Reenviar codigo' : `Espera... (${countdown})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={RecoveryStyles.boton}>
                    <Text style={RecoveryStyles.botonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}