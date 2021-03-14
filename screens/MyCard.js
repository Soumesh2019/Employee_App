import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";

const MyCard = ({ name, job, email, navigation, imageUrl, item }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Profile", { item })}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            padding: 5,
          }}
          source={{
            uri: `${imageUrl}`,
          }}
        />
        <View style={{ marginLeft: 40 }}>
          <Text style={styles.text}>Name: {name}</Text>
          <Text style={styles.text}>Job: {job}</Text>
          <Text style={styles.text}>E-mail: {email}</Text>
        </View>
      </View>
    </Card>
  );
};

export default MyCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ebebeb",
    margin: 5,
    padding: 5,
  },
  text: { fontSize: 20, flexWrap: "wrap", marginTop: 4 },
});
