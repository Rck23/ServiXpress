import { View } from "react-native"
import { HomeStackParams } from "../../Navigation/HomeNavigator"
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from "react-native";
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { TextComponent } from "../../Components/Shared/SharedComponents";
import { useCallback, useContext, useEffect } from "react";
import { UsersContext } from "../../Context/Users/Context";

interface Props extends StackScreenProps<UserStackParams, "userDetailsScreen"> { }


export const UserDetailsScreen = ({ navigation, route }: Props) => {
    const { status, userDetail, result, GetUserDetail } = useContext(UsersContext)

    useEffect(() => {
        GetUserDetail(route.params.id)
    }, [])

    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <TextComponent text={userDetail?.nombre} />
        </View>
    )
}