import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../../Components/Shared/FormsComponents";
import { ServiceDetailsStackParams } from "../../Navigation/ServiceDetailsNavigator";

interface Props extends StackScreenProps<ServiceDetailsStackParams, "servicesDetailsScreen"> { }


export const ServicesDetailsScreen = ({ navigation, route }: Props) => {
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <ScreenContainer>
                <ScrollView>
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Titular del servicio</Text>
                        <Text style={GlobalStyles.Dato}>Encargado del servicio</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Categoría del servicio</Text>
                        <Text style={GlobalStyles.Dato}>Plomeria</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Tipo de servicio</Text>
                        <Text style={GlobalStyles.Dato}>solicitado u ofrecido</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Estado</Text>
                        <Text style={GlobalStyles.Dato}>México</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Municipio</Text>
                        <Text style={GlobalStyles.Dato}>Asientos</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Telefono</Text>
                        <Text style={GlobalStyles.Dato}>000 000 0000</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Correo</Text>
                        <Text style={GlobalStyles.Dato}>servicio@servicio.com</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Otro contacto</Text>
                        <Text style={GlobalStyles.Dato}>Redes sociales</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Descripción</Text>
                        <Text style={GlobalStyles.Dato}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, recusandae? Ullam officia cupiditate soluta, commodi alias esse obcaecati eos incidunt, hic velit, natus illum nisi libero doloribus perspiciatis accusantium suscipit non totam! Animi aspernatur tempora adipisci commodi labore illum expedita voluptatum vel, esse, temporibus blanditiis ratione veniam nulla doloremque. Reiciendis.
                        </Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Precio del servicio</Text>
                        <Text style={GlobalStyles.Dato}>Opcional</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Registro</Text>
                        <Text style={GlobalStyles.Dato}>DD/MM/AAAA 12:00</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Fecha de vencimiento</Text>
                        <Text style={GlobalStyles.Dato}>DD/MM/AAAA 12:00</Text>
                    </View>
                </ScrollView>
            </ScreenContainer>
        </View>
    )
}