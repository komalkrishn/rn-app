import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Card } from "react-native-paper";
import Modal from "react-native-modal";

const ProfileTab = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const PickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const getData = async () => {
    try {
      const firstNameValue = await AsyncStorage.getItem("firstName");
      if (firstNameValue !== null) {
        setFirstName(firstNameValue);
      }
      const lastNameValue = await AsyncStorage.getItem("lastName");
      if (lastNameValue !== null) {
        setLastName(lastNameValue);
      }
      const addressValue = await AsyncStorage.getItem("address");
      if (addressValue !== null) {
        setAddress(addressValue);
      }
      const numberValue = await AsyncStorage.getItem("number");
      if (numberValue !== null) {
        setNumber(numberValue);
      }
      const ageValue = await AsyncStorage.getItem("age");
      if (ageValue !== null) {
        setAge(ageValue);
      }
      const dateValue = await AsyncStorage.getItem("date");
      if (dateValue !== null) {
        setDate(dateValue);
      }

      const imageValue = await AsyncStorage.getItem("image");
      if (imageValue !== null) {
        setImage(imageValue);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (
    firstName,
    lastName,
    address,
    number,
    age,
    date,
    image
  ) => {
    try {
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("lastName", lastName);
      await AsyncStorage.setItem("address", address);
      await AsyncStorage.setItem("number", number);
      await AsyncStorage.setItem("age", age);
      await AsyncStorage.setItem("date", date);
      await AsyncStorage.setItem("image", image);
    } catch (e) {
      console.log(e);
    }
  };

  const saveData = async () => {
    await storeData(firstName, lastName, address, number, age, date, image);
    Alert.alert("Data is saved successfully");
  };

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="FirstName"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="LastName"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="number"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setNumber(text)}
          value={number}
        />
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
        />

        <View style={{ margin: 25 }}>
          <Button onPress={showDatepicker} title="Show date picker!" />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <Text style={styles.dateText}>{date.toLocaleString()}</Text>

        <View>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => PickImage()}
          >
            <View style={styles.imagePicker}>
              {/* <Entypo name="images" size={24} color="black" /> */}
              <Text style={styles.galleryText}> Choose from gallery </Text>
            </View>
          </TouchableOpacity>
        </View>

        {image && (
          <Card>
            <Card.Cover source={{ uri: image }} style={styles.selectedImage} />

            <Card.Actions>
              <View style={styles.deleteImage}>
                {/* {image != null && (
                  <MaterialIcons
                    name="delete"
                    size={34}
                    color="red"
                    onPress={() => setImage(null)}
                  />
                )} */}
              </View>
              {/* <Button>Cancel</Button> */}
            </Card.Actions>
          </Card>
        )}

        <TouchableOpacity style={styles.button} onPress={() => saveData()}>
          <Text style={styles.galleryText}> Save </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#213743",
    borderRadius: 25,
  },
  input: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#cc46b9",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 28,
    width: "70%",
    height: 50,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    backgroundColor: "green",
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 30,
  },
  dateText: {
    marginBottom: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  galleryButton: {
    backgroundColor: "#cc46b9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  galleryText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedImage: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
  },
  deleteImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  picture: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
