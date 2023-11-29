import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { RecoveryStyles } from '../../Styles/RecoveryStyles';
import { ButtonGlobal, FormScrollContainer, InputGlobal } from '../../Components/Shared/FormsComponents';
import { useContext, useEffect, useState } from 'react';
import { Col, LogoImage, Row, TextComponent } from '../../Components/Shared/SharedComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { ScreenContainer } from '../../Components/Shared/NavigationComponents';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { IconProps } from '../../Components/Shared/IconComponents';

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

type buttonConfirm = {
    enabled: boolean,
    icon: IconProps,
    text: string
    countdown: number
    color: { text: string, back: string }
}

const buttonInitState: buttonConfirm = {
    enabled: false,
    countdown: 10,
    icon: { name: 'clock', library: 'materialCommunity' },
    text: 'Espere... 10s',
    color: { text: mainColors.textColor, back: mainColors.blackLight }
}

export const RecoveryScreen = ({ navigation, route }: Props) => {
    const { SendEmailResetPassword } = useContext(AuthContext)
    const [buttonConfirm, setButtonConfirm] = useState<buttonConfirm>(buttonInitState)
    const [email, setEmail] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            if (buttonConfirm.countdown > 0 && !buttonConfirm.enabled) {
                const newCountdown = buttonConfirm.countdown - 1
                setButtonConfirm({ ...buttonConfirm, text: `Espere... ${newCountdown}s`, countdown: newCountdown })
            } else if (buttonConfirm.countdown == 0 && !buttonConfirm.enabled) {
                setButtonConfirm({ ...buttonConfirm, color: { text: mainColors.white, back: mainColors.dark }, icon: { name: 'send', library: 'materialCommunity' }, text: `Enviar`, countdown: 10, enabled: true })
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [buttonConfirm]);


    const HandleSendEmail = async () => {
        if (!buttonConfirm.enabled) return;
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

                        <Row>
                            <Col>
                                <ButtonGlobal
                                    color={buttonConfirm.color.back}
                                    disabled={!buttonConfirm.enabled}
                                    textColor={buttonConfirm.color.text}
                                    onClick={HandleSendEmail}
                                    icon={buttonConfirm.icon}
                                    text={buttonConfirm.text}
                                />
                            </Col>
                            <Col>
                                <ButtonGlobal
                                    text='Tengo el código'
                                    color={mainColors.purpule3}
                                    textColor={mainColors.white}
                                    icon={{ name: 'account-key', library: 'materialCommunity' }}
                                    onClick={() => navigation.navigate('resetPasswordScreen')}
                                />
                            </Col>
                        </Row>
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