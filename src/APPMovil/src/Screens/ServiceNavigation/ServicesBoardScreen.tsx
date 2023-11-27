import { View, FlatList } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { ServiceStackParams } from '../../Navigation/ServiceNavigator';
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../Context/Services/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { ListEmptyComponent, ServiceListItem } from "../../Components/Shared/SharedComponents";
import { RefreshControl } from "react-native";
import { ManageUsersStyles } from "../../Styles/ManageUserStyles";
import { ServicesStyles } from "../../Styles/ServicesStyles";
import { mainColors } from "../../Constants/Values";
import { Searchbar } from "react-native-paper";
import { DomContext } from "../../Context/Dom/Context";


interface Props extends StackScreenProps<ServiceStackParams, 'servicesBoardScreen'> { }

export const ServicesBoardScreen = ({ navigation, route }: Props) => {
  const { SearchServices, GetServices, services } = useContext(ServicesContext)
  const { statusDom } = useContext(DomContext)
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    GetServices()
  }, [])

  const handleSearch = async (text: string) => {
    setSearchText(text)
    SearchServices(text)
  };

  // const filteredData = services.filter((text) =>
  //   text.categoriaServicio.nombre.toLowerCase().includes(searchText.toLowerCase())
  // );

  return (
    <ScreenContainer>
      <Searchbar
        placeholder="Buscar servicios..."
        placeholderTextColor={mainColors.purpule}
        style={ServicesStyles.Filter}
        textAlignVertical='top'
        onChangeText={(text) => handleSearch(text)}
        value={searchText} />
      <View style={ManageUsersStyles.container}>
        <FlatList
          data={services}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ServiceListItem
              service={item}
              onPress={() => navigation.navigate('serviceDetailsScreen', { id: item.id.toString() })}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmptyComponent text="No se han encontrado servicios por el momento..." />
          )}
          refreshControl={
            <RefreshControl
              refreshing={statusDom === 'requesting'}
              onRefresh={GetServices}
            />
          }
        />
      </View>
    </ScreenContainer>
  );
};