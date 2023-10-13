import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../Navigation/HomeNavigator"

const imageprofile={ uri:"https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/1366_2000.jpeg" };

interface Props extends StackScreenProps<HomeStackParams, 'servicesBoardScreen'> { }

export const ServicesBoardScreen = ({ navigation, route }: Props) => {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardheader}>
                <Image
                  source={imageprofile} style={styles.cardimage}></Image>
                <View style={styles.datos}>
                  <Text style={styles.name}>User Name</Text>
                  <Text style={styles.occupation}>Occupation</Text>
                </View>
              </View>
              <View style={styles.cardbody}>
              <Text style={styles.description}>Description</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardheader}>
                <Image
                  source={imageprofile} style={styles.cardimage}></Image>
                <View style={styles.datos}>
                  <Text style={styles.name}>User Name</Text>
                  <Text style={styles.occupation}>Occupation</Text>
                </View>
              </View>
              <View style={styles.cardbody}>
              <Text style={styles.description}>Description</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardheader}>
                <Image
                  source={imageprofile} style={styles.cardimage}></Image>
                <View style={styles.datos}>
                  <Text style={styles.name}>User Name</Text>
                  <Text style={styles.occupation}>Occupation</Text>
                </View>
              </View>
              <View style={styles.cardbody}>
              <Text style={styles.description}>Description</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
      cardheader:{
        width: "100%",
        height:"40%",
        flexDirection: 'row',
        padding: 10,
      },
      cardbody:{
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
    