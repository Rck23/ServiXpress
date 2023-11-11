import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ServiceStackParams } from "../../Navigation/ServiceNavigator";
import { useContext, useEffect } from "react";
import { ServicesContext } from "../../Context/Services/Context";
import { TextComponent } from "../../Components/Shared/SharedComponents";

interface Props extends StackScreenProps<ServiceStackParams, 'serviceDetailsScreen'> { }


export const ServicesDetailsScreen = ({ navigation, route }: Props) => {
    const { GetServiceDetails, serviceDetails } = useContext(ServicesContext)
    useEffect(() => {
        GetServiceDetails(route.params.id)
    }, [])
    return (
        <ScreenContainer>
            <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Descripcion del servicio</Text>
                    <TextComponent text={serviceDetails?.descripcion} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Estado</Text>
                    <TextComponent text={serviceDetails?.estado} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Municipio</Text>
                    <TextComponent text={serviceDetails?.municipio} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Correos de contacto</Text>
                    <TextComponent text={serviceDetails?.correos} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Telefonos de contacto</Text>
                    <TextComponent text={serviceDetails?.telefonos} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Otros medios de contacto</Text>
                    <TextComponent text={serviceDetails?.otrosMediosContacto} style={GlobalStyles.Dato} />
                </View>
                
                <View style={GlobalStyles.DatCont}>
                    <Text style={GlobalStyles.Titulo}>Precio por servicio</Text>
                    <TextComponent text={serviceDetails?.precio.toString()} style={GlobalStyles.Dato} />
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}