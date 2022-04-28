

import React from "react";

// styled-components
import styled from 'styled-components/native';

// react-navigation
import { createStackNavigator } from '@react-navigation/stack';

// application
 
import NavTitleAssistant from '../components/assistant/NavTitleAssistant';
 

// react-native
import {
  
  Image,
   
  
} from 'react-native';
import typography from "../config/typographyVA";

 
 
 const AssistantStack = createStackNavigator();



function AssistantStackScreen({}) {
  return (
    <AssistantStack.Navigator 
      screenOptions={{headerShown: true}}
    >
      <AssistantStack.Screen name="AssistantStack" component={AssistantScreen} options={{  
        headerTitle: NavTitleAssistant,
        // headerRight:() => (
        //     <AssistantButton onPress={''} >
        //       <EllipsisText>...</EllipsisText>
        //     </AssistantButton>
        //     )
          }} 
      />
    </AssistantStack.Navigator>

   
  );
}

// 'this.showSettings' in 'OnPress' was causing Android not to work

const AssistantScreen = () => {
  return (
    
    <AssistantView>
      <Spacer/>
         <AssistantColumn>
         <Image style={{width: 80, height: 100, padding: 20}}
                    source={require("../../assets/VAOwl/VAOwl.png")}/>
          <Spacer/>
         <LargeBoldText>Get a helping hand!</LargeBoldText>
         <MediumText>Our Virtual Assistant is here to help answer your questions and guide you in your path forward.
 </MediumText>
         <Spacer/>
         </AssistantColumn>
         <Spacer/>

    </AssistantView>
   
  );
};

{/* <LargeBoldText>Property search coming soon!</LargeBoldText>
<MediumText>
  Hang tight! Soon you'll be able to search for properties within your area and budget.
</MediumText> */}

export default AssistantStackScreen;

const LargeBoldText = styled(typography.largeTextBold)``

const MediumText = styled(typography.mediumTextStyle)`
padding-top: 8px;
text-align: center;
`

const AssistantView = styled.View`
flex:1;
flex-direction: column;
`
const AssistantRow = styled.View`
flex:1;
flex-direction: row;
`
const AssistantColumn = styled.View`
flex: 1;
flex-direction: column;
justify-content: center;
padding-horizontal: 48px;
align-items: center;
`


const Spacer=styled.View`
flex: 1
`
const AssistantButton = styled.TouchableOpacity`
align-content : space-between  ;  
` 

const EllipsisText=styled.Text`
 color: blue;
    font-weight: bold;
    padding-horizontal: 10px;
`
