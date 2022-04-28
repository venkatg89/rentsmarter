// import React from "react";

// import styled from "styled-components/native";
// import Slider from "@react-native-community/slider";
// import { Platform,  } from "react-native";


// import { connect } from "react-redux";



// import {
//   changedebt,
 
// } from "../../../../redux/actions/actions";

// import appColors from "../../../../config/colors";
 

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });



// const DebtSlider = (props) => {
//   const { calculatorUIData } = props;

 
//   const changeDebt = (value) => { 
//   //  props.dispatch(changedebt(value));
    
//   }

    

//   const slidingComplete = (value: number) => {
//     props.dispatch(changedebt(value));
   
//   };

//   return (
//     <ViewContainer>
//       <SliderWrapper>
//         <Slider
//           minimumValue={0}
//           maximumValue={calculatorUIData.gross_income_range}
//           style={{ width: 370, height: 40 }}
//           step={10}
//           minimumTrackTintColor="#AADD00"
//           maximumTrackTintColor="000000"
//           thumbTintColor={Platform.select({ android: appColors.fannieBlue })}
//           //redux values:
//           value={calculatorUIData.debt_slider}
//           onValueChange={(value) => changeDebt(parseInt(value))}
//           // events:
//           onSlidingStart={(value) => slidingStart(value)}
//           onSlidingComplete={(value) => slidingComplete(value)}
//         />
//       </SliderWrapper>
//     </ViewContainer>
//   );
// };

// // the backwards tick (the grave accent character) is an ES6 Javascript template literal

// export default connect(select)(DebtSlider);



// const slidingStart = (value: number) => {};

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
