import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const {
    _id,
    name,
    email,
    salary,
    job,
    picture,
    phone,
  } = props.route.params.item;

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  const deleteEmp = () => {
    fetch("https://serene-shelf-91637.herokuapp.com/delete", {
      method: "post",
      body: JSON.stringify({
        _id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Alert.alert("Fired Employee");
          props.navigation.navigate("Home");
        }
      })
      .catch((e) => {
        Alert.alert("Falied Delete.. Try Again");
        console.log(e);
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <Image
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          alignSelf: "center",
          marginTop: -50,
        }}
        source={{
          uri: picture.toString(),
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Title>{name}</Title>
        <Text style={styles.myText}>{job}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardView}>
          <MaterialIcons name="email" size={32} color="blue" />
          <Text style={styles.myText}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.myCard} onPress={openDial}>
        <View style={styles.cardView}>
          <MaterialIcons name="phone" size={32} color="blue" />
          <Text style={styles.myText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardView}>
          <MaterialIcons name="attach-money" size={32} color="blue" />
          <Text style={styles.myText}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={{ colors: { primary: "blue" } }}
          onPress={() => props.navigation.navigate("Edit", { _id })}
        >
          Edit
        </Button>
        <Button
          icon="account-off-outline"
          mode="contained"
          theme={{ colors: { primary: "blue" } }}
          onPress={() => deleteEmp()}
        >
          Fire
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
    marginTop: 10,
    padding: 8,
  },
  cardView: { flexDirection: "row" },
  myText: { fontSize: 18, marginTop: 3, marginLeft: 5 },
});
