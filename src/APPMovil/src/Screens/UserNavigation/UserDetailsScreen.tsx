import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../../Components/Shared/FormsComponents";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <ScreenContainer>
                <ScrollView>
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Nombre del usuario</Text>
                        <Text style={GlobalStyles.Dato}>Alguien Ejemplo</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Telefono</Text>
                        <Text style={GlobalStyles.Dato}>000 000 0000</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Username</Text>
                        <Text style={GlobalStyles.Dato}>UsuarioExample</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Correo elctrónico</Text>
                        <Text style={GlobalStyles.Dato}>UsuarioExample@extension.com</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Descripción</Text>
                        <Text style={GlobalStyles.Dato}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, sint doloremque. Totam numquam placeat incidunt facilis, quibusdam blanditiis alias, ad deleniti similique odio itaque aperiam quam aspernatur expedita consequatur fuga! Asperiores saepe amet nostrum! Eius doloribus, similique dolores nisi numquam suscipit optio exercitationem. Ipsam dolore, temporibus id pariatur ducimus reprehenderit quam dolorum facilis quae nesciunt a, commodi provident eaque? Perferendis nesciunt reiciendis numquam ratione quae voluptatum ut quas sint? Ratione perferendis natus blanditiis consectetur minus ipsam unde? Accusamus impedit molestias necessitatibus repellat eligendi quaerat, provident vel omnis aliquid ipsa dicta consequuntur qui quasi! Ut, laboriosam! Inventore tempora omnis itaque culpa.
                        </Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Numero exterior</Text>
                        <Text style={GlobalStyles.Dato}>#000</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Numero interior</Text>
                        <Text style={GlobalStyles.Dato}>#000</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Código postal</Text>
                        <Text style={GlobalStyles.Dato}>00000</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Calle</Text>
                        <Text style={GlobalStyles.Dato}>Los pinos</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Colonia o fraccionamiento</Text>
                        <Text style={GlobalStyles.Dato}>Fracc. San Mateo</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Estado</Text>
                        <Text style={GlobalStyles.Dato}>México</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Estatus del usuario</Text>
                        <Text style={GlobalStyles.Dato}>Estatus de la cuenta</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Registro</Text>
                        <Text style={GlobalStyles.Dato}>DD/MM/AAAA 12:00</Text>
                    </View>

                    <ButtonGlobal
                        text='Veficar usuario'
                        icon={{ name: 'verified-user', library: 'material' }} />
                </ScrollView>
            </ScreenContainer>
        </View>
    )
}