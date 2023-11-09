import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ButtonGlobal } from "../../Components/Shared/FormsComponents";
import { useState } from "react";
import { ModalOptionsSelectorProps } from "../../Interfaces/DOMInterfaces";
import { optionSelectorModalInitState } from "../../Interfaces/InterfacesInitState";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <ScreenContainer>
                <ScrollView>
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Nombre del usuario</Text>
                        <Text style={GlobalStyles.Dato}>Usuario</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Telefono</Text>
                        <Text style={GlobalStyles.Dato}>000-000-0000</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Username</Text>
                        <Text style={GlobalStyles.Dato}>alguienexample</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Email</Text>
                        <Text style={GlobalStyles.Dato}>alguien@example.com</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Contraseña</Text>
                        <Text style={GlobalStyles.Dato}>********</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Calle</Text>
                        <Text style={GlobalStyles.Dato}>Nombre de la calle</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Número interno de la casa</Text>
                        <Text style={GlobalStyles.Dato}>Nombre de la calle</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Número externo de la casa</Text>
                        <Text style={GlobalStyles.Dato}>Nombre de la calle</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Código postal</Text>
                        <Text style={GlobalStyles.Dato}>00000</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Fraccionamiento</Text>
                        <Text style={GlobalStyles.Dato}>Santa Monica</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Descripción</Text>
                        <Text style={GlobalStyles.Dato}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, recusandae? Ullam officia cupiditate soluta, commodi alias esse obcaecati eos incidunt, hic velit, natus illum nisi libero doloribus perspiciatis accusantium suscipit non totam! Animi aspernatur tempora adipisci commodi labore illum expedita voluptatum vel, esse, temporibus blanditiis ratione veniam nulla doloremque. Reiciendis.
                        </Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Estado</Text>
                        <Text style={GlobalStyles.Dato}>Aguascalientes</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Municipo</Text>
                        <Text style={GlobalStyles.Dato}>San Francisco</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Estatus del usuario</Text>
                        <Text style={GlobalStyles.Dato}>activo</Text>
                    </View>
                    
                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>El usuario se registro</Text>
                        <Text style={GlobalStyles.Dato}>00/00/0000</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <Text style={GlobalStyles.Titulo}>Rol del usuario</Text>
                        <Text style={GlobalStyles.Dato}>cliente</Text>
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <ButtonGlobal
                            text='Modificar estatús'
                            icon={{ name: 'update', library: 'materialCommunity' }}
                        />
                    </View>
                </ScrollView>
            </ScreenContainer>
        </View>
    )
}