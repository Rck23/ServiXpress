import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { useCallback, useContext, useEffect } from "react";
import { UsersContext } from "../../Context/Users/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../../Components/Shared/FormsComponents";
import { useState } from "react";
import { KeyValue, ModalOptionsSelectorProps, ModalStatusUserProps } from "../../Interfaces/DOMInterfaces";
import { optionSelectorModalInitState, statusUsersModalInitState } from "../../Interfaces/InterfacesInitState";
import { UserDetailsStyles } from "../../Styles/UserDetails";
import { Avatar } from "react-native-paper";
import { StrIsNullOrEmpty } from "../../Helpers/GlobalFunctions";
import { systemImages, userStatus } from "../../Constants/Values";
import { EstatusUsuario } from "../../Interfaces/Usuario";
import { OptionsSelectorModal } from "../../Components/Modals/OptionsSelectorModal";
import { ConvertToKeyValueList } from "../../Helpers/InterfaceConverter";
import { StatusUsersModal } from "../../Components/Modals/StatusModal";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    const { status, userDetail, result, GetUserDetail, ChangeUserStatus } = useContext(UsersContext)
    const [selectorStatusModal, setSelectorStatusModal] = useState<ModalStatusUserProps>(statusUsersModalInitState)
    const [statusUsuario, setStatusUsuario] = useState<EstatusUsuario>()


    useEffect(() => {
        GetUserDetail(route.params.id)
    }, [])

    const OnHideModal = async (value?: KeyValue) => {
        setSelectorStatusModal(statusUsersModalInitState)
        if (StrIsNullOrEmpty(value?.key)) return;
        if (userDetail) userDetail.estatus = value?.key ?? ''
        await ChangeUserStatus(route.params.id, value?.key ?? '')
    }

    return (
        <>
            <StatusUsersModal {...selectorStatusModal} OnHideModal={(value) => OnHideModal(value)} />
            <ScreenContainer>
                <View style={UserDetailsStyles.Header}>
                    <View style={UserDetailsStyles.UserContainer}>
                        <Avatar.Image style={UserDetailsStyles.avatar}
                            onTouchStart={() => console.log('TOUCH')}
                            size={90}
                            source={!StrIsNullOrEmpty(userDetail?.avatarUrl) ? { uri: userDetail?.avatarUrl } : systemImages.personIcon}
                        />

                        <View style={UserDetailsStyles.UserText}>
                            <TextComponent style={UserDetailsStyles.nombre} text={`${userDetail?.nombre}`} />
                            <TextComponent style={UserDetailsStyles.servicio} text={`${userDetail?.roles.toString()}`} />
                        </View>
                    </View>

                    <ButtonGlobal
                        text={`Modificar estatus: ${userDetail?.estatus}`}
                        icon={{ name: 'update', library: 'materialCommunity' }}
                        type="small"
                        onClick={() => setSelectorStatusModal({ ...selectorStatusModal, visible: true, options: userStatus})}
                    />
                </View>

                <View style={UserDetailsStyles.container}>
                    <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Nombre del usuario</Text>
                            <TextComponent text={userDetail?.nombre} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Apellidos del usuario</Text>
                            <TextComponent text={userDetail?.apellidos} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Telefono</Text>
                            <TextComponent text={userDetail?.telefono} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Email</Text>
                            <TextComponent text={userDetail?.email} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Calle</Text>
                            <TextComponent text={userDetail?.calle} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Número interno de la casa</Text>
                            <TextComponent text={userDetail?.numInterior?.toString()} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Número externo de la casa</Text>
                            <TextComponent text={userDetail?.numExterior?.toString()} style={UserDetailsStyles.DataValue} />

                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Código postal</Text>
                            <TextComponent text={userDetail?.codigoPostal} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Fraccionamiento</Text>
                            <TextComponent text={userDetail?.coloniaFraccionamiento} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Descripción</Text>
                            <TextComponent text={userDetail?.descripcion} style={UserDetailsStyles.DataValue} />
                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Estado</Text>
                            <TextComponent text={userDetail?.estado} style={UserDetailsStyles.DataValue} />

                        </View>

                        <View style={UserDetailsStyles.DataContainer}>
                            <Text style={UserDetailsStyles.DataTitle}>Municipo</Text>
                            <TextComponent text={userDetail?.municipio} style={UserDetailsStyles.DataValue} />
                        </View>
                    </ScrollView>
                </View>
            </ScreenContainer>
        </>
    )
}