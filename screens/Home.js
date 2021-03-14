import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import MyCard from "./MyCard";
import FAB from "react-native-paper/src/components/FAB/FAB";
import { employeeSelector, fetchEmployees } from "../features/employeeSlice";

const Home = ({ navigation }) => {
  const [details, setDetails] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const result = await dispatch(fetchEmployees());

      unwrapResult(result);
      setDetails(result.payload);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error... Try Again");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={details}
        renderItem={({ item }) => {
          return (
            <MyCard
              name={item.name}
              job={item.job}
              navigation={navigation}
              imageUrl={item.picture}
              email={item.email}
              item={item}
            />
          );
        }}
        keyExtractor={(item) => item._id.toString()}
        refreshing={refreshing}
        onRefresh={() => fetchData()}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("CreateEmployee")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    backgroundColor: "blue",
    bottom: 0,
  },
});

export default Home;
