import { View, FlatList, TouchableOpacity, Text } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { HipervinculoGlobal } from "../../Components/Shared/FormsComponents";
import UserListItem from "../../Components/Shared/SharedComponents";

interface Props extends StackScreenProps<UserStackParams, 'userManageScreen'> { }

const userdata = [
    {
        id: '200387',
        name: 'Yahir Allexander Manjarrez Belevin'
    },
    {
        id: '200252',
        name: 'Adrian Ramirez Sanchez'
    },
    {
        id: '200456',
        name: 'Oscar Uriel Pasillas Hernandez'
    },
    {
        id: '200350',
        name: 'Jesus Isaac Gallegos Esquivel'
    },
    {
        id: '200237',
        name: 'Brayan Emmanuel Garcia Duarte'
    },
    {
        id: '190246',
        name: 'Miguel Angel Rivera Castilo'
    }
]

export const UsersManageScreen = ({ navigation, route }: Props) => {
    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <FlatList
                data={userdata}
                renderItem={({item}) => <UserListItem name={item.name} />}
                keyExtractor={item => item.id} />
        </View>
    )
}