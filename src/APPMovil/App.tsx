// Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const image = {uri: 'https://neetwork.com/wp-content/uploads/2019/10/marketing-de-servicios.jpg'};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para verificar las credenciales
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <ImageBackground
    source={image}

    style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: "black",
  },
  input: {
    width: 350,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: 20,
    color: "black"
  },
  button: {
    width: 250,
    backgroundColor: '#586DFA',
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontSize: "20"
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});

export default Login;
