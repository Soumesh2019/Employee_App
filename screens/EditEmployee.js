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
import { useDispatch, useSelector } from "react-redux";

import { editEmp, employeeSelector } from "../features/employeeSlice";

const CreateEmployee = (props) => {
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [salary, setsalary] = useState("");
  const [job, setjob] = useState("");
  const [loading, setLoading] = useState(false);
  const { _id } = props.route.params;
  const selector = useSelector(employeeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = selector.data.find((item) => item._id === _id);
    const {
      email: Email,
      job: Job,
      name: Name,
      phone: Phone,
      salary: Salary,
    } = data;

    setName(Name);
    setphone(Phone);
    setjob(Job);
    setemail(Email);
    setsalary(Salary);
  }, []);

  const updateData = () => {
    try {
      const promise = dispatch(
        editEmp({ name, email, job, salary, phone, _id })
      );

      if (promise.arg) {
        Alert.alert("Data Updated");
        props.navigation.navigate("Home");
        promise.abort();
      }
    } catch (error) {
      Alert.alert("Error Updating.. Try Again");
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="position"
      enabled={true}
    >
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

        <Button
          icon="account-edit"
          mode="contained"
          theme={{ colors: { primary: "blue" } }}
          style={{ marginTop: 10 }}
          onPress={() => updateData()}
        >
          Edit Profile
        </Button>
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
