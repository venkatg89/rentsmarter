import React from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Pressable } from "react-native";
import analytics from "@react-native-firebase/analytics";

import ArcInfoAlert from "./ArcInfoAlert";

function ArcInfoButtonView(props) {
  return (
    <InfoButtonContainer>
      <Pressable
        onPress={ArcInfoAlert}>
        <InfoButton
          source={require("../../../../assets/BlueInfo/BlueInfo.png")}
        />
      </Pressable>
    </InfoButtonContainer>
  );
}

export default ArcInfoButtonView;

const InfoButtonContainer = styled.View`
  padding-left: 10px;
`;

const InfoButton = styled.Image`
  width: 20px;
  height: 20px;
`;
