import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, FlatList } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { ServiceStackParams } from '../../Navigation/ServiceNavigator';
import { useContext, useEffect } from "react";
import { ServicesContext } from "../../Context/Services/Context";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { Col, ListEmptyComponent, Row, TextComponent } from "../../Components/Shared/SharedComponents";
import { Avatar } from "react-native-paper";
import { BlockUI } from "../../Components/Shared/BlockUI";
import { RefreshControl } from "react-native";


interface Props extends StackScreenProps<ServiceStackParams, 'servicesBoardScreen'> { }

export const ServicesBoardScreen = ({ navigation, route }: Props) => {
  const { GetServices, serviceCategories, services, status, messageRequest } = useContext(ServicesContext)

  useEffect(() => {
    GetServices()
  }, [])

  return (
    <ScreenContainer>
      <BlockUI visible={status === 'requesting'} message={messageRequest} />

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('serviceDetailsScreen')}>
            <View style={styles.container}>
              <Avatar.Image size={24} source={require('../../Images/personIcon.png')} />
              <TextComponent text={item.tipo} />
              <TextComponent text={item.descripcion} />
              <Row>
                <Col>
                  <TextComponent text={`Estado: ${item.estado}`} />
                </Col>
                <Col>
                  <TextComponent text={`Municipio: ${item.municipio}`} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextComponent text={`Precio: ${item.precio}`} />
                </Col>
                <Col>
                  <TextComponent text={`Categoria: ${serviceCategories.find(x => x.id == item.categoriaId)?.nombre ?? ''}`} />
                </Col>
              </Row>
            </View>

          </TouchableOpacity>
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
    </ScreenContainer>

    // <ScrollView  style={styles.container}>
    //   <View style={styles.sectionContainer}>
    //     <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('serviceDetailsScreen')}>
    //       <View style={styles.cardheader}>
    //         <Image
    //           source={imageprofile} style={styles.cardimage}></Image>
    //         <View style={styles.datos}>
    //           <Text style={styles.name}>User Name</Text>
    //           <Text style={styles.occupation}>Occupation</Text>
    //         </View>
    //       </View>
    //       <View style={styles.cardbody}>
    //         <Text style={styles.description}>Description</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.card}>
    //       <View style={styles.cardheader}>
    //         <Image
    //           source={imageprofile} style={styles.cardimage}></Image>
    //         <View style={styles.datos}>
    //           <Text style={styles.name}>User Name</Text>
    //           <Text style={styles.occupation}>Occupation</Text>
    //         </View>
    //       </View>
    //       <View style={styles.cardbody}>
    //         <Text style={styles.description}>Description</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.card}>
    //       <View style={styles.cardheader}>
    //         <Image
    //           source={imageprofile} style={styles.cardimage}></Image>
    //         <View style={styles.datos}>
    //           <Text style={styles.name}>User Name</Text>
    //           <Text style={styles.occupation}>Occupation</Text>
    //         </View>
    //       </View>
    //       <View style={styles.cardbody}>
    //         <Text style={styles.description}>Description</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // </ScrollView>
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
