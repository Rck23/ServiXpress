import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { ButtonPrincipalGlobal, ScrollViewComponent } from "../Components/Shared/SharedComponents";
import { ServiceStackParams } from '../Navigation/ServiceNavigator';
import { ScreenContainer } from "../Components/Shared/NavigationComponents";
import { HomeStyles } from "../Styles/HomeStyles";

interface Props extends StackScreenProps<ServiceStackParams, 'homeScreen'> { }

export const HomeScreen = ({ navigation, route }: Props) => {
    return (
        <>
            <ScreenContainer>
                <View style={HomeStyles.container}>
                    <ScrollViewComponent>
                        <ButtonPrincipalGlobal
                            text='Buscar'
                            onClick={() => navigation.navigate('servicesBoardScreen')}
                            icon={{ name: 'search1', library: 'antDesign' }} />

                        <ButtonPrincipalGlobal
                            text='Solicitar servicios'
                            icon={{ name: 'plus', library: 'antDesign' }}
                            onClick={() => navigation.navigate("serviceFormScreen", { tipoServicio: "Requerido" })} />

                        <ButtonPrincipalGlobal
                            text='Ofrecer servicios'
                            icon={{ name: 'plus', library: 'antDesign' }}
                            onClick={() => navigation.navigate("serviceFormScreen", { tipoServicio: "Ofertado" })} />
                    </ScrollViewComponent>
                </View>
            </ScreenContainer>
        </>
    )
}