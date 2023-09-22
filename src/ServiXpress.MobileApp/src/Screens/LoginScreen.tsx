import { Text, View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";

interface Props extends StackScreenProps<AuthStackParams, 'loginScreen'> { }

export const LoginScreen = ({ navigation, route }: Props) => {
    return (
        <View>
            <Text>LOGIN</Text>
        </View>
    )
}