import { View, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { LoginStyles } from '../../Styles/LoginRegisterStyles';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal } from '../../Components/Shared/FormsComponents';
import { BackgroudImage, LogoImage, TextComponent } from '../../Components/Shared/SharedComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { AlertModal } from '../../Components/Modals/AlertModal';
import { AlertModalProps } from '../../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../../Helpers/GlobalFunctions';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { BlockUI } from '../../Components/Shared/BlockUI';

interface Props extends StackScreenProps<AuthStackParams, 'loginScreen'> { }

export const LoginScreen = ({ navigation, route }: Props) => {
    const { SignIn, RemoveAlert, result, status, messageRequest } = useContext(AuthContext)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (result && isFocused) return setAlertModal(ShootAlertOnResult({ ...result, title: 'Autenticación fallida' }, OnHideAlert))
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
            <BlockUI visible={status === 'requesting'} message={messageRequest} />
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            <BackgroudImage>
                <KeyboardAvoidingView style={GlobalStyles.Globalcontainerdad}>
                    <LogoImage />
                    <View style={GlobalStyles.Globalcontainer}>
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
            </BackgroudImage>
        </>
    )
}