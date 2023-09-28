import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"

interface Props extends StackScreenProps<HomeStackParams, 'profileScreen'> { }

export const ProfileScreen = ({ navigation, route }: Props) => {
    return (
        <View></View>
    )
}