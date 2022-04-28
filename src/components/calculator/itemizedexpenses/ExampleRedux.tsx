// import React, { useState } from "react";

// // styled-components
// import styled from "styled-components/native";

// // react-navigation

// import { createStackNavigator } from "@react-navigation/stack";

// // application
// import CalcSlidersScrollView from "../CalcSlidersScrollView";
// import NavTitleCalculator from "../NavTitleCalculator";

// // react-native
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Dimensions,
//   TouchableOpacity,
//   Linking,
//   Button,
//   NativeModules,
// } from "react-native";

// import typography from "../../../config/typography";

// import { connect } from "react-redux";

// import { bindActionCreators } from "redux";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { addnote } from "../../../redux/actions/actions";
// import { deletenote } from "../../../redux/actions/actions";
// import { changecount } from "../../../redux/actions/actions";
// import { clockRunning } from "react-native-reanimated";

// import MyListComponent from "../../general/MyListComponent";

// const select = (state, props) => ({
//   countData: state.countData,
//   notesData: state.notesData,
// });

// // function mapStateToProps(state, props) {

// //   return { countData: state.countData, notesData: state.notesData };
// // }

// function ExamplesRedux(props) {
//   const rootState = useSelector((state) => state); // everything
//   //  const xcountData = useSelector( state => state.countData);
//   //  const xnotesData = useSelector ( state => state.notesData);

//   const {countData, notesData} = props; // I think this is the other way to do it

//   const dispatch = useDispatch();
//   const addNote = (note) => dispatch(addnote(note));
//   const deleteNote = (id) => dispatch(deletenote(id));
//   const changeCount = (count) => dispatch(changecount(count));

//   const [locCount, setlocCount] = useState(0);

//   // useEffect(() => {
//   //   //console.log('locCount b is ' + locCount);
//   //   console.log("after ");
//   //   console.log(rootState);
//   // }, [locCount]);

//   const decrementCount = () => {
//     setlocCount(locCount - 1);
//     changeCount(locCount);
//     console.log(rootState);
//   };

//   const incrementCount = (props) => {
//     addNote("our second note");
//     // deleteNote(2);
//     // console.log("before ");
//     // console.log(rootState);
//     // console.log("locCount a is " + locCount);

//     // console.log("countdata is ");
//     // console.log(props.countData);
//     // console.log("notesdata is ");
//     // console.log(props.notesData);
//     setlocCount(locCount + 1);
//     changeCount(locCount);
//   };

//   return (
//     <Container>
//       <Column>
//         <Spacer />
//         <GetStartedButton
//           onPress={() => {
//             incrementCount(props);
//           }}
//         ></GetStartedButton>
//         <GetStartedButton
//           onPress={() => {
//             decrementCount();
//           }}
//         ></GetStartedButton>
//         <Spacer />
//         <ScrView>
//           <Text>Nothing here yet</Text>
//           {/* <Text>The count is {countData.count}</Text>

//           {notesData.map((noteRecord, index) => {
//             return (
//               <View>
//                 <Text>index is {index}</Text>
//                 <Text>
//                   id: {noteRecord.id} note: {noteRecord.note}
//                 </Text>
//               </View>
//             );
//           })} */}
//         </ScrView>

//         {/* <MyListComponent notesData={props.notesData} />  */}

//         <Container>
//           <Column>
//             <Text>account</Text>
//           </Column>
//         </Container>
//       </Column>
//     </Container>
//   );
// }

// export default connect(select)(ExamplesRedux);

// const LargeTextStyle = typography.largeTextStyle;
// const MediumTextStyle = typography.mediumTextStyle;
// const SmallTextStyle = typography.smallTextStyle;

// const Container = styled.View`
//   flex: 1;
//   background-color: gray;
// `;

// const Spacer = styled.View`
//   flex: 1;
// `;

// const Column = styled.View`
//   flex: 1;
//   flex-direction: column;
// `;

// const GetStartedButton = styled.TouchableOpacity`
//   background-color: #0a649d;
//   align-items: center;
//   padding-horizontal: 20px;
//   border-radius: 10px;
//   padding: 10px;
//   shadow-color: #000;
//   shadow-offset: 5px 5px;
//   shadow-opacity: 0.5;
//   shadow-radius: 5px;
//   justify-content: center;
// `;

// const ScrView = styled.ScrollView`
//   height: 200px;
// `;
