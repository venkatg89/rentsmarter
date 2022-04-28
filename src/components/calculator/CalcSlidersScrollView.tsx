// import React, { useEffect, useState, useLayoutEffect } from "react";

// import styled from "styled-components/native";

// // import Platform from 'react-native';
// import {
//   Platform,

//   Pressable,
//   Text,

// } from "react-native";

// import typography from "../../config/typography";
// import appColors from "../../config/colors";

// import {  useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

// import { useDispatch } from "react-redux";

// import GrossIncomeTextInput from "./sliders/monthlygrossincome/GrossIncomeTextInput";
// import GrossIncomeSlider from "./sliders/monthlygrossincome/GrossIncomeSlider";
// import GrossIncomeSliderRange from "./sliders/monthlygrossincome/GrossIncomeSliderRange";
// import ExpensesSlider from "./sliders/expenses/ExpensesSlider";
// import ExpensesTextInput from "./sliders/expenses/ExpensesTextInput";
// import PayDeductionsSlider from "./sliders/deductions/PayDeductionsSlider";
// import PayDeductionsTextInput from "./sliders/deductions/PayDeductionsTextInput";
// import DebtSlider from "./sliders/debt/DebtSlider";
// import DebtTextInput from "./sliders/debt/DebtTextInput";
// import SavingsSlider from "./sliders/savings/SavingsSlider";
// import SavingsTextInput from "./sliders/savings/SavingsTextInput";
// import PercentIncomeSlider from "./sliders/percentIncomeToRent/PercentIncomeSlider";
// import PercentIncomeLabel from "./sliders/percentIncomeToRent/PercentIncomeLabel";

// import SegmentsState from "./Arc/SegmentsState";
// import GrossIncomeInfoButtonView from "./sliders/monthlygrossincome/GrossIncomeInfoButtonView";
// import PercentIncomeInfoButtonView from "./sliders/percentIncomeToRent/PercentIncomeButtonView";
// import DeductionsInfoButtonView from "./sliders/deductions/DeductionsInfoButtonView";
// import DebtInfoButtonView from "./sliders/debt/DebtInfoButtonView";
// import ExpensesInfoButtonView from "./sliders/expenses/ExpensesInfoButtonView";
// import SavingsInfoButtonView from "./sliders/savings/SavingsInfoButtonView";

// import CalculatorState from "./Arc/CalculatorState";
// import NewGrossIncomeGroup from "./sliders/monthlygrossincome/NewGrossIncomeGroup";

// const select = (state, props) => ({
//   state: state,
//   calculatorUIData: state.calculatorUIData,
//   calculatorCalculationsData: state.calculatorCalculationsData,
//   arcData: state.arcData,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "INCREMENT" }),
//   };
// };

// function CalcSlidersScrollView(props) {
//   const navigation = useNavigation();

//   const dispatch = useDispatch();
//   const { state, calculatorUIData } = props;

//   useEffect(() => {
//     CalculatorState.calculateOptimalRent(props);

//     if (GrayArcWillShow()) {
//       /* just let it show */
//     } else if (SegmentedArcWillShow()) {
//       // calculate the arc segments
//       SegmentsState.calculateArc(props, dispatch);
//       SegmentsState.calculateArc2(props, dispatch);
//     } else {
//       RedArcWillShow(); /* just let it show */
//     }

//     // NOTE: IF the SegmentStates methods are run when a static arc is present
//     // the app goes into an infinite loop. That is bad.
//   });

//   useLayoutEffect(() => {
//     // console.log("useLayoutEffect ");
//   });

