import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../../Navigation/AuthNavigator";
import { useContext, useState } from 'react';
import { ButtonGlobal, FormScrollContainer, InputGlobal, useTogglePasswordVisibility } from '../../Components/Shared/FormsComponents';
import { AuthContext } from '../../Context/Auth/Context';
import { Col, LogoImage, Row, TextComponent } from '../../Components/Shared/SharedComponents';
import { ImageRequestFormData, ImageSelectorModalProps, KeyValue, ModalOptionsSelectorProps } from '../../Interfaces/DOMInterfaces';
import { imageSelectorModalInitState, newUsuarioInitState, optionSelectorModalInitState } from '../../Interfaces/InterfacesInitState';
import { UseForm } from '../../Hooks/UseForm';
import { RegisterUser } from '../../Interfaces/Usuario';
import { ScreenContainer } from '../../Components/Shared/NavigationComponents';
import { RegisterStyles } from '../../Styles/LoginRegisterStyles';
import { mainColors, userRoles } from '../../Constants/Values';
import { OptionsSelectorModal } from '../../Components/Modals/OptionsSelectorModal';
import { ImageSelectorModal } from '../../Components/Modals/ImageSelectorModal';

interface Props extends StackScreenProps<AuthStackParams, 'registerScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {
    const { SignUp } = useContext(AuthContext)
    const { Nombre, Apellidos, Telefono, Email, Password, onChange, form } = UseForm<RegisterUser>(newUsuarioInitState)
    const [selectorUserRolModal, setSelectorUserRolModal] = useState<ModalOptionsSelectorProps>(optionSelectorModalInitState)
    const [imageSelectorModal, setImageSelectorModal] = useState<ImageSelectorModalProps>(imageSelectorModalInitState)
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [Rol, setRole] = useState(0)
    const [userImage, setUserImage] = useState<ImageRequestFormData>()


    const HandleRegister = async () => {
        form.Foto = userImage;
        form.Rol = Rol;
        await SignUp(form)
    }

    const OnHideModal = (value?: KeyValue) => {
        if (value) {
            setRole(value.value)
        }
        setSelectorUserRolModal(optionSelectorModalInitState)
    }

    const OnHideImageSelectorModal = (image?: ImageRequestFormData) => {
        setUserImage(image)
        setImageSelectorModal(imageSelectorModalInitState)
    }

    return (
        <>
            <ImageSelectorModal {...imageSelectorModal} title='Seleccione una imagen para su cuenta' OnHideModal={(result) => OnHideImageSelectorModal(result)} />
            <OptionsSelectorModal {...selectorUserRolModal} title='Seleccione el tipo de cuenta que desea crear' OnHideModal={(value) => OnHideModal(value)} />
            <ScreenContainer>
                <View style={[RegisterStyles.container]}>
                    <FormScrollContainer>
                        <LogoImage />
                        <InputGlobal
                            placeholder='Nombre(s)'
                            showLabel
                            value={Nombre ?? ''}
                            onChange={(value) => onChange(value, 'Nombre')} />

                        <InputGlobal
                            placeholder='Apellidos'
                            showLabel
                            value={Apellidos ?? ''}
                            onChange={(value) => onChange(value, 'Apellidos')} />

                        <InputGlobal
                            placeholder='Numero de telefono'
                            showLabel
                            value={Telefono ?? ''}
                            onChange={(value) => onChange(value, 'Telefono')} />

                        <InputGlobal
                            placeholder='Correo electrónico'
                            showLabel
                            value={Email ?? ''}
                            onChange={(value) => onChange(value, 'Email')} />

                        <InputGlobal
                            placeholder='Contraseña'
                            secureText={passwordVisibility}
                            rightIcon={{ name: rightIcon, library: 'material' }}
                            OnRightButtonPress={handlePasswordVisibility}
                            showLabel
                            value={Password ?? ''}
                            onChange={(value) => onChange(value, 'Password')} />

                        <Row>
                            <Col style={{ alignItems: 'center' }}>
                                <TextComponent text='¿Que harás en la app?' />
                                <ButtonGlobal
                                    text={userRoles.find(x => x.value == Rol)?.name ?? ''}
                                    color={mainColors.light}
                                    textColor={mainColors.purpule3}
                                    icon={{ name: 'select-arrows', library: 'entypo' }}
                                    onClick={() => setSelectorUserRolModal({ ...selectorUserRolModal, visible: true, options: userRoles })}
                                />
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                                <TextComponent text='Elige una foto de perfil' />
                                <ButtonGlobal
                                    text='Foto perfil'
                                    color={mainColors.light}
                                    textColor={mainColors.purpule3}
                                    icon={{ name: 'person-circle-sharp', library: 'ion' }}
                                    onClick={() => setImageSelectorModal({ ...imageSelectorModal, visible: true })}
                                />
                            </Col>
                        </Row>

                        <ButtonGlobal
                            text='Crear cuenta'
                            icon={{ name: 'check', library: 'fontAwesome' }}
                            onClick={HandleRegister} />
                        <ButtonGlobal
                            text='Regresar'
                            color={mainColors.black}
                            icon={{ name: 'arrowleft', library: 'antDesign' }}
                            onClick={() => navigation.goBack()} />
                    </FormScrollContainer>
                </View>
            </ScreenContainer>
        </>
    )
}