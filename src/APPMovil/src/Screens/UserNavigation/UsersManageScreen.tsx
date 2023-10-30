import { View, FlatList } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParams } from '../../Navigation/UserNavigator';
import { GlobalStyles } from "../../Styles/SharedStyles";
import UserListItem from "../../Components/Shared/SharedComponents";
import { useState } from 'react';

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
    },
    {
        id: '200327',
        name: 'Yahir Allexander Morales Belevin'
    },
    {
        id: '200250',
        name: 'Adrian Ramirez Ramirez'
    },
    {
        id: '200411',
        name: 'Oscar Uriel Pasillas Jimenez'
    },
    {
        id: '200301',
        name: 'Jesus Isaac Gomez Esquivel'
    },
    {
        id: '200220',
        name: 'Brayan Alejandro Garcia Duarte'
    },
    {
        id: '190210',
        name: 'Miguel Angel Cordova Rodriguez'
    }
]

export const UsersManageScreen = ({ navigation, route }: Props) => {
    const [selectedId, setSelectedId] = useState<string>();

    return (
        <View style={GlobalStyles.Globalcontainerdad}>
            <View style={GlobalStyles.Globalcontaineruser}>
                <FlatList
                    data={userdata}
                    renderItem={({ item }) =>
                        <UserListItem name={item.name}
                            icon={{ name: 'user', library: 'fontAwesome' }}
                            onPress={() => navigation.navigate('userDetailsScreen')} />}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )
}