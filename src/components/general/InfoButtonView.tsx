import React from "react";

import styled from "styled-components/native";


function InfoButtonView(props) {
  return (
    <InfoButtonContainer>
      <InfoButton source={require("../../../assets/BlueInfo/BlueInfo.png")} />
    </InfoButtonContainer>
  );
}

export default InfoButtonView;

const InfoButtonContainer = styled.View`
  padding-left: 10px;
`;

const InfoButton = styled.Image`
  width: 20px;
  height: 20px;
`;
