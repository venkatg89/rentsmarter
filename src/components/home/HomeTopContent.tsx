



import React from "react";

import styled from 'styled-components/native';
 
import {   Linking, } from 'react-native';
import typography from "../../config/typographyVA";



function HomeTopContent (props) {

    return (
    
    <TopContentContainer>
        {/* <CovidReliefLink onPress={() => Linking.openURL('https://capmrkt.fanniemae.com/heretohelp/renters/')}>
            <CovidReliefText>Covid-19 renter relief</CovidReliefText>
        </CovidReliefLink>
        <CovidReliefTextSmall>Find out about resources to help during these challenging times</CovidReliefTextSmall>
        <ContentBackground 
          source={require('../../../assets/Home-Image.png')}>
        </ContentBackground> */}
      </TopContentContainer>

    )
}

export default HomeTopContent



const CovidReliefText=styled.Text`
     color: white;
     font-size: 16px;
     text-decoration: underline;

     
`
const CovidReliefTextSmall=styled(typography.smallTextStyle)` 
     color: white;
    
`

const CovidReliefLink=styled.TouchableOpacity`
     height: 40px;
     background-color: #0A649D;
     justify-content: center;
     align-items: center;
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