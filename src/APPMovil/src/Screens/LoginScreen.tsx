import { View, ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { useContext, useEffect, useState } from 'react';
import { LoginStyles } from '../Styles/LoginRegisterStyles';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal } from '../Components/Shared/FormsComponents';
import { TextComponent } from '../Components/Shared/SharedComponents';
import { AuthContext } from '../Context/Auth/Context';
import { AlertModal } from '../Components/Modals/AlertModal';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../Helpers/GlobalFunctions';

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

interface Props extends StackScreenProps<AuthStackParams, 'loginScreen'> { }

export const LoginScreen = ({ navigation, route }: Props) => {
    const { SignIn, RemoveAlert, result } = useContext(AuthContext)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (result) return setAlertModal(ShootAlertOnResult(result, OnHideAlert))
    }, [result])

    const HandleLogin = async () => {
        await SignIn(username, password)
    };

    const OnHideAlert = () => {
        setAlertModal(alertModalInitState)
        RemoveAlert()
    }

    return (
        <>
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            <ImageBackground
                source={image}
                style={LoginStyles.backgroundImage}
            >
                <KeyboardAvoidingView style={LoginStyles.container}>
                    <Image
                        source={require('../Images/Logo.png')}
                        style={LoginStyles.logo}
                    />

                    <View style={LoginStyles.formContainer}>
                        <TextComponent style={LoginStyles.titleLogin} text='Iniciar sesión' />
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
                            icon={{ name: 'login', library: 'antDesign' }}
                            onClick={HandleLogin} />

                        <HipervinculoGlobal
                            text='Crear cuenta'
                            onClick={() => navigation.navigate("registerScreen")} />

                        <HipervinculoGlobal
                            text='¿Olvidaste tu contraseña?'
                            onClick={() => navigation.navigate("recoveryScreen")} />
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </>
    )
}