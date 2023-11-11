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
import { ModalOptionsSelectorProps } from "../../Interfaces/DOMInterfaces";
import { optionSelectorModalInitState } from "../../Interfaces/InterfacesInitState";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    const { status, userDetail, result, GetUserDetail } = useContext(UsersContext)

    useEffect(() => {
        GetUserDetail(route.params.id)
    }, [])

    return (
        <ScreenContainer>
            <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Nombre del usuario</Text>
                    <TextComponent text={userDetail?.nombre} style={GlobalStyles.Dato} />
                    <TextComponent text={userDetail?.apellidos} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Telefono</Text>
                    <TextComponent text={userDetail?.telefono} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Email</Text>
                    <TextComponent text={userDetail?.email} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Calle</Text>
                    <TextComponent text={userDetail?.calle} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Número interno de la casa</Text>
                    <TextComponent text={userDetail?.numInterior?.toString()} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Número externo de la casa</Text>
                    <TextComponent text={userDetail?.numExterior?.toString()} style={GlobalStyles.Dato} />

                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Código postal</Text>
                    <TextComponent text={userDetail?.codigoPostal} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Fraccionamiento</Text>
                    <TextComponent text={userDetail?.coloniaFraccionamiento} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Descripción</Text>
                    <TextComponent text={userDetail?.descripcion} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Estado</Text>
                    <TextComponent text={userDetail?.estado} style={GlobalStyles.Dato} />

                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Municipo</Text>
                    <TextComponent text={userDetail?.municipio} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Estatus del usuario</Text>
                    <TextComponent text={userDetail?.estatus} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>El usuario se registro</Text>
                    <TextComponent text={userDetail?.fechaHoraRegistro?.toString()} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Rol del usuario</Text>
                    <TextComponent text={userDetail?.rolNombre} style={GlobalStyles.Dato} />
                </View>

                <View style={GlobalStyles.DatCont}>
                    <ButtonGlobal
                        text='Modificar estatús'
                        icon={{ name: 'update', library: 'materialCommunity' }}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}