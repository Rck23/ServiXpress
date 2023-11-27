import { View, StyleSheet, FlatList, TextInput, Text } from "react-native"
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


interface Props extends StackScreenProps<ServiceStackParams, 'servicesBoardScreen'> { }

export const ServicesBoardScreen = ({ navigation, route }: Props) => {
  const { SearchServices, GetServices, services, status } = useContext(ServicesContext)
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    GetServices(),
      SearchServices
  }, [])

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredData = services.filter((text) =>
    text.categoriaServicio.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScreenContainer>
      <View style={ManageUsersStyles.container}>
        <TextInput
          placeholder="Buscar servicio...."
          placeholderTextColor={mainColors.purpule}
          style={ServicesStyles.Filter}
          onChangeText={handleSearch}
          value={searchText} />

        <FlatList
          data={filteredData}
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
              refreshing={status === 'requesting'}
              onRefresh={GetServices}
            />
          }
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "white"
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden',
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 160,
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
  },
  occupation: {
    fontSize: 14,
    marginBottom: 10,
    color: "#3C3C3C"
  },
  description: {
    fontSize: 12,
    color: 'black',
  },
  cardheader: {
    width: "100%",
    height: "40%",
    flexDirection: 'row',
    padding: 10,
  },
  cardbody: {
    width: "100%",
    height: "60%",
    padding: 10,
  },
  cardimage: {
    width: "15%",
    height: "100%",
    marginRight: 10,
    borderRadius: 50
  },
  datos: {
    width: "65%",
    height: "100%",
    flexDirection: 'column',
    padding: 5,
    bottom: 7,
  },
});
