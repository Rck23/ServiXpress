import { View } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from "../Navigation/AuthNavigator";

interface Props extends StackScreenProps<AuthStackParams, 'recoveryScreen'> { }

export const RecoveryScreen = ({ navigation, route }: Props) => {
    return (
        <View></View>
    )
}