// import React, { useEffect, useState, useCallback } from "react";

// import styled from "styled-components/native";
// import Slider from "@react-native-community/slider";
// import { Platform,   } from "react-native";
 

// import { connect } from "react-redux";

 
// import {
//   changepaydeductions,
// } from "../../../../redux/actions/actions";

// import appColors from "../../../../config/colors";
 

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const PayDeductionsSlider = (props) => {
//   const { calculatorUIData } = props;

  
//   const changePayDeductions = (value) => {
    
//     // props.dispatch(changepaydeductions(value));
    

//   }

 
//   const slidingCompleteDeductions = (value: number) => {
//    props.dispatch(changepaydeductions(value));
   
    

//   };

//   return (
//     <ViewContainerDeductionsSlider>
//       <SliderWrapper>
//         <Slider
//           minimumValue={0}
//           maximumValue={calculatorUIData.gross_income_range}  
//           style={{ width: 370, height: 40 }}
//           step={10}
//           minimumTrackTintColor="#AADD00"
//           maximumTrackTintColor="000000"
//           thumbTintColor={Platform.select({ android: appColors.fannieBlue})}
//           //redux values:
//           value={calculatorUIData.pay_deductions_slider}
//           onValueChange={(value) => changePayDeductions(parseInt(value))}
//           // events:
//           // onSlidingStart={(value) => slidingStart(value)}
//           onSlidingComplete={(value) => slidingCompleteDeductions(value)}
//         />
//       </SliderWrapper>
//     </ViewContainerDeductionsSlider>
//   );
// };

// // the backwards tick (the grave accent character) is an ES6 Javascript template literal

// export default connect(select)(PayDeductionsSlider);



// const slidingStart = (value: number) => {};



// const SliderWrapper = styled.View`
//   margin: 0px;
//   height: 40px;
//   justify-content: center;
// `;
// //this controls je

// const ViewContainerDeductionsSlider = styled.View`
//   padding-left: 10px;
// `;
// const LabelWrapper = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px 0px;
// `;

// const LabelText = styled.Text`
//   font-size: 20px;
// `;

// const SliderHeader = styled.Text`
//   color: blue;
// `;
