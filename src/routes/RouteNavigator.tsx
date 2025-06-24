import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import PropertyDetails from "~/screens/PropertyDetails";

const Stack = createNativeStackNavigator();

export default function RouteNavigator() {
  return (
    <>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="TicketListingMain"> */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PropertyDetails"
            component={PropertyDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
