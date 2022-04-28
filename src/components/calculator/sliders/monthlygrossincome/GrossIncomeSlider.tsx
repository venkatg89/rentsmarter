// import React, { useEffect, useState, useCallback } from "react";

// import styled from "styled-components/native";
// import Slider from "@react-native-community/slider";
// // import Slider from "../../../../rangeslider/Slider";

// import { Platform, } from "react-native";


// import { connect } from "react-redux";

// import {
//   changegrossincome,

   
// } from "../../../../redux/actions/actions";

// import appColors from "../../../../config/colors";
// import CalculatorState from "../../Arc/CalculatorState";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const GrossIncomeSlider = (props) => {
//   const { calculatorUIData } = props;

//   const changeGrossIncome = (value: number) => { // removed async keyword
    
//     //props.dispatch(changegrossincome(value));
   
//   };

   
//   const slidingStart = (value: number) => {
//     // console.log("sliding start");
//     props.dispatch(changegrossincome(value));
//   };

//   const slidingComplete = (value: number) => {
   
//     // you can do a test here to see if value has changed since last OnValueChange,
//     // if it's the same, don't do the dispatch, save a cycle. Later optimization.
    
//     props.dispatch(changegrossincome(value));
    
//   };

//   const onSliderLayout = (e) => {
//     // console.log(e);
//   };

//   // {Animated.event(
//   //   // scrollX = e.nativeEvent.contentOffset.x
//   //   [{ nativeEvent: {
//   //        contentOffset: {
//   //          x: scrollX
//   //        }
//   //      }
//   //    }]
//   // )}

//   return (
//     <ViewContainer>
//       <SliderWrapper>
//         <Slider
//           minimumValue={0}
//           step={1}
//           maximumValue={calculatorUIData.gross_income_range} // {calculatorUIData.gross_income_range}
//           style={{ width: 370, height: 40 }}
//           step={10}
//           minimumTrackTintColor="#242423"
//           maximumTrackTintColor="000000"
//           thumbTintColor={Platform.select({ android: appColors.fannieBlue })}
//           //redux values:
//           value={CalculatorState.grossincomeslider}
//           onValueChange={(value) => changeGrossIncome(value)}
//           // events:
//           onSlidingStart={(value) => slidingStart(value)}
//           onSlidingComplete={(value) => slidingComplete(value)}
//           onLayout={onSliderLayout}
//         />
//       </SliderWrapper>
//     </ViewContainer>
//   );
// };

// // the backwards tick (the grave accent character) is an ES6 Javascript template literal

// export default connect(select)(GrossIncomeSlider);

// const SliderWrapper = styled.View`
//   margin: 0px;
//   height: 40px;
//   justify-content: center;
// `;
// //this controls je

// const ViewContainer = styled.View`
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
