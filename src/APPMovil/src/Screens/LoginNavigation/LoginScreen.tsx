import { View, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext, useState } from 'react';
import { LoginStyles } from '../../Styles/LoginRegisterStyles';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal, useTogglePasswordVisibility } from '../../Components/Shared/FormsComponents';
import { BackgroudImage, LogoImage, TextComponent } from '../../Components/Shared/SharedComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { mainColors } from '../../Constants/Values';

interface Props extends StackScreenProps<AuthStackParams, 'loginScreen'> { }

export const LoginScreen = ({ navigation, route }: Props) => {
    const { SignIn } = useContext(AuthContext)
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const HandleLogin = async () => {
        await SignIn(username, password)
    };

    return (
        <>
            <BackgroudImage>
                <KeyboardAvoidingView style={GlobalStyles.Globalcontainerdad}>
                    <LogoImage />
                    <View style={LoginStyles.formContainer}>
                        <TextComponent style={LoginStyles.titleLogin} text='Iniciar sesión' />
                        <InputGlobal
                            placeholder='Correo electronico'
                            value={username}
                            showLabel
                            onChange={setUsername} />

                        <InputGlobal
                            placeholder='Contraseña'
                            value={password}
                            secureText={passwordVisibility}
                            rightIcon={{ name: rightIcon, library: 'material' }}
                            OnRightButtonPress={handlePasswordVisibility}
                            showLabel
                            onChange={setPassword} />

                        <View style={LoginStyles.footer}>
                            <ButtonGlobal
                                text='Iniciar sesion'
                                icon={{ name: 'login', library: 'antDesign' }}
                                onClick={HandleLogin} />

                            <ButtonGlobal
                                text='Crear cuenta'
                                color={mainColors.light}
                                textColor={mainColors.purpule3}
                                icon={{ name: 'user-plus', library: 'fontAwesome' }}
                                onClick={() => navigation.navigate("registerScreen")} />

                            <HipervinculoGlobal
                                text='¿Olvidaste tu contraseña?'
                                onClick={() => navigation.navigate("recoveryScreen")} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </BackgroudImage>
        </>
    )
}