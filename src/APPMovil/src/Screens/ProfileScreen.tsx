import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../Components/Shared/FormsComponents";
import { TakeImageFromGallery, TakePhoto } from "../Components/Shared/ImagePickerComponent";
import { AlertModal } from '../Components/Modals/AlertModal';
import { useContext, useState } from 'react';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { ShootAlertOnResult } from '../Helpers/GlobalFunctions';
import { AuthContext } from '../Context/Auth/Context';
import { TextComponent } from '../Components/Shared/SharedComponents';

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }


export const ProfileScreen = ({ navigation, route }: Props) => {
    const { user, LogOut } = useContext(AuthContext)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)

    const OnHideAlert = () => { setAlertModal(alertModalInitState) }
    const HandleTakeImage = async (from: 'camera' | 'gallery') => {
        const result = from == 'camera' ? await TakePhoto() : await TakeImageFromGallery();

        if (!result.ok) return setAlertModal(ShootAlertOnResult(result, OnHideAlert))

        console.log(result)
        //TODO: se obtiene la ruta de la imagen en result.data (Manejar para mostrar y enviar a registrar)
    }

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            
            <ScreenContainer>
                <TextComponent text={`Hi, ${user?.Nombre} ${user?.Apellidos}`} />
                <TextComponent text={`Your email: ${user?.Email}`} />
                <TextComponent text={`Your phone: ${user?.Telefono}`} />

                <ButtonGlobal onClick={() => HandleTakeImage('camera')} text="Tomar foto" icon={{ name: 'camera', library: 'entypo' }} />
                <ButtonGlobal onClick={() => HandleTakeImage('gallery')} text="Seleccionar imagen" icon={{ name: 'images', library: 'entypo' }} />
                <ButtonGlobal onClick={() => setAlertModal({ ...alertModal, visible: true })} text="Modal" icon={{ name: 'images', library: 'entypo' }} />
                <ButtonGlobal onClick={LogOut} text="Salir" icon={{ name: 'close', library: 'fontAwesome' }} />
            </ScreenContainer>
        </View>
    )
}