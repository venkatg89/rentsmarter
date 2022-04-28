import React from "react";
import styled from "styled-components/native";

import {useWindowDimensions} from 'react-native';

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const width = useWindowDimensions().width;

function NavTitleHome(props) {

  let width = useWindowDimensions().width;

  return (
    <Container>
      <TitleRow>
        <RowText1>Rent Smarter</RowText1>
        <RowText2>TM</RowText2>
      </TitleRow>
      <ContainerText>Powered by Fannie Mae (R) / est. 1938</ContainerText>
    </Container>
  );
}

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default NavTitleHome;

const Container = styled.View`
  align-items: center;
  /* border-color: blue;
  border-width: 1px; */
  width: ${windowWidth}px;
  padding-right: 10px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  /* border-color: red;
  border-width: 1px; */
  
`;



const RowText1 = styled.Text`
  color: #05314d;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const RowText2 = styled.Text`
  color: #085280;
  font-size: 10px;
  font-style: italic;
  text-align: center;
`;
const ContainerText = styled.Text`
  color: #05314d;
  font-size: 10px;
  font-weight: bold;
`;
