import React, { useState } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation


import typography from "../../../config/typography";

import { connect } from "react-redux";


import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const select = (state, props) => ({
  countData: state.countData,
  notesData: state.notesData,
});

// function mapStateToProps(state, props) {

//   return { countData: state.countData, notesData: state.notesData };
// }

function PayDeductionsView(props) {
  const rootState = useSelector((state) => state); // everything
  //  const xcountData = useSelector( state => state.countData);
  //  const xnotesData = useSelector ( state => state.notesData);
 
  const dispatch = useDispatch();

 
  // useEffect(() => {
  //   //console.log('locCount b is ' + locCount);
  //   console.log("after ");
  //   console.log(rootState);
  // }, [locCount]);

  

  const deductionsText="You can usually find these in the \"deductions\" area on your paystub. These are usually your taxes (some call this withholdings) and other amounts, like 401K. Be sure to factor in the frequency you get paid each month (weekly, bi-weekly, or once a month) when calculating."


  return (
    <Container>
      
       
   <Column>
            <StyledText>{deductionsText}</StyledText>
            <ImgView style={{width: 374, height: 500, padding: 20}}
            source={require("../../../../assets/ADP-Paystub.png")}/>
        
        </Column>

        
      
    </Container>
  );
}

export default connect(select)(PayDeductionsView);

const LargeTextStyle = typography.largeTextStyle;
const MediumTextStyle = typography.mediumTextStyle;
const SmallTextStyle = typography.smallTextStyle;

const Container = styled.View`
  flex: 1;
  /* background-color: #9c5eac; */
`;

const Spacer = styled.View`
  flex: 1;
`;

const Column = styled.View`
  flex: 1;
  flex-direction: column;
  padding-horizontal: 16px;
`;

const GetStartedButton = styled.TouchableOpacity`
  background-color: #0a649d;
  align-items: center;
  padding-horizontal: 20px;
  border-radius: 10px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  justify-content: center;
`;

const ScrView = styled.ScrollView`
  height: 200px;
`;

const ImgView = styled.Image`
padding-top: 20px;
 

`;

const StyledText = styled.Text`
padding-vertical: 30px;
 
justify-content: center;
`; 
