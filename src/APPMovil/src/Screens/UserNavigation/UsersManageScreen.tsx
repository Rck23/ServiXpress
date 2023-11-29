import { View, FlatList, RefreshControl } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParams } from '../../Navigation/UserNavigator';
import { ListEmptyComponent, UserListItem } from "../../Components/Shared/SharedComponents";
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from "../../Context/Users/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ManageUsersStyles } from "../../Styles/ManageUserStyles";
import { Searchbar } from "react-native-paper";
import { ServicesStyles } from "../../Styles/ServicesStyles";
import { mainColors } from "../../Constants/Values";
import { DomContext } from "../../Context/Dom/Context";

interface Props extends StackScreenProps<UserStackParams, 'userManageScreen'> { }


export const UsersManageScreen = ({ navigation, route }: Props) => {
    const { users, GetAllUsers, SearchUsers } = useContext(UsersContext)
    const { statusDom } = useContext(DomContext)
    const [ searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        GetAllUsers()
    }, [])

    const handleSearch = async (text: string) => {
        setSearchText(text)
        SearchUsers(text)
    };

    return (
        <>
            <ScreenContainer>
                <Searchbar
                    placeholder="Buscar usuarios...."
                    placeholderTextColor={mainColors.purpule}
                    style={ServicesStyles.Filter}
                    textAlignVertical='top'
                    onChangeText={(text) => handleSearch(text)}
                    value={searchText} />
                <View style={ManageUsersStyles.container}>
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <UserListItem
                                user={item}
                                onPress={() => navigation.navigate('userDetailsScreen', { id: item.id })}
                            />
                        }
                        ListEmptyComponent={() => (
                            <ListEmptyComponent text="No se han encontrado usuarios..." />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={statusDom === 'requesting'}
                                onRefresh={GetAllUsers}
                            />
                        }
                    />
                </View>
            </ScreenContainer>
        </>
    )
}