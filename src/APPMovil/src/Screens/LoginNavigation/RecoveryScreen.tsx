import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { RecoveryStyles } from '../../Styles/RecoveryStyles';
import { ButtonGlobal, InputGlobal } from '../../Components/Shared/FormsComponents';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { useContext, useState, useEffect } from 'react';
import { BackgroudImage, LogoImage, TextComponent } from '../../Components/Shared/SharedComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { useIsFocused } from '@react-navigation/native';
import { BlockUI } from '../../Components/Shared/BlockUI';
import { AlertModal } from '../../Components/Modals/AlertModal';
import { AlertModalProps } from '../../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../../Helpers/GlobalFunctions';

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    const { SendEmailResetPassword, RemoveAlert, result, status, messageRequest } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)
    const isFocused = useIsFocused();

    useEffect(() => {
        if (result && isFocused) return setAlertModal(ShootAlertOnResult(result, OnHideAlert))
    }, [result])


    const HandleSendEmail = async () => {
        await SendEmailResetPassword(email)
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
                    <View style={GlobalStyles.Globalcontainer}>
                        <LogoImage />
                        <Text style={RecoveryStyles.encabezado}>Recupera tu contraseña</Text>
                        <TextComponent text={'Introduce tu correo electrónico para recuperar tu contraseña.'} />

                        <InputGlobal
                            placeholder='Correo electrónico'
                            value={email}
                            onChange={setEmail} />


                        <ButtonGlobal
                            text='Enviar'
                            icon={{ name: 'send', library: 'fontAwesome' }}
                            onClick={HandleSendEmail}
                        />
                    </View>
                </View>
            </BackgroudImage>
        </>
    )
}