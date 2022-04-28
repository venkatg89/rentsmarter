// import React, { useEffect, useState } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import {
//   changedebt,
//   changedebtslider,
// } from "../../../../redux/actions/actions";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const DebtTextInput = (props) => {
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const OnChangeTextDebt = (value) => {

//     // console.log("OnChangeTextDebt() function");

//     let a: string = String(value);
//     let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

//     if (cleanedNumber > 1000) {
//       cleanedNumber = 1000
//     }

//     props.dispatch(changedebt(cleanedNumber));

//   };

//   useEffect(() => {});

//   const OnSelectionChange = () => {
//     // console.log("OnSelectionChange() debt function");

//     props.dispatch(changedebtslider(calculatorUIData.debt));
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
//         value={String(calculatorUIData.debt)}
//         onChangeText={(value) => OnChangeTextDebt(value)}
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

// export default connect(select)(DebtTextInput);

// const OnChangeText = () => {};

// const OnContentSizeChange = () => {
//   // console.log("OnContentSizeChange() debt function");
// };

// const OnChange = (value) => {
//   // console.log("OnChange() debt function");
// };

// const OnSubmitEditing = () => {
//   // replace with individual events as needed
//   // console.log("OnSubmitEditing() debt function");
// };

// const OnEndEditing = () => {
//   // console.log("OnEndEditing() debt function");
// };

// const OnScroll = () => {
//   // console.log("OnScroll() debt function");
// };

// const OnBlur = () => {
//   // console.log("OnBlur() debt function");
// };

// const OnLayout = () => {
//   // console.log("OnLayout() debt function");
// };

// const OnPressIn = () => {
//   // console.log("OnPressIn() debt function");
// };

// const OnPressOut = () => {
//   // console.log("OnPressOut() debt function");
// };

// const OnFocus = () => {
//   // console.log("OnFocus() debt function");
// };

// const OnKeyPress = () => {
//   // console.log("OnKeyPress() debt function");
//   // this seems never to be fired
// };

// const defaultEvent = () => {
//   // console.log("default debt function")
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
