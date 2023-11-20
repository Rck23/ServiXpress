import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { RecoveryStyles } from '../../Styles/RecoveryStyles';
import { ButtonGlobal, FormScrollContainer, InputGlobal } from '../../Components/Shared/FormsComponents';
import { useContext, useState } from 'react';
import { LogoImage, TextComponent } from '../../Components/Shared/SharedComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { ScreenContainer } from '../../Components/Shared/NavigationComponents';
import { LoginStyles } from '../../Styles/LoginRegisterStyles';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    const { SendEmailResetPassword } = useContext(AuthContext)
    const [email, setEmail] = useState('');


    const HandleSendEmail = async () => {
        await SendEmailResetPassword(email)
    }

    return (
        <>
            <ScreenContainer>
                <FormScrollContainer>
                    <View style={GlobalStyles.cardContainer}>
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
                        <ButtonGlobal
                            text='Tengo el código'
                            color={mainColors.blackLight}
                            textColor={mainColors.purpule3}
                            icon={{ name: 'account-key', library: 'materialCommunity' }}
                            onClick={() => navigation.navigate('resetPasswordScreen')}
                        />
                        <ButtonGlobal
                            icon={{ name: 'arrow-left', library: 'fontAwesome' }}
                            text="Regresar"
                            onClick={() => navigation.goBack()}
                            color={mainColors.light}
                            textColor={mainColors.textColor}
                        />
                    </View>
                </FormScrollContainer>
            </ScreenContainer>
        </>
    )
}