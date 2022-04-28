import React, { useState, useEffect } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation
import { createStackNavigator } from "@react-navigation/stack";
import CheckCell from "../components/checklist/checkCell";

// application
import NavTitleChecklist from "../components/checklist/NavTitleChecklist";

// react-native
import { ScrollView, Text, View, Dimensions, Image } from "react-native";
import Terms from "../components/settings/TermsOfUse";
import ChecklistDetails from "../components/checklist/ChecklistDetails";
import PrivacyNotice from "../components/settings/PrivacyNotice";
import analytics from "@react-native-firebase/analytics";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChecklistStackScreen({}) {
  const ChecklistStack = createStackNavigator();

  useEffect(() => {
    
  }, []);

  return (
    <ChecklistStack.Navigator screenOptions={{ headerShown: true }}>
      <ChecklistStack.Screen
        name="Checklist"
        component={ChecklistScreen}
        options={{
          headerTitle: NavTitleChecklist,
          //   headerRight:() => (
          //       <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
          //         <EllipsisText>...</EllipsisText>
          //       </TouchableOpacity>
          // )
        }}
      />
      <ChecklistStack.Screen name="Terms" component={Terms} />
      <ChecklistStack.Screen
        name="Checklist Items"
        component={ChecklistDetails}
      />
      <ChecklistStack.Screen name="Privacy" component={PrivacyNotice} />
    </ChecklistStack.Navigator>
  );

  function ChecklistScreen() {
    // analytics
 
    useEffect(() => {
      analytics().logEvent("Checklist_MainPage_Arrived", {
        id: 40000001,
        event: "checklist page - top level",
        description: ["on checklist screen page"],
      })
    }, []);

    return (
      <SafeArea>
        <View
          style={{
            backgroundColor: "#0A649D",
            width: windowWidth,
            alignItems: "center",
            padding: 30,
          }}
        >
          <Image
            style={{ width: 70, height: 70, padding: 20 }}
            source={require("../../assets/Checklist-Card.png")}
          />
          <Title>Ready to start renting?</Title>
          <Text style={{ color: "white" }}>
            Use our "what you need to know" list to help prepare you for your
            journey.
          </Text>
        </View>
        <ScrollView style={{ width: windowWidth }}>
          <CheckCell />
        </ScrollView>
        {/* <Settings modalVisible={modalVisible}/> */}
      </SafeArea>
    );
  }
}

const Spacer = styled.View`
  flex: 1;
`;
const Title = styled.Text`
  padding: 20px;
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const ChecklistView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ChecklistButton = styled.TouchableOpacity`
  align-content: space-between;
`;

const EllipsisText = styled.Text`
  color: blue;
  font-weight: bold;
  padding-horizontal: 10px;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: #f8f6f5;
  align-items: center;
`;

export default ChecklistStackScreen;
