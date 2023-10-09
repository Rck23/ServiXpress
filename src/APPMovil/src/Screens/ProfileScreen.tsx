import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { Text } from "react-native";
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../Components/Shared/FormsComponents";
import { TakeImageFromGallery, TakePhoto } from "../Components/Shared/ImagePickerComponent";
import { AlertModal } from '../Components/Modals/AlertModal';
import { useState } from 'react';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../Helpers/GlobalFunctions';

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }


export const ProfileScreen = ({ navigation, route }: Props) => {
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)

    const OnHideAlert = () => { setAlertModal(alertModalInitState) }
    const HandleTakeImage = async (from: 'camera' | 'gallery') => {
        const result = from == 'camera' ? await TakePhoto() : await TakeImageFromGallery();

        if (!result.ok) return setAlertModal(ShootAlertOnResult(result, OnHideAlert))

        console.log(result)
        //TODO: se obtiene la ruta de la imagen en result.data (Manejar para mostrar y enviar a registrar)
    }

    return (
        <>
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            <ScreenContainer>
                <Text>HELLO</Text>
                <ButtonGlobal onClick={() => HandleTakeImage('camera')} text="Tomar foto" icon={{ name: 'camera', library: 'entypo' }} />
                <ButtonGlobal onClick={() => HandleTakeImage('gallery')} text="Seleccionar imagen" icon={{ name: 'images', library: 'entypo' }} />
                <ButtonGlobal onClick={() => setAlertModal({ ...alertModal, visible: true })} text="Modal" icon={{ name: 'images', library: 'entypo' }} />
            </ScreenContainer>
        </>
    )
}