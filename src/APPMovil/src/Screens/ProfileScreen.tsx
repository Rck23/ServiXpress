import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../Components/Shared/FormsComponents";
import { useContext, useEffect, useState } from 'react';
import { ImageRequestFormData, ImageSelectorModalProps, ModalEditProfileProps } from '../Interfaces/DOMInterfaces';
import { editProfileModalInitState, imageSelectorModalInitState } from '../Interfaces/InterfacesInitState';
import { GetSaludoFromTime, StrIsNullOrEmpty } from '../Helpers/GlobalFunctions';
import { AuthContext } from '../Context/Auth/Context';
import { TextComponent } from '../Components/Shared/SharedComponents';
import { View, ImageBackground, Text, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import { systemImages } from '../Constants/Values';
import { ProfileStyles } from '../Styles/ProfileStyles';
import { GlobalStyles } from '../Styles/SharedStyles';
import { EditProfileModal } from '../Components/Modals/EditProfileModal';
import { Usuario } from '../Interfaces/Usuario';
import { ImageSelectorModal } from '../Components/Modals/ImageSelectorModal';

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }


export const ProfileScreen = ({ navigation, route }: Props) => {
    const { user: userSession, UpdateProfile } = useContext(AuthContext)
    const [imageSelectorModal, setImageSelectorModal] = useState<ImageSelectorModalProps>(imageSelectorModalInitState)
    const [editProfileModal, setEditProfileModal] = useState<ModalEditProfileProps>(editProfileModalInitState)
    const [user, setUser] = useState<Usuario>()

    useEffect(() => {
        setUser(userSession)
    }, [userSession])

    const OnHideImageSelectorModal = async (image?: ImageRequestFormData) => {
        setImageSelectorModal(imageSelectorModalInitState)
        if (image && user) {
            user.foto = image
            await UpdateProfile(user)
        }
    }


    return (
        <>
            <ImageSelectorModal {...imageSelectorModal} imageUrl={user?.avatarUrl} title='Selecciona una imagen para tu perfil' OnHideModal={(result) => OnHideImageSelectorModal(result)} />
            <EditProfileModal {...editProfileModal} OnHideModal={() => setEditProfileModal(editProfileModalInitState)} />
            <ScreenContainer>
                <ImageBackground
                    source={{ uri: 'https://e1.pxfuel.com/desktop-wallpaper/984/514/desktop-wallpaper-teal-blue-purple-gradient-teal-and-purple.jpg' }}
                    style={ProfileStyles.Header}>
                    <Avatar.Image style={ProfileStyles.avatar}
                        onTouchStart={() => setImageSelectorModal({ ...imageSelectorModal, visible: true })}
                        size={90}
                        source={!StrIsNullOrEmpty(user?.avatarUrl) ? { uri: user?.avatarUrl } : systemImages.personIcon}
                    />

                    <TextComponent style={ProfileStyles.headerText} text={`👋 ${GetSaludoFromTime()}, ${user?.nombre}`} />

                    <ButtonGlobal
                        text='Editar perfil'
                        icon={{ name: 'edit', library: 'antDesign' }}
                        onClick={() => setEditProfileModal({ ...editProfileModal, visible: true })}
                        type='small' />
                </ImageBackground>
                <View style={ProfileStyles.container}>
                    <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Nombre:</Text>
                            <TextComponent text={`${user?.nombre}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Apellidos:</Text>
                            <TextComponent text={`${user?.apellidos}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Telefono:</Text>
                            <TextComponent text={`${user?.telefono ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Correo:</Text>
                            <TextComponent text={`${user?.email}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Estado:</Text>
                            <TextComponent text={`${user?.estado ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Municipio:</Text>
                            <TextComponent text={`${user?.municipio ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Colonia:</Text>
                            <TextComponent text={`${user?.coloniaFraccionamiento ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Código postal:</Text>
                            <TextComponent text={`${user?.codigoPostal ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Calle:</Text>
                            <TextComponent text={`${user?.calle ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Numero exterior:</Text>
                            <TextComponent text={`${user?.numExterior ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>

                        <View style={ProfileStyles.DataContainer}>
                            <Text style={ProfileStyles.DataTitle}>Numero interior:</Text>
                            <TextComponent text={`${user?.numInterior ?? ''}`} style={ProfileStyles.DataValue} />
                        </View>
                    </ScrollView>
                </View>
            </ScreenContainer>
        </>
    )
}