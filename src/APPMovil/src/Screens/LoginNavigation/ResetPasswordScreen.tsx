import { FlatListComponent, Text, TextInput, TouchableOpacity, View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext, useEffect, useState } from "react";
import { RecoveryStyles } from "../../Styles/RecoveryStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ButtonGlobal, FormScrollContainer, InputGlobal } from "../../Components/Shared/FormsComponents";
import { UseForm } from "../../Hooks/UseForm";
import { mainColors } from "../../Constants/Values";
import { IconProps } from "../../Components/Shared/IconComponents";
import { AuthContext } from "../../Context/Auth/Context";
import { ResetPassword } from "../../Interfaces/DataResponse";

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

interface Props extends StackScreenProps<AuthStackParams, 'resetPasswordScreen'> { }

export const ResetPasswordScreen = ({ navigation, route }: Props) => {
    const { ResetPassword } = useContext(AuthContext)
    const [buttonConfirm, setButtonConfirm] = useState<buttonConfirm>(buttonInitState)
    const { token, password, confirmPassword, form, onChange } = UseForm<ResetPassword>({ token: '', password: '', confirmPassword: '', email: '' })

    useEffect(() => {
        const timer = setInterval(() => {
            if (buttonConfirm.countdown > 0 && !buttonConfirm.enabled) {
                const newCountdown = buttonConfirm.countdown - 1
                setButtonConfirm({ ...buttonConfirm, text: `Espere... ${newCountdown}s`, countdown: newCountdown })
            } else if (buttonConfirm.countdown == 0 && !buttonConfirm.enabled) {
                setButtonConfirm({ ...buttonConfirm, color: { text: mainColors.white, back: mainColors.purpule3 }, icon: { name: 'check-all', library: 'materialCommunity' }, text: `Guardar`, countdown: 30, enabled: true })
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [buttonConfirm]);

    const handleButtonPress = async () => {
        await ResetPassword(form)
    };

    return (
        <ScreenContainer>
            <View style={RecoveryStyles.container}>
                <View style={[GlobalStyles.cardContainer]}>
                    <FormScrollContainer>
                        <TextComponent style={RecoveryStyles.encabezado} text='Introduce el código que te enviamos por correo y tu nueva contraseña' />
                        <InputGlobal
                            placeholder="Código"
                            showLabel
                            value={token}
                            onChange={(value) => onChange(value, 'token')}
                        />
                        <InputGlobal
                            placeholder="Contraseña"
                            showLabel
                            secureText
                            value={password}
                            onChange={(value) => onChange(value, 'password')}
                        />
                        <InputGlobal
                            placeholder="Confirma la contrasña"
                            showLabel
                            secureText
                            value={confirmPassword}
                            onChange={(value) => onChange(value, 'confirmPassword')}
                        />

                        <View style={RecoveryStyles.footer}>
                            <ButtonGlobal
                                color={buttonConfirm.color.back}
                                disabled={!buttonConfirm.enabled}
                                textColor={buttonConfirm.color.text}
                                onClick={handleButtonPress}
                                icon={buttonConfirm.icon}
                                text={buttonConfirm.text}
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
                </View>

            </View>
        </ScreenContainer>
    )
}