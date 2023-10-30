import { View } from "react-native"
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { GlobalStyles } from '../Styles/SharedStyles';
import { ButtonPrincipalGlobal } from "../Components/Shared/SharedComponents";
import { ServiceStackParams } from '../Navigation/ServiceNavigator';

interface Props extends StackScreenProps<ServiceStackParams, 'homeScreen'> { }

export const HomeScreen = ({ navigation, route }: Props) => {
    return (
        <>
            <View style={GlobalStyles.Globalcontainerdad}>
                <ButtonPrincipalGlobal
                    text='Buscar'
                    onClick={() => navigation.navigate('servicesBoardScreen')}
                    icon={{ name: 'search1', library: 'antDesign' }} />

                <ButtonPrincipalGlobal
                    text='Postularme como usuario'
                    icon={{ name: 'plus', library: 'antDesign' }}
                    onClick={() => navigation.navigate("serviceFormScreen", { tipoServicio: "Requerido" })} />

                <ButtonPrincipalGlobal
                    text='Postularme como trabajador'
                    icon={{ name: 'plus', library: 'antDesign' }}
                    onClick={() => navigation.navigate("serviceFormScreen", { tipoServicio: "Ofertado" })} />
            </View>
        </>
    )
}