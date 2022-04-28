// import React from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

//   Text,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const PercentIncomeLabel = (props) => {
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   return (
//     <ViewContainerPercentLabel>

//           <Text>{calculatorUIData.percent_income} %</Text>

//     </ViewContainerPercentLabel>
//   );
// }

// export default connect(select)(PercentIncomeLabel);

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

// const ViewContainerPercentLabel = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
