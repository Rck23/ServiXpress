import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            Que va
        </View>
    )
}