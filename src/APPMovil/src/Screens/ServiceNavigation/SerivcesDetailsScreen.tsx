import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ServiceStackParams } from "../../Navigation/ServiceNavigator";
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../Context/Services/Context";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { ButtonGlobal } from "../../Components/Shared/FormsComponents";
import { ServicesStyles } from "../../Styles/ServicesStyles";
import { Avatar } from "react-native-paper";
import { StrIsNullOrEmpty } from "../../Helpers/GlobalFunctions";
import { systemImages } from "../../Constants/Values";
import { Icon } from "../../Components/Shared/IconComponents";
import { KeyValue, ModalStatusUserProps } from "../../Interfaces/DOMInterfaces";
import { EstatusUsuario } from "../../Interfaces/Usuario";
import { StatusUsersModal } from "../../Components/Modals/StatusModal";

interface Props extends StackScreenProps<ServiceStackParams, 'serviceDetailsScreen'> { }


export const ServicesDetailsScreen = ({ navigation, route }: Props) => {
    const { GetServiceDetails, serviceDetails } = useContext(ServicesContext)

    useEffect(() => {
        GetServiceDetails(route.params.id)
    }, [])

    return (
        <>
            <ScreenContainer>
                <View style={ServicesStyles.Header}>
                    <View style={ServicesStyles.UserContainer}>
                        <Avatar.Image style={ServicesStyles.avatar}
                            onTouchStart={() => console.log('TOUCH')}
                            size={90}
                            source={!StrIsNullOrEmpty(serviceDetails?.usuario.avatarUrl) ? { uri: serviceDetails?.usuario.avatarUrl } : systemImages.personIcon}
                        />

                        <View style={ServicesStyles.UserText}>
                            <TextComponent style={ServicesStyles.nombre} text={`${serviceDetails?.usuario.nombre}`} />
                            <TextComponent style={ServicesStyles.servicio} text={`${serviceDetails?.categoriaServicio.nombre}`} />
                        </View>
                    </View>

                    <ButtonGlobal
                        text='Calificar'
                        icon={{ name: 'star', library: 'antDesign' }}
                        onClick={() => navigation.navigate('servicesCalificationScreen')}
                        type="small"
                    />
                </View>
                <View style={ServicesStyles.container}>
                    <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"info-circle"} library={"fontAwesome"} style={ServicesStyles.DataTitle} />
                            <View style={ServicesStyles.DescriptionContainer}>
                                <TextComponent text={serviceDetails?.descripcion} style={ServicesStyles.DataValue} />
                            </View>
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"location"} library={"entypo"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.estado} style={ServicesStyles.DataValue} />
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"location"} library={"entypo"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.municipio} style={ServicesStyles.DataValue} />
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"mail"} library={"antDesign"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.correos} style={ServicesStyles.DataValue} />
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"phone"} library={"antDesign"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.telefonos} style={ServicesStyles.DataValue} />
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"share-social"} library={"ion"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.otrosMediosContacto} style={ServicesStyles.DataValue} />
                        </View>

                        <View style={ServicesStyles.DataContainer}>
                            <Icon name={"money"} library={"fontAwesome"} style={ServicesStyles.DataTitle} />
                            <TextComponent text={serviceDetails?.precio.toString()} style={ServicesStyles.DataValue} />
                        </View>
                    </ScrollView>
                </View>
            </ScreenContainer>
        </>
    )
}