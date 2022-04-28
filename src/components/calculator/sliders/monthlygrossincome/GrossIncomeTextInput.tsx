// import React, { useEffect, useState  } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import { useDispatch } from "react-redux";
// import CalculatorState from "../../Arc/CalculatorState";

// import {
//   changegrossincome,
//   changegrossincomeslider,

// } from "../../../../redux/actions/actions";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const GrossIncomeTextInput = (props) => {

//   let [cleanedGrossIncome, setCleanedGrossIncome] = useState(0);
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const dispatch = useDispatch();
//   const OnChangeTextGrossIncome = (value) => {

//     // console.log("OnChangeTextGrossIncome() function");

//     let a: string = String(value);

//     if (a == "") {a = "0"}
//     let cleanedNumber = a.replace(/[^0-9]/g, "");

//     dispatch(changegrossincome(cleanedNumber));
//     CalculatorState.calculateOptimalRent(props);
//     //dispatch(changegrossincomeslider(cleanedNumber));
//     CalculatorState.grossincomeslider = Number(cleanedNumber);

//   };

//   useEffect(() => {

//   });

//   const OnSelectionChange = () => {
//     // console.log("OnSelectionChange() gross income function");

//     //dispatch(changegrossincomeslider(calculatorUIData.gross_income));

//   };

//   return (
//     <ViewContainer>
//       <SliderTextInput
//         textAlignVertical="top" // or top
//         textAlignHorizontal="right"
//         placeholder="0000"
//         defaultValue="0"
//         keyboardType="number-pad"
//         step={10}
//         //redux values:
//         value={String(calculatorUIData.gross_income)}
//         onChangeText={(value) => OnChangeTextGrossIncome(value)}
//         onSelectionChange={() => OnSelectionChange()}

//         // everthing else (placeholders)
//         onEndEditing={(value) => OnEndEditing(value)}
//         onPressIn={(value) => OnPressIn(value)}
//         onPressOut={(value) => OnPressOut(value)}
//         onLayout={(value) => OnLayout(value)}
//         onBlur={(value) => OnBlur(value)}
//         // native:
//         onChange={(value) => OnChange(value)}
//         onContentSizeChange={(value) => OnContentSizeChange()}
//         onFocus={(value) => OnFocus(value)}
//         onKeyPress={() => OnKeyPress()}
//         onScroll={() => OnScroll()}

//         onSubmitEditing={(value) => OnSubmitEditing(value)}

//       />
//     </ViewContainer>
//   );
// };

// export default connect(select)(GrossIncomeTextInput);

// const OnContentSizeChange = () => {
//   // console.log("OnContentSizeChange() gross income function");
// };

// const OnChange = (value) => {
//   // console.log("OnChange() gross income function");

// };

// const OnSubmitEditing = () => {
//   // replace with individual events as needed
//   // console.log("OnSubmitEditing() gross income function");

// };

// const OnEndEditing = () => {
//   // console.log("OnEndEditing() gross income function");

// };

// const OnScroll = () => {
//   // console.log("OnScroll() gross income function");
// };

// const OnBlur = () => {
//   // console.log("OnBlur() gross income function");
// };

// const OnLayout = () => {
//   // console.log("OnLayout() gross income function");
// };

// const OnPressIn = () => {
//   // console.log("OnPressIn() gross income function");
// };

// const OnPressOut = () => {
//   // console.log("OnPressOut() gross income function");
// };

// const OnFocus = () => {
//   // console.log("OnFocus() gross income function");
// };

// const OnKeyPress = () => {
//   // console.log("OnKeyPress() gross income function");
//   // this seems never to be fired
// };

// const defaultEvent = () => {
//   // console.log("default event gross income ")
//   // replace with individual events as needed
// };

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

// const ViewContainer = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
