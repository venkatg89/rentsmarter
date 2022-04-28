// import React, { useEffect,   } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const ExpensesTextInput = (props) => {
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const OnChangeTextExpenses = (value) => {
//     // console.log("OnChangeTextExpenses() function");
//     let a: string = String(value);
//     let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

//     if (cleanedNumber > 1000) {
//       cleanedNumber = 1000
//     }

//    // props.dispatch(changeexpenses(cleanedNumber));

//   };

//   const OnSelectionChange = () => {
//     // console.log("OnSelectionChange() expenses function");

//    // props.dispatch(changeexpensesslider(calculatorUIData.expenses));
//   };

//   useEffect(() => {});

//   return (
//     <ViewContainerTextInput>
//       <SliderTextInput
//         textAlignVertical="top" // or top
//         textAlignHorizontal="right"
//         placeholder="0000"
//         defaultValue="0"
//         keyboardType="number-pad"
//         step={10}
//         //redux values:
//         value={String(calculatorUIData.expenses)}
//         onChangeText={(value) => OnChangeTextExpenses(value)}
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
//     </ViewContainerTextInput>
//   );
// };

// export default connect(select)(ExpensesTextInput);

// const OnContentSizeChange = () => {
//   // console.log("OnContentSizeChange() expenses function");
// };

// const OnChange = (value) => {
//   // console.log("OnChange() expenses function");
// };

// const OnSubmitEditing = () => {
//   // replace with individual events as needed
//   // console.log("OnSubmitEditing() expenses function");
// };

// const OnEndEditing = () => {
//   // console.log("OnEndEditing() expenses function");
// };

// const OnScroll = () => {
//   // console.log("OnScroll() expenses function");
// };

// const OnBlur = () => {
//   // console.log("OnBlur() expenses function");
// };

// const OnLayout = () => {
//   // console.log("OnLayout() expenses function");
// };

// const OnPressIn = () => {
//   // console.log("OnPressIn() expenses function");
// };

// const OnPressOut = () => {
//   // console.log("OnPressOut() expenses function");
// };

// const OnFocus = () => {
//   // console.log("OnFocus() expenses function");
// };

// const OnKeyPress = () => {
//   // console.log("OnKeyPress() expenses function");
//   // this seems never to be fired
// };
// const defaultEvent = () => {
//   // console.log("default event expenses ")
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

// const ViewContainerTextInput = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
