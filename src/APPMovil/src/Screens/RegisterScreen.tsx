import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { RegisterStyles } from '../Styles/LoginRegisterStyles';
import { useContext } from 'react';
import { ButtonGlobal, InputGlobal } from '../Components/Shared/FormsComponents';
import { AuthContext } from '../Context/Auth/Context';
import { UseRegisterUserForm } from '../Hooks/UseRegisterUserForm';
import { GlobalStyles } from '../Styles/SharedStyles';

interface Props extends StackScreenProps<AuthStackParams, 'registerScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {
    const { SignUp } = useContext(AuthContext)
    const { Nombre, Apellidos, Telefono, Email, Password, OnChange, form } = UseRegisterUserForm({
        Rol: 0
    })

    const HandleRegister = async () => {
        await SignUp(form)
    }

    return (
        <>
            <ImageBackground
                source={require('../Images/Background.jpg')}
                style={RegisterStyles.backgroundImage}
            >
                <View style={GlobalStyles.Globalcontainerdad}>
                    <Image
                        source={require('../Images/Logo.png')}
                        style={RegisterStyles.logo}
                    ></Image>

                    <InputGlobal
                        placeholder='Nombre(s)'
                        value={Nombre ?? ''}
                        onChange={(value) => OnChange(value, 'Nombre')} />

                    <InputGlobal
                        placeholder='Apellidos'
                        value={Apellidos ?? ''}
                        onChange={(value) => OnChange(value, 'Apellidos')} />

                    <InputGlobal
                        placeholder='Numero de telefono'
                        value={Telefono ?? ''}
                        onChange={(value) => OnChange(value, 'Telefono')} />

                    <InputGlobal
                        placeholder='Correo electrónico'
                        value={Email ?? ''}
                        onChange={(value) => OnChange(value, 'Email')} />

                    <InputGlobal
                        placeholder='Contraseña'
                        value={Password ?? ''}
                        onChange={(value) => OnChange(value, 'Password')} />
                    {/* 
                    <InputGlobal
                        placeholder='Tipo de trabajador'
                        value={Role}
                        onChange={setTypeuser} /> */}

                    <ButtonGlobal
                        text='Crear cuenta'
                        icon={{ name: 'adduser', library: 'antDesign' }}
                        onClick={HandleRegister} />
                </View>
            </ImageBackground>
        </>
    )
}