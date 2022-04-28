// import React, {   useState,   } from "react";

// import styled from "styled-components/native";
// import Slider from "@react-native-community/slider";
// import { Platform,   } from "react-native";
 

// import { connect } from "react-redux";

 

// import {
   
//   changepercentincome,
 
 
// } from "../../../../redux/actions/actions";

 
// import appColors from "../../../../config/colors";
 

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
//   calculatorCalculationsData: state.calculatorCalculationsData,
// });

// const NewPercentGrossIncome = (props) => {
//   const { calculatorUIData, calculatorCalculationsData } = props;

  

//   const changePercentIncome = (value) => {
//     // colorStep(value);
//     // let anum = props.dispatch(changepercentincome(value));
   
  
//   };


//   function colorStep(value) {
//     switch (true) {
//       case value <= 30:
//         setSliderPercentColor(appColors.percentIncomeSliderBGGreen);

        
//         break;
//       case value == 40:
//         setSliderPercentColor(appColors.savingsGold);
         
//         break;
//       case value >= 50:
//         setSliderPercentColor(appColors.spentTooMuchMaroonRed);
        
//         break;
//       default:
//         setSliderPercentColor(appColors.percentIncomeSliderBGGreen);
        
//         break;
//     }
//   }

//   const [sliderPercentColor, setSliderPercentColor] = useState(
//     appColors.percentIncomeSliderBGGreen
//   );

//   const [stepValue, setStepValue] = useState(10);

//   const slidingComplete = (value: number) => {

//     colorStep(value);
//     let anum = props.dispatch(changepercentincome(value));

//   };

//   return (
//     <ViewContainerPCSlider>
//       <SliderWrapper>
//         <Slider
//           minimumValue={0}
//           maximumValue={100}
//           step={10}
//           style={{ width: 370, height: 40 }}
//           minimumTrackTintColor={sliderPercentColor}
//           maximumTrackTintColor="000000"
//           thumbTintColor={Platform.select({ android: appColors.fannieBlue })}
//           //redux values:
//           value={calculatorUIData.percent_income}
//           onValueChange={(value) => changePercentIncome(value)}
//           // events:
//           onSlidingStart={(value) => slidingStart(value)}
//           onSlidingComplete={(value) => slidingComplete(value)}
//         />
//       </SliderWrapper>
//     </ViewContainerPCSlider>
//   );
// };

// // the backwards tick (the grave accent character) is an ES6 Javascript template literal

// export default connect(select)(NewPercentGrossIncome);



// const slidingStart = (value: number) => {};

// const SliderWrapper = styled.View`
//   margin: 0px;
//   height: 40px;
//   justify-content: center;
// `;
// //this controls je

// const ViewContainerPCSlider = styled.View`
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

// const SliderTextInput = styled.TextInput`
//   /* border: 10px blue; */
//   padding-top: 0;
//   padding-bottom: 0;
//   padding-right: 0;

//   width: 70px;
//   height: 30px;
//   color: black;
//   display: flex;

//   height: ${Platform.select({ ios: "30px", android: "25px" })};
//   border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
// `; // change height of

// const ViewContainerPCText = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
