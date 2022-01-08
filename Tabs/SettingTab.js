import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import auth from '@react-native-firebase/auth';


const SettingTab = () => {

    const navigation = useNavigation();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
    return (
        <View style={styles.container}>
             <Text style={styles.textEmail}> User Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out </Text>
      </TouchableOpacity>
        </View>
    )
}

export default SettingTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#213743'
  },
  textEmail: {
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
    button: {
    backgroundColor: "#cc46b9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
})
