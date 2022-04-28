import React from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Pressable } from "react-native";
import analytics from "@react-native-firebase/analytics";

import ExpensesInfoAlert from "./ExpensesInfoAlert";

function ExpensesInfoButtonView(props) {
  return (
    <InfoButtonContainer>
      <Pressable
        onPress={ExpensesInfoAlert}>
        <InfoButton
          source={require("../../../../../assets/BlueInfo/BlueInfo.png")}
        />
      </Pressable>
    </InfoButtonContainer>
  );
}

export default ExpensesInfoButtonView;

const InfoButtonContainer = styled.View`
  padding-left: 10px;
  padding-top: 3px;
`;

const InfoButton = styled.Image`
  width: 16px;
  height: 16px;
`;
