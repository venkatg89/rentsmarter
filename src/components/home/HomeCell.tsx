import React from "react";
import { useNavigation } from '@react-navigation/native';

// styled-components
import styled from 'styled-components/native';
import analytics from '@react-native-firebase/analytics'



import {

  Dimensions,


} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeCell(props) {
  const navigation = useNavigation();

  // switch {
  //   case props.header {

  //   }
  // }

 

  return (
  <Container>
    <BoxWithShadow>
        <CardImage source={props.image}/>
        <TextRow>
          <Spacer/>
          <TitleText>{props.header}</TitleText>
          <Spacer/>
        </TextRow>
        <TextRow>
          <Spacer/>
          <SubtitleText>{props.description}</SubtitleText>
          <Spacer/>
        </TextRow>
            <GetStartedButton  onPress={() => {
                 analytics().logEvent("Homescreen_MainPage_GetStarted_Btn_Press", {
                  id: 50000001,
                  event: "get started button",
                  description: ["get started pressed", props.header],
                 
                });
                navigation.navigate(props.navigate)}}>
            <ButtonRow>
              <ButtonText>Get Started</ButtonText>
            </ButtonRow>
          </GetStartedButton>
    </BoxWithShadow>
  </Container>
)};

 
const Spacer=styled.View`
flex: 1;
`

const ButtonText=styled.Text`
color: white;
`

const ButtonRow=styled.View`
flex-direction: row;
`

const TextRow=styled.View`
flex-direction: row;
padding-horizontal: 20px;
`

let Container=styled.View`
padding-horizontal: 50px;
padding-top: 10px;
padding-bottom: 10px;
align-items: center;
`

const TitleText=styled.Text`
color: black;
font-size: 17px  ;
font-weight: bold;
padding: 10px;
`

const SubtitleText=styled.Text`
padding: 10px;
`

const CardImage=styled.Image`
width: 60px;
height: 60px;
`
const GetStartedButton=styled.TouchableOpacity`
background-color: #0A649D;
align-items: center;
padding-horizontal: 20px;
border-radius: 10px;
padding: 10px;
shadow-color: #000;
shadow-offset: 5px 5px ;
shadow-opacity: 0.5;
shadow-radius: 5px; 
justify-content: center;
`

const BoxWithShadow=styled.View`
align-items: center;
background-color: white;
padding-top: 20px;
padding-bottom: 20px;
border-radius: 15px;
shadow-color: #000;
shadow-offset: 5px 15px ;
shadow-opacity: 0.5;
shadow-radius: 10px;
`

export default HomeCell;