//   const GrayArcWillShow = () => {
//     if (
//       CalculatorState.monthlyGrossIncome == 0 &&
//       CalculatorState.monthlySavings == 0 &&
//       CalculatorState.monthlyExpenses == 0 &&
//       CalculatorState.monthlyMandatoryDeductions == 0 &&
//       CalculatorState.monthlyDebt == 0
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const SegmentedArcWillShow = () => {
//     if (CalculatorState.monthlyLeftOver >= 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const RedArcWillShow = () => {
//     // do nothing
//   };

//   const renderSwitch = (param) => {
//     switch (param) {
//       case 0:
//       case 10:
//       case 20:

//       case 30:
//         return (
//           <RowText>
//             <SmallText>Your rent should fit </SmallText>
//             <SmallBoldText>comfortably</SmallBoldText>
//             <SmallText> in your budget.</SmallText>
//           </RowText>
//         );
//       case 40:
//         return (

//              <RowText>
//              <SmallText>You will be </SmallText>
//              <SmallBoldText>rent burdened</SmallBoldText>
//              <SmallText> by the cost.</SmallText>
//            </RowText>
//         );

//       case 50:
//       case 60:
//       case 70:
//       case 80:
//       case 90:
//       case 100:
//         return (
//           <RowText>
//           <SmallText>You will be </SmallText>
//           <SmallBoldText>severely rent burdened</SmallBoldText>
//           <SmallText> by the cost.</SmallText>
//         </RowText>
//         );
//       default:
//         return <Text>No Logo</Text>;
//     }
//   };

//   let renterFeedbackText = renderSwitch(calculatorUIData.percent_income);

//   return (
//     <ViewContainer>
//       <SliderMessageView>
//         <SliderMessageText>
//           Move all sliders below to see what you can afford.
//         </SliderMessageText>
//       </SliderMessageView>

//       <SlidersScrollView>
//         {/* <SliderTitleRow>
//           <SliderHeader>Monthly Gross Income</SliderHeader>
//           <Pressable onPress={() => navigation.navigate("PayDeductions")}>
//             <GrossIncomeInfoButtonView />
//           </Pressable>
//           <Spacer></Spacer>
//           <NewGrossIncomeGroup />
//           <GrossIncomeTextInput />
//         </SliderTitleRow> */}

//         {/* <GrossIncomeSlider /> */}
//         <NewGrossIncomeGroup />
//         <GrossIncomeSliderRange />

//         <GraybarContainer>
//           <GraybarThick></GraybarThick>
//         </GraybarContainer>

//         <SliderTitleRow>
//           <SliderHeader>% of Income to Rent</SliderHeader>
//           <PercentIncomeInfoButtonView />
//           <Spacer></Spacer>
//           <PercentIncomeLabel />
//         </SliderTitleRow>
//         <PercentIncomeSlider />
//         <ComfortableRentText>
//           {renterFeedbackText}
//         </ComfortableRentText>

//         <GraybarContainer>
//           <GraybarThin></GraybarThin>
//         </GraybarContainer>

//         <SliderTitleRow>
//           <SliderHeader>Monthly Pay Deductions</SliderHeader>
//           <DeductionsInfoButtonView />
//           <Spacer></Spacer>
//           <PayDeductionsTextInput />
//         </SliderTitleRow>
//         <PayDeductionsSlider />

//         <Pressable onPress={() => navigation.navigate("PayDeductions")}>
//           <DeductionsText>Where are my deductions</DeductionsText>
//         </Pressable>

//         <SliderTitleRow>
//           <SliderHeader>Monthly Debt</SliderHeader>
//           <DebtInfoButtonView />
//           <Spacer></Spacer>
//           <DebtTextInput />
//         </SliderTitleRow>
//         <DebtSlider />

//         <SliderTitleRow>
//           <SliderHeader>Monthly Expenses</SliderHeader>
//           <ExpensesInfoButtonView />
//           <Spacer></Spacer>
//           <ExpensesTextInput />
//         </SliderTitleRow>
//         <ExpensesSlider />
//         <Pressable onPress={() => navigation.navigate("Itemized Expenses")}>
//           <ExpensesText>Itemized Expenses</ExpensesText>
//         </Pressable>

//         <SliderTitleRow>
//           <SliderHeader>Monthly Savings</SliderHeader>
//           <SavingsInfoButtonView />
//           <Spacer></Spacer>
//           <SavingsTextInput />
//         </SliderTitleRow>
//         <SavingsSlider />

//         <BottomSpacer />

//         {/* <SliderTitleRow>
//           <SliderHeader>% of Income to Rent</SliderHeader>
//           <InfoButtonView />
//           <Spacer></Spacer>
//           <SliderTextInput> </SliderTextInput>
//         </SliderTitleRow>
//         <CalcSlider />
//         <ComfortableRentText>
//           Your rent should fit comfortably in your budget
//         </ComfortableRentText>

//        */}
//       </SlidersScrollView>
//     </ViewContainer>
//   );
// }

// export default connect(select, mapDispatchToProps)(CalcSlidersScrollView);

// const BottomSpacer = styled.View`
//   height: 50px;
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

// const ComfortableRentText = styled.View`
//   padding-bottom: 20px;
//   padding-left: 20px;
// `;

// const RentText = styled.Text`

// `

// const DeductionsText = styled.Text`
//   color: blue;
//   padding-bottom: 20px;
// `;

// const ExpensesText = styled.Text`
//   color: blue;
//   padding-bottom: 20px;
// `;

// const GraybarContainer = styled.View`
//   background-color: white;
//   padding-bottom: 30px;
// `;
// const GraybarThick = styled.View`
//   background-color: lightgray;
//   height: 4px;
// `;

// const GraybarThin = styled.View`
//   background-color: lightgray;
//   height: 1px;
// `;

// const SliderMessageView = styled.View`
//   padding-horizontal: 30px;
//   background-color: white;
//   height: 30px;
//   justify-content: center;
// `;

// const SliderMessageText = styled.Text`
//   padding-top: 6px;
//   background-color: lightgray;
//   height: 30px;
// `;

// const ScrollRowView = styled.View``;

// const ViewContainer = styled.View`
//   justify-content: center;
//   flex: 1;
// `;
// const SliderHeader = styled.Text`
//   color: black;
// `;

// const SliderTitleRow = styled.View`
//   flex-direction: row;
//   padding-horizontal: 25px;
//   flex: 1;
// `;

// const Spacer = styled.Text`
//   /* border: red; */
//   flex: 1;
// `;

// const SlidersScrollView = styled.ScrollView`
//   background-color: white;
//   padding-top: 20px;
//   flex: 1;
// `;

// const ArcView = styled.View`
//   flex: 1;
//   height: 100px;
//   background-color: blue;
// `;

// const MainVerticalContainer = styled.View`
//   flex-direction: column;
//   flex: 1;
// `;

// const MediumText = styled(typography.mediumTextBold)`
// justify-content: center;
// align-self: center;
// color: ${appColors.fannieBlue};
// padding-vertical: 10px;
// `

// const SmallText = styled(typography.smallTextStyle)`

// color: ${appColors.fannieBlack};

// `

// const SmallBoldText = styled(typography.smallTextBold)`
// color: ${appColors.fannieBlack};
// `

// const RowText = styled.View`
// flex-direction: row;
// flex: 1
// `
