import React, { useState } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation

import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// react-native
import { Text, View, Dimensions, Modal } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// function Settings({ modalVisible }) {
//   const SettingsStack = createStackNavigator();

//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen
//       name="SettingsModal"
//       component={SettingsModal}/>
//     </SettingsStack.Navigator>
//   )
// };

function SettingsModal({ modalVisible }) {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(modalVisible);
      }}
    >
      <CenteredView>
        <ModalView>
          <View style={{ flexDirection: "row", paddingTop: 20 }}>
            <Spacer />
            <ModalText>Settings</ModalText>
            <Spacer />
            <ButtonClose onPress={() => setModalVisible(modalVisible)}>
              <Ionicons name="close" size={20} />
            </ButtonClose>
          </View>
          <Separator />
          <View style={{ height: 30 }} />
          <Separator />
          <TappableRow onPress={() => navigation.navigate("Terms")}>
            <SettingsText>Terms of Use</SettingsText>
            <Spacer />
            <Ionicons
              name="chevron-forward"
              color="#C4C4C7"
              size={20}
            ></Ionicons>
          </TappableRow>
          <Separator />
          <TappableRow onPress={() => navigation.navigate("Privacy")}>
            <SettingsText>Privacy Notice</SettingsText>
            <Spacer />
            <Ionicons
              name="chevron-forward"
              color="#C4C4C7"
              size={20}
            ></Ionicons>
          </TappableRow>
          <Separator />
          <View style={{ height: 30 }} />
          <Separator />
          <TappableRow>
            <View style={{ paddingRight: 10 }}>
              <Ionicons name="mail" color="#447AA7" size={20}></Ionicons>
            </View>
            <SettingsText>Send Us Feedback</SettingsText>
            <Spacer />
          </TappableRow>
          <Separator />
          <Spacer />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Rent Smarter</Text>
            <Text>v2.38</Text>
            <Text>build 53</Text>
            <Text>(C) 2022 Fannie Mae</Text>
          </View>
          <Spacer />
        </ModalView>
      </CenteredView>
    </Modal>
  );
}

export default SettingsModal;

const Spacer = styled.View`
  flex: 1;
`;
const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled.View`
  background-color: #F0F3F4;
  padding-vertical: 35px;
  width: ${windowWidth}px;
  height: ${windowHeight}px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
  flex-direction: row;
  font-weight: bold;
`;

const ButtonClose = styled.Pressable`
  padding-horizontal: 10px;
  elevation: 2;
`;

const TextStyle = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const TappableRow = styled.TouchableOpacity`
  align-items: center;
  color: blue;
  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  background-color: white;
`;

const Separator = styled.View`
  width: ${windowWidth}px;
  background-color: #d0d3d4;
  height: 1px;
`;

const SettingsText = styled.Text`
  color: #447aa7;
`;
