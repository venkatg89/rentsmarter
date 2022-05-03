import React, { useState, useEffect } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// application

import NavTitleProperty from "../components/propertysearch/NavTitleProperty";
import { vh, vw } from "react-native-css-vh-vw";

// react-native
import { Image, StyleSheet } from "react-native";

import typography from "../config/typography";

import SearchScreen from "./SearchScreen";

import PropertyMapView from "./PropertySearch/PropertyMapView";
import SavedProperties from "./PropertySearch/SavedProperties";
import PropertySearchFilters from "./PropertySearch/PropertySearchFilters";

const PropertyStack = createStackNavigator();

function PropertyStackScreen({}) {
  return (
    <PropertyStack.Navigator screenOptions={{ headerShown: true }}>
      <PropertyStack.Screen
        name="PropertyStack"
        component={PropertyScreen}
        options={{
          headerTitle: NavTitleProperty,
          // headerRight:() => (
          //     <PropertyButton onPress={''} >
          //       <EllipsisText>...</EllipsisText>
          //     </PropertyButton>
          //     )
        }}
      />
      <PropertyStack.Screen
        name="Property Search"
        component={PropertyMapView}
      />
      <PropertyStack.Screen
        name="Saved Properties"
        component={SavedProperties}
      />
      <PropertyStack.Screen
        name="Property Search Filters"
        component={PropertySearchFilters}
      />
    </PropertyStack.Navigator>
  );
}

// 'this.showSettings' in 'OnPress' was causing Android not to work

const PropertyScreen = () => {
  return (
    <PropertySearchView>
      <SearchScreen navigate="Property Search" />
    </PropertySearchView>
  );
};

export default PropertyStackScreen;

const MediumBoldText = styled(typography.mediumTextBold)``;
const LargeBoldText = styled(typography.largeTextBold)``;
const MediumText = styled(typography.mediumTextStyle)`
  padding-top: 8px;
  text-align: center;
`;

const SpacerView = styled.View`
  height: 100px;
`;

const ViewContainer = styled.View`
  height: ${vh(100)};
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.ScrollView`
  /* height: ${vh(1.5)};
width: ${vw(85)};
border-width: 1;
border-radius: 25; */
  /* justify-content: center; */
`;

const PropertySearchView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const PropertySearchRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

const PropertySearchColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-horizontal: 48px;
  align-items: center;
`;

const Spacer = styled.View`
  flex: 1;
`;

const PropertyButton = styled.TouchableOpacity`
  align-content: space-between;
`;

const EllipsisText = styled.Text`
  color: blue;
  font-weight: bold;
  padding-horizontal: 10px;
`;
const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#8e44ad",
    color: "#fff",
    fontSize: 22,
    padding: 20,
    textAlign: "center",
  },
  content: {
    padding: 10,
    overflow: "hidden",
  },
  btn: {
    margin: 10,
    backgroundColor: "#9b59b6",
    borderRadius: 3,
    padding: 10,
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
