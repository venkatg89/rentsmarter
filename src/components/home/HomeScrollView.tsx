import React from "react";

import styled from 'styled-components/native';
import HomeCell from './HomeCell';
 
import { Platform } from 'react-native';
import appColors from "../../config/colors";



function HomeScrollView(props) {

    return (
        <ViewContainer> 
           
          <CardsScrollView>
  
              <HomeCell image={require("../../../assets/Property-Card.png")} navigate="Property" header="Find your rental" description="Let our property search help you find the right property in your journey."/>
              <HomeCell image={require("../../../assets/Calculator-Card.png")} navigate="Calculator" header="See what you can afford" description="Use our rent calculator to see how much you can afford to spend on rent!"/>
              <HomeCell image={require("../../../assets/Checklist-Card.png")} navigate="Checklist" header="Things to know before you rent" description="We put together a checklist outlining the major items to keep in mind as you prepare for your next move."/>
              <HomeCell image={require("../../../assets/VA-Card.png")} navigate="Assistant" header="Get a helping hand" description="Our Virtual Assistant is here to help answer your questions and guide you in your path forward."/>
                  
            <HowDoWeUseThisInfoButton onPress={() => navigation.navigate("Calculator")}>
                <InfoText>How do we use this information?</InfoText>
            </HowDoWeUseThisInfoButton>
          </CardsScrollView>
        </ViewContainer>

    )
};

export default HomeScrollView

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
  flex: 1;
`
const SliderHeader=styled.Text`
color: blue;
align-items: center;
`

const SliderTextInput = styled.TextInput`
/* border: blue; */
width: 50px;
 
height: ${Platform.select({ ios: '40px', android: '20px' })};
border: ${Platform.select({ ios: 'red', android: 'blue' })};
`

const SliderTitleRow = styled.View`
flex-direction: row;
`

const Spacer = styled.Text`
border: red;
flex: 1;
`

const SlidersScrollView = styled.ScrollView`
`
const InfoText=styled.Text`
color: ${appColors.fannieBlue};
font-size: 16px;
`

const CovidReliefText=styled.Text`
color: white;
     font-size: 16px;
     text-decoration: underline;
`

const CovidReliefLink=styled.TouchableOpacity`
     height: 40px;
     background-color: #0A649D;
     justify-content: center;
     align-items: center;
`

const HowDoWeUseThisInfoButton=styled.TouchableOpacity`
height: 40px;
background-color: white;
justify-content: center;
align-items: center;
 
`

const Container=styled.SafeAreaView`
  
`
const CardsScrollView=styled.ScrollView`
margin-top: 20px;
/* flex-grow: 1;
height: 1200px; */
`
const TopContentContainer=styled.View`
justify-content: center;
`
const ContentBackground=styled.ImageBackground`
     height: 100px;
     justify-content: center;
     align-items: center;
     padding-top: 100px;
`