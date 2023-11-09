import { View, FlatList, RefreshControl } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParams } from '../../Navigation/UserNavigator';
import { ListEmptyComponent, UserListItem } from "../../Components/Shared/SharedComponents";
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from "../../Context/Users/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { BlockUI } from "../../Components/Shared/BlockUI";
import { AlertModal } from "../../Components/Modals/AlertModal";
import { useIsFocused } from "@react-navigation/native";
import { alertModalInitState } from "../../Interfaces/InterfacesInitState";
import { AlertModalProps } from "../../Interfaces/DOMInterfaces";
import { ManageUsersStyles } from "../../Styles/ManageUserStyles";

interface Props extends StackScreenProps<UserStackParams, 'userManageScreen'> { }


export const UsersManageScreen = ({ navigation, route }: Props) => {
    const { users, GetAllUsers, status, messageRequest, CleanResult } = useContext(UsersContext)
    const isFocused = useIsFocused();
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)

    useEffect(() => {
        GetAllUsers()
    }, [])


    const OnHideAlert = () => {
        setAlertModal(alertModalInitState)
        CleanResult()
    }

    return (
        <>
            <BlockUI visible={status === 'requesting'} message={messageRequest} />
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
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