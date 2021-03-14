import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import Button from "react-native-paper/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

import { createEmp } from "../features/employeeSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const CreateEmployee = (props) => {
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [salary, setsalary] = useState("");
  const [job, setjob] = useState("");
  const [modal, setmodal] = useState(false);
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Camera roll Permissions Needed");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const imageArray = result.uri.split(".");
      const ext = imageArray[imageArray.length - 1];
      const type = `test/${ext}`;
      const name = `test.${ext}`;

      const imageData = {
        uri: result.uri,
        type,
        name,
      };

      handleUpload(imageData);
    }
  };

  const pickCameraImage = async () => {
    ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const imageArray = result.uri.split(".");
      const ext = imageArray[imageArray.length - 1];
      const type = `test/${ext}`;
      const name = `test.${ext}`;

      const imageData = {
        uri: result.uri,
        type,
        name,
      };

      handleUpload(imageData);
    }
  };

  const handleUpload = async (image) => {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "employee_App");
    formData.append("cloud_name", "diawchulw");

    await fetch("https://api.cloudinary.com/v1_1/diawchulw/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setmodal(false);
      });
  };

  const submitData = () => {
    try {
      const result = dispatch(
        createEmp({ name, phone, email, salary, picture, job })
      );
      unwrapResult(result);

      if (result.arg) {
        result.abort();
        Alert.alert("Profile Uploaded");
        props.navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Uploading Error... Try Again");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior="height" enabled={true}>
      <View>
        <TextInput
          value={name}
          onChangeText={(e) => setName(e)}
          label="Name"
          mode="outlined"
          theme={{ colors: { primary: "blue" } }}
        />
        <TextInput
          value={phone}
          onChangeText={(e) => setphone(e)}
          label="Phone No."
          mode="outlined"
          keyboardType="number-pad"
          theme={{ colors: { primary: "blue" } }}
        />
        <TextInput
          value={email}
          onChangeText={(e) => setemail(e)}
          label="Email"
          mode="outlined"
          theme={{ colors: { primary: "blue" } }}
        />
        <TextInput
          value={salary}
          onChangeText={(e) => setsalary(e)}
          label="Salary"
          mode="outlined"
          theme={{ colors: { primary: "blue" } }}
        />
        <TextInput
          value={job}
          onChangeText={(e) => setjob(e)}
          label="Job"
          mode="outlined"
          theme={{ colors: { primary: "blue" } }}
        />

        {picture ? (
          <Button
            icon="check"
            mode="contained"
            theme={{ colors: { primary: "blue" } }}
            style={{ marginTop: 10 }}
            onPress={() => setmodal(true)}
          >
            Uploaded Image
          </Button>
        ) : (
          <Button
            icon="upload"
            mode="contained"
            theme={{ colors: { primary: "blue" } }}
            style={{ marginTop: 10 }}
            onPress={() => setmodal(true)}
          >
            Upload Image
          </Button>
        )}
        <Button
          icon="content-save"
          mode="contained"
          theme={{ colors: { primary: "blue" } }}
          style={{ marginTop: 10 }}
          onPress={() => submitData()}
        >
          Save Profile
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setmodal(false)}
        >
          <View style={styles.bottomView}>
            <View style={styles.buttonView}>
              <Button
                icon="camera"
                mode="outlined"
                theme={{ colors: { primary: "blue" } }}
                style={{ marginBottom: 10 }}
                onPress={() => pickCameraImage()}
              >
                Camera
              </Button>
              <Button
                icon="folder-image"
                theme={{ colors: { primary: "blue" } }}
                mode="outlined"
                onPress={() => pickImage()}
              >
                Gallery
              </Button>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Button
                icon="close"
                mode="contained"
                theme={{ colors: { primary: "blue" } }}
                onPress={() => setmodal(false)}
                style={{ borderRadius: 0 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEmployee;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#b8e6ff",
    width: "100%",
    height: "50%",
  },
});
