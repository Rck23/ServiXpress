import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ServiceStackParams } from "../../Navigation/ServiceNavigator";
import { useContext, useEffect } from "react";
import { ServicesContext } from "../../Context/Services/Context";

interface Props extends StackScreenProps<ServiceStackParams, 'serviceDetailsScreen'> { }


export const ServicesDetailsScreen = ({ navigation, route }: Props) => {
    const { GetServiceDetails, serviceDetails } = useContext(ServicesContext)
    useEffect(() => {
        GetServiceDetails(route.params.id)
    }, [])
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <ScreenContainer>
                <ScrollView>
                    <View style={{}}>
                        <Text style={{}}>Titular del servicio</Text>
                        <Text style={{}}>Encargado del servicio</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Categoría del servicio</Text>
                        <Text style={{}}>Plomeria</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Tipo de servicio</Text>
                        <Text style={{}}>solicitado u ofrecido</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Estado</Text>
                        <Text style={{}}>México</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Municipio</Text>
                        <Text style={{}}>Asientos</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Telefono</Text>
                        <Text style={{}}>000 000 0000</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Correo</Text>
                        <Text style={{}}>servicio@servicio.com</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Otro contacto</Text>
                        <Text style={{}}>Redes sociales</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Descripción</Text>
                        <Text style={{}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, recusandae? Ullam officia cupiditate soluta, commodi alias esse obcaecati eos incidunt, hic velit, natus illum nisi libero doloribus perspiciatis accusantium suscipit non totam! Animi aspernatur tempora adipisci commodi labore illum expedita voluptatum vel, esse, temporibus blanditiis ratione veniam nulla doloremque. Reiciendis.
                        </Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Precio del servicio</Text>
                        <Text style={{}}>Opcional</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Registro</Text>
                        <Text style={{}}>DD/MM/AAAA 12:00</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{}}>Fecha de vencimiento</Text>
                        <Text style={{}}>DD/MM/AAAA 12:00</Text>
                    </View>
                </ScrollView>
            </ScreenContainer>
        </View>
    )
}