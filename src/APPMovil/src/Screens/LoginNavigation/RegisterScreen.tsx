import { View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext, useState, useEffect } from 'react';
import { ButtonGlobal, InputGlobal } from '../../Components/Shared/FormsComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { BackgroudImage, LogoImage } from '../../Components/Shared/SharedComponents';
import { BlockUI } from '../../Components/Shared/BlockUI';
import { AlertModalProps } from '../../Interfaces/DOMInterfaces';
import { alertModalInitState, newUsuarioInitState } from '../../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../../Helpers/GlobalFunctions';
import { AlertModal } from '../../Components/Modals/AlertModal';
import { useIsFocused } from '@react-navigation/native';
import { UseForm } from '../../Hooks/UseForm';
import { RegisterUser } from '../../Interfaces/Usuario';

interface Props extends StackScreenProps<AuthStackParams, 'registerScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {
    const { SignUp, RemoveAlert, status, result, messageRequest } = useContext(AuthContext)
    const { Nombre, Apellidos, Telefono, Email, Password, onChange, form } = UseForm<RegisterUser>(newUsuarioInitState)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)
    const isFocused = useIsFocused();


    useEffect(() => {
        if (result && isFocused) return setAlertModal(ShootAlertOnResult({ ...result, title: 'No se ha registrado su cuenta correctamente' }, OnHideAlert))
    }, [result])

    const HandleRegister = async () => {
        await SignUp(form)
    }

    const OnHideAlert = () => {
        setAlertModal(alertModalInitState)
        RemoveAlert()
    }

    return (
        <>
            <BlockUI visible={status === 'requesting'} message={messageRequest} />
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            <BackgroudImage>
                <View style={GlobalStyles.Globalcontainerdad}>
                    <LogoImage />
                    <InputGlobal
                        placeholder='Nombre(s)'
                        value={Nombre ?? ''}
                        onChange={(value) => onChange(value, 'Nombre')} />

                    <InputGlobal
                        placeholder='Apellidos'
                        value={Apellidos ?? ''}
                        onChange={(value) => onChange(value, 'Apellidos')} />

                    <InputGlobal
                        placeholder='Numero de telefono'
                        value={Telefono ?? ''}
                        onChange={(value) => onChange(value, 'Telefono')} />

                    <InputGlobal
                        placeholder='Correo electrónico'
                        value={Email ?? ''}
                        onChange={(value) => onChange(value, 'Email')} />

                    <InputGlobal
                        placeholder='Contraseña'
                        value={Password ?? ''}
                        onChange={(value) => onChange(value, 'Password')} />
                    {/*  <InputGlobal
                        placeholder='Tipo de trabajador'
                        value={Role}
                        onChange={setTypeuser} /> */}

                    <ButtonGlobal
                        text='Crear cuenta'
                        icon={{ name: 'adduser', library: 'antDesign' }}
                        onClick={HandleRegister} />
                </View>
            </BackgroudImage>
        </>
    )
}