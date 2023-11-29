import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext } from "react";
import { RecoveryStyles } from "../../Styles/RecoveryStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ButtonGlobal, FormScrollContainer, InputGlobal, useTogglePasswordVisibility } from "../../Components/Shared/FormsComponents";
import { UseForm } from "../../Hooks/UseForm";
import { mainColors } from "../../Constants/Values";
import { AuthContext } from "../../Context/Auth/Context";
import { ResetPassword } from "../../Interfaces/DataResponse";


interface Props extends StackScreenProps<AuthStackParams, 'resetPasswordScreen'> { }

export const ResetPasswordScreen = ({ navigation, route }: Props) => {
    const { ResetPassword } = useContext(AuthContext)
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const { token, password, confirmPassword, form, onChange } = UseForm<ResetPassword>({ token: '', password: '', confirmPassword: '', email: '' })


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
                            value={password}
                            secureText={passwordVisibility}
                            rightIcon={{ name: rightIcon, library: 'material' }}
                            OnRightButtonPress={handlePasswordVisibility}
                            onChange={(value) => onChange(value, 'password')}
                        />
                        <InputGlobal
                            placeholder="Confirma la contrasña"
                            showLabel
                            secureText={passwordVisibility}
                            rightIcon={{ name: rightIcon, library: 'material' }}
                            OnRightButtonPress={handlePasswordVisibility}
                            value={confirmPassword}
                            onChange={(value) => onChange(value, 'confirmPassword')}
                        />

                        <View style={RecoveryStyles.footer}>
                            <ButtonGlobal
                                color={mainColors.purpule3}
                                textColor={mainColors.white}
                                onClick={handleButtonPress}
                                icon={{ name: 'check-all', library: 'materialCommunity' }}
                                text='Guardar'
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