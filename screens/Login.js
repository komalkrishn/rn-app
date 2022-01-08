import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1020631788008-o6ut9v9pi22mc4hvbarh1fpv51d6r6f7.apps.googleusercontent.com',
});


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //check if user is logged in or not and when we leave the screen it will unsubscribe from the listener
  useEffect(() => {
    // const unsubscribe = auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     navigation.replace("Home");
    //   }
    
    // });
    // return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.navigate("Signup")
  };
  const handleLogin = () => {
    
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCreden) => {
        const user = userCreden.user;
        console.log(`login with...${user.email}`);
      })
      .catch((error) => alert(error.message));
  };

  async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  console.log(googleCredential)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
       <Text>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
         
          <Text style={styles.buttonOutlineText} onPress={handleSignUp} >Signup </Text>
         

          <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Text style={styles.buttonText}> Sign in with google </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 100,
  },
  input: {
    color: "black",
    fontWeight: 'bold',
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "blue",
    fontWeight: "600",
    fontSize: 15,
  },
});
