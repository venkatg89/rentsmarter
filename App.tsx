/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect, useState } from "react";
 import type { ReactNode } from "react";
 
 import { NavigationContainer } from "@react-navigation/native";
 
 import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
 
 import Ionicons from "react-native-vector-icons/Ionicons";
 
 import ChecklistScreen from "./src/views/ChecklistScreen";
 import AssistantScreen from "./src/views/AssistantScreen";
 import PropertyScreen from "./src/views/PropertySearch";
 
 import colors from "./src/config/colors";
 
 import SplashScreen from "react-native-splash-screen";
 
 import { Image } from "react-native";
 import styled from "styled-components/native";
 
 import analytics from "@react-native-firebase/analytics";
 
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   LogBox,
 } from "react-native";
 
 import {
   Colors,
   // DebugInstructions,
   // Header,
   // LearnMoreLinks,
   // ReloadInstructions,
 } from "react-native/Libraries/NewAppScreen";
 
 import HomeStackScreen from "./src/views/HomeScreen";
 
 import CalculatorStackScreen from "./src/components/calculator/pages/CalculatorTabView";
 import { AnalyticsContext } from ".";
 
 LogBox.ignoreAllLogs(); // turns off error messages in simulator
 
 const Section = ({ children, title }): ReactNode => {
   const isDarkMode = useColorScheme() === "dark";
 
 
 
   return (
     <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.sectionContainer}>
         <Text
           style={[
             styles.sectionTitle,
             {
               color: isDarkMode ? Colors.white : Colors.black,
             },
           ]}
         >
           {title}
         </Text>
         <Text
           style={[
             styles.sectionDescription,
             {
               color: isDarkMode ? Colors.light : Colors.dark,
             },
           ]}
         >
           {children}
         </Text>
       </View>
       /
     </SafeAreaView>
   );
 };
 
 const Tab = createMaterialBottomTabNavigator();
 // const Tab = createBottomTabNavigator();
 
 const App = () => {
   const {collections, instance} = useContext(AnalyticsContext)
 
   // one time only
   React.useEffect(() => {
     SplashScreen.hide();
   }, [])
 
   useEffect(() => {
     //console.log("#002  collections", collections)
     //console.log("#003 instance ", instance)

     
     analytics().setAnalyticsCollectionEnabled(true)
     
     
   }, [])
 
   return (
     <NavigationContainer>
       <Tab.Navigator
         barStyle={{ backgroundColor: colors.grayNeutral }}
         shifting={false}
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName: string = "";
             if (route.name === "Home") {
               iconName = focused ? "home-active" : "home-inactive";
             } else if (route.name === "Property") {
               iconName = focused ? "property-active" : "property-inactive";
             } else if (route.name === "Calculator") {
               iconName = focused ? "calculator-active" : "calculator-inactive";
             } else if (route.name === "Checklist") {
               iconName = focused ? "checklist-active" : "checklist-inactive";
             } else if (route.name === "Assistant") {
               iconName = focused ? "assistant-active" : "assistant-inactive";
             }
 
             //  return <Ionicons name={iconName} size={size} color={color} />;
 
             switch (iconName) {
               case "home-active":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/HomeActive.png")}
                     />
                   </RNImageView>
                 );
               case "home-inactive":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets//navassets/HomeInactive.png")}
                     />
                   </RNImageView>
                 );
               case "property-active":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/PropertyActive.png")}
                     />
                   </RNImageView>
                 );
               case "property-inactive":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/PropertyInactive.png")}
                     />
                   </RNImageView>
                 );
               case "calculator-active":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/CalculatorActive.png")}
                     />
                   </RNImageView>
                 );
               case "calculator-inactive":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/CalculatorInactive.png")}
                     />
                   </RNImageView>
                 );
               case "checklist-active":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/ChecklistActive.png")}
                     />
                   </RNImageView>
                 );
               case "checklist-inactive":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/ChecklistInactive.png")}
                     />
                   </RNImageView>
                 );
               case "assistant-active":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/AssistantActive.png")}
                     />
                   </RNImageView>
                 );
               case "assistant-inactive":
                 return (
                   <RNImageView>
                     <Image
                       style={{ width: 23, height: 23, resizeMode: "contain" }}
                       source={require("./assets/navassets/AssistantInactive.png")}
                     />
                   </RNImageView>
                 );
             }
           },
           // other screen
 
           headerShown: false,
         })}
       >
         <Tab.Screen name="Home" component={HomeStackScreen} />
         <Tab.Screen name="Property" component={PropertyScreen} />
         <Tab.Screen name="Calculator" component={CalculatorStackScreen} />
         <Tab.Screen name="Checklist" component={ChecklistScreen} />
         <Tab.Screen name="Assistant" component={AssistantScreen} />
       </Tab.Navigator>
     </NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: "600",
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: "400",
   },
   highlight: {
     fontWeight: "700",
   },
 });
 
 export default App;
 
 const RNImageView = styled.View`
   width: 23px;
   height: 35px;
 `;
 