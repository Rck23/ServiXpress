import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";
import { RegisterStyles } from '../Styles/LoginRegisterStyles';
import { useState } from 'react';
import { ButtonGlobal, InputGlobal } from '../Components/Shared/FormsComponents';

const image = { uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg' };

interface Props extends StackScreenProps<AuthStackParams, 'registerScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeuser, setTypeuser] = useState('');

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

                    <InputGlobal
                        placeholder='Nombre(s)'
                        value={name}
                        onChange={setName} />
                    
                    <InputGlobal
                        placeholder='Apellidos'
                        value={lastname}
                        onChange={setLastname} />
                    
                    <InputGlobal
                        placeholder='Numero de telefono'
                        value={phone}
                        onChange={setPhone} />
                    
                    <InputGlobal
                        placeholder='Correo electrónico'
                        value={email}
                        onChange={setEmail} />
                    
                    <InputGlobal
                        placeholder='Contraseña'
                        value={password}
                        onChange={setPassword} />
                    
                    <InputGlobal
                        placeholder='Tipo de trabajador'
                        value={typeuser}
                        onChange={setTypeuser} />

                    <ButtonGlobal
                        text='Crear cuenta'
                        icon={{name: 'adduser', library: 'antDesign'}}
                        onClick={() => navigation.navigate("loginScreen")} />
                </View>
            </ImageBackground>
        </>
    )
}