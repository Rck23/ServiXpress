import { View, ImageBackground } from "react-native"
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
import { ServicesCalifStyles, ServicesStyles } from "../../Styles/ServicesStyles";
import { Avatar } from "react-native-paper";
import { StrIsNullOrEmpty } from "../../Helpers/GlobalFunctions";
import { mainColors, systemImages } from "../../Constants/Values";
import { UsersContext } from "../../Context/Users/Context";
import { UserReview } from "../../Interfaces/Usuario";
import { userReviewInitState } from "../../Interfaces/InterfacesInitState";

interface Props extends StackScreenProps<ServiceStackParams, 'servicesCalificationScreen'> { }


export const ServicesCalificationScreen = ({ navigation, route }: Props) => {
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState([false, false, false, false, false]);
    const [currentRating, setCurrentRating] = useState(0);
    const { GetServiceDetails, serviceDetails, ReviewUserSend } = useContext(ServicesContext)
    const [calificacion, setCalificacion] = useState<UserReview>(userReviewInitState)

    const handleStarPress = (index: number) => {
        // Actualiza el estado de las estrellas hasta la posición seleccionada
        const newRatings = ratings.map((_, i) => i <= index);
        setRatings(newRatings);

        // Almacena la calificación actual
        setCurrentRating(index + 1);

        setCalificacion({...calificacion, CalificacionUser: index + 1})
    };

    const handleSendComments = async () => {
        calificacion.Comentarios = comment
        calificacion.UsuarioCalificadoId = serviceDetails.usuario.id
        await ReviewUserSend(calificacion, () => navigation.navigate('servicesBoardScreen'))
    };


    return (
        <ScreenContainer>
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/474x/8a/60/dd/8a60dd2b9ce21c6be39fdb5928e33262.jpg' }}
                style={ServicesCalifStyles.Header}>
                <Avatar.Image style={ServicesCalifStyles.avatar}
                    onTouchStart={() => console.log('TOUCH')}
                    size={90}
                    source={!StrIsNullOrEmpty(serviceDetails?.usuario.avatarUrl) ? { uri: serviceDetails?.usuario.avatarUrl } : systemImages.personIcon}
                />

                <TextComponent style={ServicesCalifStyles.Descripcion} text={`Como calificarias el servicio de ${serviceDetails?.usuario.nombre} como ${serviceDetails?.categoriaServicio.nombre}:`} />

                <View style={ServicesCalifStyles.CalificationContainer}>
                    {ratings.map((isActive, index) => (
                        <ButtonCalif
                            key={index}
                            icon={{ name: isActive ? 'star' : 'staro', library: 'antDesign' }}
                            onClick={() => handleStarPress(index)}
                        />
                    ))}
                </View>
            </ImageBackground>

            <View style={ServicesCalifStyles.container}>
                <View style={GlobalStyles.DatCont}>
                    <TextAreaGlobal
                        placeholder={`Cuales son tus comentarios sobre ${serviceDetails?.usuario.nombre}`}
                        value={comment}
                        onChange={setComment}
                        maxLength={300}
                        multiline={true}
                        numberOfLines={6} />

                    <ButtonGlobal
                        icon={{ name: 'send', library: 'fontAwesome' }}
                        text="Enviar comentarios"
                        type="small"
                        onClick={handleSendComments} />
                </View>
            </View>
        </ScreenContainer>
    )
}