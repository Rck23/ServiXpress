import { View } from "react-native"
import { HomeStackParams } from "../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from "react-native";

interface Props extends StackScreenProps<HomeStackParams, 'usersManageScreen'> { }

export const UsersManageScreen = ({ navigation, route }: Props) => {
    return (
        <>
            <View>
                <Text>HELLO</Text>
            </View>
        </>
    )
}