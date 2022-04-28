// import React, { useEffect,  } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import { useDispatch } from "react-redux";

// import { changesavings, changesavingsslider  } from '../../../../redux/actions/actions';

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const SavingsTextInput = (props) => {
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const dispatch = useDispatch();
//   const OnChangeTextSavings = (value) => {

//     // console.log("OnChangeTextSavings()  function");

//     let a: string = String(value)
//     let cleanedNumber:number = Number(a.replace(/[^0-9]/g, ""));

//     if (cleanedNumber > 1000) {
//       cleanedNumber = 1000
//     }

//     dispatch(changesavings(cleanedNumber));

//   };

//   useEffect(() => {

//   });

//   const OnSelectionChange = () => {
//     // console.log("OnSelectionChange() savings function");

//     dispatch(changesavingsslider(calculatorUIData.savings));
//   };

//   return (
//     <ViewContainer>

//           <SliderTextInput

//         textAlignVertical="top" // or top
//         textAlignHorizontal="right"
//         placeholder="0000"
//         defaultValue="0"
//         keyboardType="number-pad"
//         step={10}
//         //redux values:
//         value={String(calculatorUIData.savings)}
//         onChangeText={(value) => OnChangeTextSavings(value)}
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

//           />

//         </ViewContainer>
//   );
// }

// export default connect(select)(SavingsTextInput);

// const OnContentSizeChange = () => {
//   // console.log("OnContentSizeChange() savings function");
// };

// const OnChange = (value) => {
//   // console.log("OnChange() savings function");

// };

// const OnSubmitEditing = () => {
//   // replace with individual events as needed
//   // console.log("OnSubmitEditing() savings function");

// };

// const OnEndEditing = () => {
//   // console.log("OnEndEditing() savings function");

// };

// const OnScroll = () => {
//   // console.log("OnScroll() savings function");
// };

// const OnBlur = () => {
//   // console.log("OnBlur() savings function");
// };

// const OnLayout = () => {
//   // console.log("OnLayout() savings function");
// };

// const OnPressIn = () => {
//   // console.log("OnPressIn() savings function");
// };

// const OnPressOut = () => {
//   // console.log("OnPressOut() savings function");
// };

// const OnFocus = () => {
//   // console.log("OnFocus() savings function");
// };

// const OnKeyPress = () => {
//   // console.log("OnKeyPress() savings function");
//   // this seems never to be fired
// };

// const defaultEvent = () => {
// // replace with individual events as needed
// // console.log("default savings function")
// }

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
