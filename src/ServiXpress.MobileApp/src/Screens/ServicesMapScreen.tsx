import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"

interface Props extends StackScreenProps<HomeStackParams, 'servicesMapScreen'> { }

export const ServicesMapScreen = ({ navigation, route }: Props) => {
    return (
        <View></View>
    )
}