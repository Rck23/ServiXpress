import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ServiceStackParams } from "../../Navigation/ServiceNavigator";
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../Context/Services/Context";
import { LogoImage, TextComponent } from "../../Components/Shared/SharedComponents";
import { ButtonCalif, ButtonGlobal, TextAreaGlobal } from "../../Components/Shared/FormsComponents";
import { LoginStyles } from "../../Styles/LoginRegisterStyles";

interface Props extends StackScreenProps<ServiceStackParams, 'servicesCalificationScreen'> { }


export const ServicesCalificationScreen = ({ navigation, route }: Props) => {
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState([false, false, false, false, false]);
    const [currentRating, setCurrentRating] = useState(0);

    const handleStarPress = (index: number) => {
        // Actualiza el estado de las estrellas hasta la posición seleccionada
        const newRatings = ratings.map((_, i) => i <= index);
        setRatings(newRatings);

        // Almacena la calificación actual
        setCurrentRating(index + 1);
    };


    return (
        <ScreenContainer>
            <ScrollView style={GlobalStyles.ScrollContainer} showsVerticalScrollIndicator={false}>
                <View style={GlobalStyles.formContainer}>
                    <LogoImage />
                    <Text style={GlobalStyles.title}>Califica tu servicio</Text>
                    <View style={GlobalStyles.CalificationContainer}>
                        {ratings.map((isActive, index) => (
                            <ButtonCalif
                                key={index}
                                icon={{ name: isActive ? 'star' : 'staro', library: 'antDesign' }}
                                onClick={() => handleStarPress(index)}
                            />
                        ))}
                    </View>

                    <View style={GlobalStyles.DatCont}>
                        <TextAreaGlobal
                            placeholder="Introduce tus comentarios"
                            value={comment}
                            onChange={setComment}
                            maxLength={300}
                            multiline={true}
                            numberOfLines={6} />
                    </View>

                    <ButtonGlobal
                        icon={{ name: 'send', library: 'fontAwesome' }}
                        text="Enviar comentarios" />
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}