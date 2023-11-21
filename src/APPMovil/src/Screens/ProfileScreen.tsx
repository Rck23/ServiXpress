import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../Components/Shared/FormsComponents";
import { useContext, useEffect, useState } from 'react';
import { ModalEditProfileProps } from '../Interfaces/DOMInterfaces';
import { editProfileModalInitState } from '../Interfaces/InterfacesInitState';
import { GetSaludoFromTime, StrIsNullOrEmpty } from '../Helpers/GlobalFunctions';
import { AuthContext } from '../Context/Auth/Context';
import { TextComponent } from '../Components/Shared/SharedComponents';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { systemImages } from '../Constants/Values';
import { ProfileStyles } from '../Styles/ProfileStyles';
import { GlobalStyles } from '../Styles/SharedStyles';
import { EditProfileModal } from '../Components/Modals/EditProfileModal';

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }


export const ProfileScreen = ({ navigation, route }: Props) => {
    const { user, LogOut } = useContext(AuthContext)

    const [editProfileModal, setEditProfileModal] = useState<ModalEditProfileProps>(editProfileModalInitState)


    useEffect(() => {
    }, [])


    return (
        <>
            <EditProfileModal {...editProfileModal} OnHideModal={() => setEditProfileModal(editProfileModalInitState)} />
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

                    <View style={GlobalStyles.DatCont}>
                        <ButtonGlobal
                            text='Editar perfil'
                            icon={{ name: 'edit', library: 'antDesign' }}
                            onClick={() => setEditProfileModal({ ...editProfileModal, visible: true })} />
                    </View>
                </View>
            </ScreenContainer>
        </>
    )
}