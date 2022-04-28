// import React, { useEffect } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import { Platform } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import {
//   changepaydeductions,
//   changepaydeductionsslider,
// } from "../../../../redux/actions/actions";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const PayDeductionsTextInput = (props) => {
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const OnChangeTextPayDeductions = (value) => {
//     // console.log("OnChangeTextPayDeductions()  function");

//     let a: string = String(value);
//     let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

//     if (cleanedNumber > 1000) {
//       cleanedNumber = 1000;
//     }

//     props.dispatch(changepaydeductions(cleanedNumber));
//   };

//   useEffect(() => {});

//   const OnSelectionChangeDeductions = () => {
//     // console.log("OnSelectionChange() deductions function");

//     props.dispatch(changepaydeductionsslider(calculatorUIData.pay_deductions));
//   };

//   return (
//     <ViewContainerDeductions>
//       <SliderTextInputDeductions
//         textAlignVertical="top" // or top
//         textAlignHorizontal="right"
//         placeholder="0000"
//         defaultValue="0"
//         keyboardType="number-pad"
//         step={10}
//         //redux values:
//         value={String(calculatorUIData.pay_deductions)}
//         onChangeText={(value) => OnChangeTextPayDeductions(value)}
//         onSelectionChange={() => OnSelectionChangeDeductions()}
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
//     </ViewContainerDeductions>
//   );
// };

// export default connect(select)(PayDeductionsTextInput);

// const OnContentSizeChange = () => {
//   // console.log("OnContentSizeChange() deductions function");
// };

// const OnChange = (value) => {
//   // console.log("OnChange() deductions function");
// };

// const OnSubmitEditing = () => {
//   // replace with individual events as needed
//   // console.log("OnSubmitEditing() deductions function");
// };

// const OnEndEditing = () => {
//   // console.log("OnEndEditing() deductions function");
// };

// const OnScroll = () => {
//   // console.log("OnScroll() deductions function");
// };

// const OnBlur = () => {
//   // console.log("OnBlur() deductions function");
// };

// const OnLayout = () => {
//   // console.log("OnLayout() deductions function");
// };

// const OnPressIn = () => {
//   // console.log("OnPressIn() deductions function");
// };

// const OnPressOut = () => {
//   // console.log("OnPressOut() deductions function");
// };

// const OnFocus = () => {
//   // console.log("OnFocus() deductions function");
// };

// const OnKeyPress = () => {
//   // console.log("OnKeyPress() deductions function");
//   // this seems never to be fired
// };

// const defaultEvent = () => {
//   // console.log("default deductions function")
//   // replace with individual events as needed
// };

// const SliderTextInputDeductions = styled.TextInput`
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

// const ViewContainerDeductions = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
