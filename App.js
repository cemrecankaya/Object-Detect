import React from "react";
import { View , Text, StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import menu from "./src/screen/menu.js";
import gallery from "./src/screen/gallery.js";
import camera from "./src/screen/camera.js";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen options={{headerShown: false}} name="Menu" component={menu} />
        <Stack.Screen name="Galeri" component={gallery} />
        <Stack.Screen options={{headerShown: false}} name="Kamera" component={camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}