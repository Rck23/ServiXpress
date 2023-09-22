import { View } from "react-native"
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<HomeStackParams, 'homeScreen'> { }

export const HomeScreen = ({ navigation, route }: Props) => {
    return (
        <View></View>
    )
}