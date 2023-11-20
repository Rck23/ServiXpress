import { View, FlatList, RefreshControl } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParams } from '../../Navigation/UserNavigator';
import { ListEmptyComponent, UserListItem } from "../../Components/Shared/SharedComponents";
import { useContext, useEffect } from 'react';
import { UsersContext } from "../../Context/Users/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ManageUsersStyles } from "../../Styles/ManageUserStyles";

interface Props extends StackScreenProps<UserStackParams, 'userManageScreen'> { }


export const UsersManageScreen = ({ navigation, route }: Props) => {
    const { users, GetAllUsers, status } = useContext(UsersContext)

    useEffect(() => {
        GetAllUsers()
    }, [])


    return (
        <>
            <ScreenContainer>
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
                                refreshing={status === 'requesting'}
                                onRefresh={GetAllUsers}
                            />
                        }
                    />
                </View>
            </ScreenContainer>
        </>
    )
}