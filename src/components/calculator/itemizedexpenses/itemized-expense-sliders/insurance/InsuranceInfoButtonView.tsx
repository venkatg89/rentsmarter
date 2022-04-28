import React from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import {  Pressable } from "react-native";

import InsuranceInfoAlert from "./InsuranceInfoAlert";

function InsuranceInfoButtonView(props) {
  return (
    <InfoButtonContainer>
      <Pressable onPress={InsuranceInfoAlert} >
      <InfoButton source={require("../../../../../../assets/BlueInfo/BlueInfo.png" )} />
                                  
      </Pressable>
    </InfoButtonContainer>
  );
}

export default InsuranceInfoButtonView;

const InfoButtonContainer = styled.View`
  padding-left: 10px;
  padding-top: 3px;
`;

const InfoButton = styled.Image`
  width: 16px;
  height: 16px;
`;
