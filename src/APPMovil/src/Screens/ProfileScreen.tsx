import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { ButtonGlobal, FormScrollContainer } from "../Components/Shared/FormsComponents";
import { TakeImageFromGallery, TakePhoto } from "../Components/Shared/ImagePickerComponent";
import { AlertModal } from '../Components/Modals/AlertModal';
import { useContext, useEffect, useState } from 'react';
import { AlertModalProps } from '../Interfaces/DOMInterfaces';
import { alertModalInitState } from '../Interfaces/InterfacesInitState';
import { GetSaludoFromTime, ShootAlertOnResult, StrIsNullOrEmpty } from '../Helpers/GlobalFunctions';
import { AuthContext } from '../Context/Auth/Context';
import { ScrollViewComponent, TextComponent } from '../Components/Shared/SharedComponents';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { systemImages } from '../Constants/Values';
import { ProfileStyles } from '../Styles/ProfileStyles';

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }


export const ProfileScreen = ({ navigation, route }: Props) => {
    const { user, LogOut } = useContext(AuthContext)
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)


    useEffect(() => {
    }, [])

    const OnHideAlert = () => { setAlertModal(alertModalInitState) }

    return (
        <>
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />

            <ScreenContainer>
                <View style={ProfileStyles.container}>
                    <Avatar.Image style={ProfileStyles.avatar}
                        onTouchStart={() => console.log('TOUCH')}
                        size={90}
                        source={!StrIsNullOrEmpty(user?.avatarUrl) ? { uri: user?.avatarUrl } : systemImages.personIcon}
                    />
                    <TextComponent style={ProfileStyles.headerText} text={`👋 ${GetSaludoFromTime()}, ${user?.nombre}`} />
                    <TextComponent style={ProfileStyles.bodyText} text={`${user?.email}`} />
                    <TextComponent style={ProfileStyles.bodyText} text={`${user?.telefono}`} />

                </View>
            </ScreenContainer>
        </>
    )
}