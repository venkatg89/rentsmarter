// import React, {  useState } from "react";

// import styled from "styled-components/native";

// import {
//   Platform,
//   useWindowDimensions,
//   View,
// } from "react-native";


// import DataItemCircle from "./DataItemCircle";
// import appColors from "./../../../config/colors";
// import typography from "../../../config/typography";

// import ArcInfoButtonView from "./ArcInfoButtonView";
// import {

//   drawArc,

// } from "../../../tools/segmented-round/helpers";

// import { Svg, Path } from "react-native-svg";

// import { connect } from "react-redux";

// import { useCallback } from "react";


// import CalculatorState from "./CalculatorState";

// const select = (state, props) => ({
//   calculatorUIData: state.calculatorUIData,
//   calculatorCalculationsData: state.calculatorCalculationsData,
//   arcData: state.arcData,
// });

// //

// // let seg1 = false;
// // let seg2 = false;

// // let seg3 = false;
// // let seg4 = false;

// // let seg5 = false;
// // let seg6 = false;

// function ArcComponentView(props) {








//   const { calculatorUIData, calculatorCalculationsData, arcData } = props;

//   // width/height of entire screen
//   const windowWidth = useWindowDimensions().width;
//   const windowHeight = useWindowDimensions().height;
//   const windowHeightFactor = Platform.OS === "ios" ? 0.3 : 0.28;
//   const modwindowHeight = useWindowDimensions().height * windowHeightFactor;
//   const svgWindowHeightFactor = Platform.OS === "ios" ? 70 : 0;

//   const radiusDial = 0.7;

//   // width/height of the Container View
//   const [size, setSize] = useState({ width: 411, height: 190 });

//   const onLayout = useCallback((event) => {
//     const { width, height } = event.nativeEvent.layout;
//      setSize({ width, height });
//   }, []);

  

//   // width/height of the Svg View
//   const [svgsize, setSvgsize] = useState({ width: 411, height: 190 });

//   const onSVGLayout = useCallback((event) => {
//     const { width, height } = event.nativeEvent.layout;
//      setSvgsize({ width, height }); // these may NOT be the problem
//   }, []);

//   const everythingIsZero = () => {

//     if (calculatorUIData.gross_income == 0 &&
//        calculatorUIData.savings == 0 &&
//        calculatorUIData.expenses == 0 &&
//        calculatorUIData.pay_deductions == 0 &&
//        calculatorUIData.debt == 0 )
//   {
//     return true;
//   } else {
//     return false;
//   }
//   };

//   const DisplaySegments = () => {
   

//     if ( everythingIsZero()) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.grayNeutral}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : svgsize.height * 0.92,
//               0,
//               180
//             )}
//           />
//         </View>
//       );
//     } else if (CalculatorState.monthlyLeftOver >= 0) {
//       return (
//         <View>
//           <SegMM1></SegMM1>
//           <SegMM2></SegMM2>
//           <SegMM3></SegMM3>
//           <SegMM4></SegMM4>
//           <SegMM5></SegMM5>
//           <SegMM6></SegMM6>
//         </View>
//       );
//     } else {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.spentTooMuchMaroonRed}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : svgsize.height * 0.92,
//               0,
//               180
//             )}
//           />
//         </View>
//       );
//     }
//   };

//   const SegMM1 = () => {
//     if (arcData.arc_segment_1_end != arcData.arc_segment_1_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.rentAmountGreen}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : svgsize.height * 0.92,
//               arcData.arc_segment_1_begin,
//               arcData.arc_segment_1_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   const SegMM2 = () => {
//     if (arcData.arc_segment_2_end != arcData.arc_segment_2_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.expensesAqua}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : size.height * 0.92,
//               arcData.arc_segment_2_begin,
//               arcData.arc_segment_2_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   const SegMM3 = () => {
//     if (arcData.arc_segment_3_end != arcData.arc_segment_3_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.deductionsAqua}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : size.height * 0.92,
//               arcData.arc_segment_3_begin,
//               arcData.arc_segment_3_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   const SegMM4 = () => {
//     if (arcData.arc_segment_4_end != arcData.arc_segment_4_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.debtBlue}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : size.height * 0.92,
//               arcData.arc_segment_4_begin,
//               arcData.arc_segment_4_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   const SegMM5 = () => {
//     if (arcData.arc_segment_5_end != arcData.arc_segment_5_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.savingsGold}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : size.height * 0.92,
//               arcData.arc_segment_5_begin,
//               arcData.arc_segment_5_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   const SegMM6 = () => {
//     if (arcData.arc_segment_6_end != arcData.arc_segment_6_begin) {
//       return (
//         <View>
//           <Path
//             fill="none"
//             stroke={appColors.remainingAmountBlue}
//             strokeWidth={15}
//             strokeLinecap="square"
//             d={drawArc(
//               windowWidth * 0.5,
//               svgsize.height,
//               Platform.OS === "ios"
//                 ? svgsize.height * 0.93
//                 : size.height * 0.92,
//               arcData.arc_segment_6_begin,
//               arcData.arc_segment_6_end
//             )}
//           />
//         </View>
//       );
//     } else return null;
//   };

//   return (
//     <Container>
//       <ArcIconColumn>
//         <ArcIconContainerRow>
//           <Spacer></Spacer>

