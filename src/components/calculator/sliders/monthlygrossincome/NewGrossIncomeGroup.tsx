import React, { useEffect, useState, useCallback } from "react";

import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
// import Slider from "../../../../rangeslider/Slider";

import { Platform, Pressable } from "react-native";

import { connect, useDispatch } from "react-redux";

import appColors from "../../../../config/colors";
import CalculatorState from "../../Arc/CalculatorState";

import GrossIncomeInfoButtonView from "./GrossIncomeInfoButtonView";

import { useNavigation } from "@react-navigation/native";

import { changegrossincome } from "../../../../redux/actions/actions";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const NewGrossIncomeGroup = (props) => {
  const { calculatorUIData } = props;
  let navigation = useNavigation();
  let dispatch = useDispatch();

  let [cleanedGrossIncomeSlider, setCleanedGrossIncomeSlider] = useState(0);
  let [cleanedGrossIncomeText, setCleanedGrossIncomeText] = useState(0);
  let [valueIsEditable, setValueIsEditable] = useState(true);

  const changeSliderGrossIncome = (value: number) => {
    // removed async keyword
    //props.dispatch(changegrossincome(value));
    setCleanedGrossIncomeSlider(value);
  };

  const slidingStart = (value: number) => {
    // // console.log("sliding start");
    //props.dispatch(changegrossincome(value));
  };

  const slidingComplete = (value: number) => {
    // you can do a test here to see if value has changed since last OnValueChange,
    // if it's the same, don't do the dispatch, save a cycle. Later optimization.

    //props.dispatch(changegrossincome(value));
    setCleanedGrossIncomeSlider(value);
    dispatch(changegrossincome(cleanedGrossIncomeSlider));
  };

  const onSliderLayout = (e) => {
    // // console.log(e);
  };

  const OnChangeTextGrossIncome = (value) => {
    // // console.log("OnChangeTextGrossIncome() function");

    let a: string = String(value);

    if (a == "") {
      a = "0";
    }
    let cleanedNumber = a.replace(/[^0-9]/g, "");

    //dispatch(changegrossincome(cleanedNumber));
    //CalculatorState.calculateOptimalRent(props);
    //dispatch(changegrossincomeslider(cleanedNumber));
    //CalculatorState.grossincomeslider = Number(cleanedNumber);
    setCleanedGrossIncomeText(value);
  };

  const OnSelectionChangeGrossIncome = () => {
    // console.log("OnSelectionChange() gross income function");
    // console.log(cleanedGrossIncomeText);
    //dispatch(changegrossincomeslider(calculatorUIData.gross_income));
    //setCleanedGrossIncomeText(value);
  };

  const OnContentSizeChange = () => {
    // console.log("OnContentSizeChange() gross income function");
  };

  const OnChangeGrossIncome = (value) => {
    // console.log("OnChange() gross income function");
    // console.log(value)
    setCleanedGrossIncomeText(value);
  };

  const OnSubmitEditing = () => {
    // replace with individual events as needed
    // console.log("OnSubmitEditing() gross income function");
  };

  const OnEndEditingGrossIncome = () => {
    // console.log("OnEndEditing() gross income function");
    setCleanedGrossIncomeSlider(cleanedGrossIncomeText);
    dispatch(changegrossincome(cleanedGrossIncomeText));
    setValueIsEditable(true);
  };

  const getCleanedGrossIncomeFromSlider = () => {
    // console.log("get cleaned number")

    if (valueIsEditable) {
      return String(cleanedGrossIncomeSlider);
    }
  };

  const OnScroll = () => {
    // console.log("OnScroll() gross income function");
  };

  const OnBlur = () => {
    // console.log("OnBlur() gross income function");
  };

  const OnLayout = () => {
    // console.log("OnLayout() gross income function");
  };

  const OnPressIn = () => {
    // console.log("OnPressIn() gross income function");
  };

  const OnPressOut = () => {
    // console.log("OnPressOut() gross income function");
  };

  const OnFocus = () => {
    // console.log("OnFocus() gross income function");
    setValueIsEditable(false);
  };

  const OnKeyPress = () => {
    // console.log("OnKeyPress() gross income function");
    // this seems never to be fired
  };

  return (
    <ViewContainerGI>
      <SliderTitleRowGI>
        <SliderHeaderGI>Monthly Gross Income</SliderHeaderGI>
        <Pressable onPress={() => navigation.navigate("Pay Deductions")}>
          <GrossIncomeInfoButtonView />
        </Pressable>
        <Spacer></Spacer>
        <SliderTextInputGI
          textAlignVertical="top" // or top
          textAlignHorizontal="right"
          placeholder="0000"
          defaultValue="0"
          keyboardType="number-pad"
          step={10}
          //redux values:
          value={getCleanedNumberFromSlider()}
          onChangeText={(value) => OnChangeTextGrossIncome(value)}
          onSelectionChange={() => OnSelectionChange()}
          // everthing else (placeholders)
          onEndEditing={(value) => OnEndEditing(value)}
          onPressIn={(value) => OnPressIn(value)}
          onPressOut={(value) => OnPressOut(value)}
          onLayout={(value) => OnLayout(value)}
          onBlur={(value) => OnBlur(value)}
          // native:
          onChange={(value) => OnChange(value)}
          onContentSizeChange={(value) => OnContentSizeChange()}
          onFocus={() => OnFocus()}
          onKeyPress={() => OnKeyPress()}
          onScroll={() => OnScroll()}
        />
      </SliderTitleRowGI>

      <SliderWrapperGI>
        <Slider
          minimumValue={0}
          maximumValue={calculatorUIData.gross_income_range} // {calculatorUIData.gross_income_range}
          style={{ width: 370, height: 40 }}
          step={10}
          minimumTrackTintColor="#242423"
          maximumTrackTintColor="000000"
          thumbTintColor={Platform.select({ android: appColors.fannieBlue })}
          //redux values:
          value={Number(cleanedGrossIncomeText)}
          onValueChange={(value) => changeSliderGrossIncome(value)}
          // events:
          onSlidingStart={(value) => slidingStart(value)}
          onSlidingComplete={(value) => slidingComplete(value)}
        />
      </SliderWrapperGI>
    </ViewContainerGI>
  );
};

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default connect(select)(NewGrossIncomeGroup);

const Spacer = styled.View`
  flex: 1;
`;

const SliderWrapperGI = styled.View`
  margin: 0px;
  height: 40px;
  justify-content: center;
`;
//this controls je

const ViewContainerGI = styled.View`
  padding-left: 10px;
`;
// const LabelWrapper = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px 0px;
// `;

// const LabelText = styled.Text`
//   font-size: 20px;
// `;

const SliderHeaderGI = styled.Text`
  color: blue;
`;

const SliderTextInputGI = styled.TextInput`
  /* border: 10px blue; */
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  width: 70px;
  height: 30px;
  color: black;
  display: flex;

  height: ${Platform.select({ ios: "30px", android: "25px" })};
  border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
`; // change height of

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

const SliderTitleRowGI = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  flex: 1;
`;
