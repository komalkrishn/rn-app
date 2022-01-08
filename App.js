import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button , Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import HomeTab from "./Tabs/HomeTab";
import ProfileTab from "./Tabs/ProfileTab";
import SettingTab from "./Tabs/SettingTab";


const Tab = createBottomTabNavigator();

const BottomTabs = () =>{
  return(
    <Tab.Navigator>
    <Tab.Screen name="HomeScreen"  component={HomeTab} options={() => ({
          tabBarIcon: () => {
          
            return <Image source={require('./assets/homeLogo.png')} style={{width:30, height:30}}/>
          },
         
        })} />
    <Tab.Screen name="Profile" component={ProfileTab} options={() => ({
          tabBarIcon: () => {
          
            return <Image source={require('./assets/profileLogo.png')} style={{width:30, height:30}}/>
          },
         
        })} />

    <Tab.Screen name="Settings" component={SettingTab} options={() => ({
          tabBarIcon: () => {
          
            return <Image source={require('./assets/settingsLogo.png')} style={{width:30, height:30}}/>
          },
         
        })}/>
  </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
            
          <Stack.Screen name="Home" component={BottomTabs}  options={{
              headerShown: false,
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabNames: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default App;
