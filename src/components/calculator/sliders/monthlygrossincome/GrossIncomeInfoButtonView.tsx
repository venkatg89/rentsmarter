import React from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Pressable } from "react-native";
import analytics from "@react-native-firebase/analytics";

import GrossIncomeInfoAlert from "./GrossIncomeInfoAlert";

function GrossIncomeInfoButtonView(props) {
  return (
    <InfoButtonContainer>
      <Pressable
        onPress={GrossIncomeInfoAlert}>
       
        <InfoButton
          source={require("../../../../../assets/BlueInfo/BlueInfo.png")}
        />
      </Pressable>
    </InfoButtonContainer>
  );
}

export default GrossIncomeInfoButtonView;

const InfoButtonContainer = styled.View`
  padding-left: 10px;
  padding-top: 3px;
`;

const InfoButton = styled.Image`
  width: 16px;
  height: 16px;
`;