//           <ArcInfoButtonView />
//         </ArcIconContainerRow>
//         <Spacer></Spacer>
//       </ArcIconColumn>

//       <ArcTextContainerRow>
//         <Spacer></Spacer>

//         <ArcTextColumn>
//           <ArcTextRow>
//             <Spacer></Spacer>
//             <ArcTitle>Your monthly income </ArcTitle>
//             <Spacer></Spacer>
//           </ArcTextRow>

//           <ArcTextRow>
//             <Spacer></Spacer>
//             <ArcTitle> ${calculatorUIData.gross_income} /month</ArcTitle>
//             <Spacer></Spacer>
//           </ArcTextRow>

//           <ArcDetailsDataRow>
//             <ArcDetailsColumn1>
//               <ArcDataItemRow>
//                 <DataItemCircle color={appColors.rentAmountGreen} />
//                 <ArcDataItem>Rent Amount</ArcDataItem>
//               </ArcDataItemRow>
//               <ArcDataItemRow>
//                 <DataItemCircle color={appColors.deductionsAqua} />
//                 <ArcDataItem>Deductions</ArcDataItem>
//               </ArcDataItemRow>
//               <ArcDataItemRow>
//                 <DataItemCircle color={appColors.debtBlue} />
//                 <ArcDataItem>Debt</ArcDataItem>
//               </ArcDataItemRow>
//             </ArcDetailsColumn1>

//             <Spacer1></Spacer1>

//             <ArcDetailsColumn2>
//               <ArcDataItemRow>
//                 {/* <ArcDataItemIcon>$ {CalculatorState.monthlyRent} </ArcDataItemIcon> */}
//                 <ArcDataItemIcon>
//                   {/* $ {calculatorCalculationsData.rentAmount}{" "} */}
//                   $ {CalculatorState.monthlyRent}{" "} 
//                 </ArcDataItemIcon>
//                 <ArcDataItem>/month</ArcDataItem>
//               </ArcDataItemRow>
//               <ArcDataItemRow>
//                 <DataItemCircle color={appColors.expensesAqua} />
//                 <ArcDataItem>Expenses</ArcDataItem>
//               </ArcDataItemRow>
//               <ArcDataItemRow>
//                 <DataItemCircle color={appColors.savingsGold} />
//                 <ArcDataItem>Savings</ArcDataItem>
//               </ArcDataItemRow>
//             </ArcDetailsColumn2>
//           </ArcDetailsDataRow>
//         </ArcTextColumn>

//         <Spacer></Spacer>
//       </ArcTextContainerRow>

  

//       {/* <Container>
//         <Text>seg 1 begin {arcData.arc_segment_1_begin}</Text>
//         <Text>seg 1 end {arcData.arc_segment_1_end}</Text>
//         <Text>seg 2 begin {arcData.arc_segment_2_begin}</Text>
//         <Text>seg 2 end {arcData.arc_segment_2_end}</Text>
//       </Container> */}
// {/* 
//        <Container>
//          <Text>Monthly Leftover</Text>
//         <Text>{CalculatorState.monthlyLeftOver}</Text>
//       </Container> */}

   
//       <Svg
//         width={windowWidth}
//         height={modwindowHeight - svgWindowHeightFactor}
//         onLayout={onSVGLayout}
//       >
//         <DisplaySegments></DisplaySegments>
//       </Svg>

      

       
//     </Container>
//   );
// }

// export default connect(select)(ArcComponentView);

// /* arc data items */

// const PathContainer = styled.View`
//   height: 300px;
//   width: 300px;
// `;

// const ArcDetailsDataRow = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   padding-top: 40px;
//   flex: 1;
// `;

// const Spacer1 = styled.View`
//   width: 20px;
// `;

// const ArcTextContainerRow = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   position: absolute;
//   z-index: 1000;
//   padding-top: 40px;
//   flex: 1;
// `;

// const ArcDetailsColumn1 = styled.View`
//   flex-direction: column;
// `;

// const ArcDetailsColumn2 = styled.View`
//   flex-direction: column;
// `;

// const ArcDataItemRow = styled.View`
//   flex-direction: row;
//   flex: 1;
// `;
// const ArcDataItemIcon = styled.Text``;
// const ArcDataItem = styled.Text``;

// /* Text Layer */
// const ArcTitle = typography.mediumTextItalic;

// const IconName = styled.Text`
//   color: blue;
//   padding-top: 20px;
// `;

// const ArcTextRow = styled.View`
//   flex-direction: row;
//   justify-content: center;
// `;

// const ArcIconContainerRow = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   position: absolute;
//   z-index: 2000;
//   padding-right: 15px;
// `;

// const ArcTextColumn = styled.View`
//   flex: 1;
//   flex-direction: column;
// `;

// const ArcIconColumn = styled.View`
//   flex: 1;
//   flex-direction: column;
// `;

// /*Arc Layer*/

// const SVGView = styled.View``;

// const Spacer = styled.View`
//   flex: 1;
// `;

// const RowText = styled.Text`
//   flex: 1;
// `;

// const Container = styled.View`
//   justify-content: center;
//   background-color: white;
// `;

// const ArcRow = styled.View`
//   flex-direction: row;
// `;
