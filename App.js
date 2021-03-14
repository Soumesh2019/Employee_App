import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import EditEmployee from "./screens/EditEmployee";
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";
import Store from "./store/store";

const Stack = createStackNavigator();

const options = (name = "") => {
  return {
    title: name,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#006aff",
    },
  };
};

function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={options("Employee App")}
          />
          <Stack.Screen
            name="CreateEmployee"
            component={CreateEmployee}
            options={options("Create Employee")}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Edit" component={EditEmployee} />
        </Stack.Navigator>
        <StatusBar barStyle="light-content" showHideTransition />
      </View>
    </Provider>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    // margin: 5,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
