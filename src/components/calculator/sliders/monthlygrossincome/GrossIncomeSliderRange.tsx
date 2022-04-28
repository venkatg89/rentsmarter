// import React, { useEffect,  } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

//   Pressable,

// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

// import {
//   changegrossincomerange,
//   changegrossincome,
// } from "../../../../redux/actions/actions";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
// });

// const GrossIncomeSliderRange = (props) => {
//   const rootState = useSelector((state) => state);
//   const navigation = useNavigation();

//   const { calculatorUIData } = props;

//   const dispatch = useDispatch();

//   const changeGrossIncomeRange = (value) => {

//     // console.log(' range text before')
//     // console.log(value)

//     let a: string = String(value)
//     let cleanedNumber:number = a.replace(/[^0-9]/g, "");

//     // console.log(' range text after')
//     // console.log(cleanedNumber)

//     dispatch(changegrossincomerange(Number(cleanedNumber)));

//   }

//   const changeGrossIncome = (value) => dispatch(changegrossincome(value));

//   useEffect(() => {

//     if (calculatorUIData.gross_income > calculatorUIData.gross_income_range) {
//       changeGrossIncome(calculatorUIData.gross_income_range);
//     }
//   });

//   const incrementRange = () => {
//     changeGrossIncomeRange(calculatorUIData.gross_income_range + 5000);
//   };

//   const decrementRange = () => {
//     changeGrossIncomeRange(calculatorUIData.gross_income_range - 5000);
//   };

//   return (
//     <ViewContainer>
//       <RangeChangeRow>
//           <Spacer/>
//         <Pressable onPress={() => decrementRange()}>
//           <InfoButtonContainer>
//             <Ionicons
//               name="remove-circle"
//               size={20}
//               color="#0A649D"

//             ></Ionicons>
//           </InfoButtonContainer>
//         </Pressable>
//         <SliderTextInput
//           textAlignVertical="top" // or top
//           textAlignHorizontal="right"
//           placeholder="0000"
//           defaultValue="5000"
//           keyboardType="number-pad"
//           step={() => defaultEvent()}

//           //redux values:
//           value={String(calculatorUIData.gross_income_range)}
//           onChangeText={(value) => changeGrossIncomeRange(value)}

//           onEndEditing={() => defaultEvent()}
//           onPressIn={() => defaultEvent()}
//           onPressOut={() => defaultEvent()}
//           onLayout={() => defaultEvent()}

//           // native:
//           onChange ={() => defaultEvent()}
//           onContentSizeChange={() => defaultEvent()}
//           onFocus={() => defaultEvent()}
//           onKeyPress={() => defaultEvent()}
//           onScroll={() => defaultEvent()}
//           onSelectionChange={() => defaultEvent()}
//           onSubmitEditing={() => defaultEvent()}

//         />

//         <Pressable onPress={() => incrementRange()}>
//           <InfoButtonContainer>
//             <Ionicons
//               name="add-circle"
//               size={20}
//               color="#0A649D"

//             ></Ionicons>
//           </InfoButtonContainer>
//         </Pressable>
//       </RangeChangeRow>
//     </ViewContainer>
//   );
// };

// export default connect(select)(GrossIncomeSliderRange);

// const defaultEvent = () => {
//     // replace with individual events as needed
//     }

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

// const RangeChangeRow = styled.View`
//   flex-direction: row;
//   padding-bottom: 10px;
//   padding-right: 30px;
// `;
// const InfoButtonContainer = styled.View`
//   padding-left: 10px;
//   padding-right: 10px;
// `;

// const InfoButton = styled.Image`
//   width: 20px;
//   height: 20px;
// `;

// const Spacer = styled.View`
// flex: 1;
// `
