import React, { useContext, useState } from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Platform, Text } from "react-native";

import { connect, useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import {
  changecellphonebill,
  changeexpenses,
} from "../../../../../redux/actions/actions";

import {
  c_changecellphonebilltext,
  c_cellphonebillvalueiseditable,
  c_changecellphonebillslider,
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
} from "./../../ExpensesActions";
import CalculatorState from "../../../Arc/CalculatorState";
import { StateContext, DispatchContext } from "../../ExpensesDetailContext";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const CellPhoneBillTextInput = (props) => {
  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let [initialTotalValue, setInitialTotalValue] = useState(0);
  let [initialItemValue, setInitialItemValue] = useState(0);

  let {
    cellphonebilltext,
    cellphonebillslider,
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
  } = cstate;

  const dispatch = useDispatch();

  const constrainCleanedNumber = (cleanedNumber: number) => {
    if (cleanedNumber > CalculatorState.grossIncomeRange / 10) {
      return CalculatorState.grossIncomeRange / 10;
    } else {
      return cleanedNumber;
    }
  };

  // cellphonebill

  const OnChangeText = (value) => {
    // // //console.log("OnChangeText CellPhoneBill()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainCleanedNumber(cleanedNumber);
    //console.log("cleaned number is  " +  String(cleanedNumber))

    analytics().logEvent("ItemizedExp_CellPho_Text_Change", {
      id: 91000009,
      event: "text-input-changed-cellphonebill",
      description: ["used cellphone bill text input", { cleanedNumber }],
    });

    if (cleanedNumber > initialItemValue) {
      let difference = cleanedNumber - initialItemValue;
      if (Number(initialTotalValue + difference) <= CalculatorState.grossIncomeRange / 2) {
        //console.log("cleaned >");
        cdispatch(
          c_changemonthlyitemizedexpensesslider(initialTotalValue + difference)
        );
        cdispatch(
          c_changemonthlyitemizedexpensestext(initialTotalValue + difference)
        );
        dispatch(changeexpenses(initialTotalValue + difference));

        cdispatch(c_changecellphonebillslider(cleanedNumber));
        cdispatch(c_changecellphonebilltext(cleanedNumber));
        dispatch(changecellphonebill(cellphonebilltext));
      } else {
        //console.log("reset");
        cdispatch(c_changemonthlyitemizedexpensesslider(initialTotalValue));
        cdispatch(c_changemonthlyitemizedexpensestext(initialTotalValue));
        dispatch(changeexpenses(initialTotalValue));
        cdispatch(c_changecellphonebillslider(initialItemValue));
        cdispatch(c_changecellphonebilltext(initialItemValue));
        dispatch(changecellphonebill(initialItemValue));
      }
    }
    if (initialItemValue >= cleanedNumber) {
      //console.log("> cleaned");
      let difference = initialItemValue - cleanedNumber;
      if (Number(initialTotalValue - difference) >= 0) {
        cdispatch(
          c_changemonthlyitemizedexpensesslider(initialTotalValue - difference)
        );
        cdispatch(
          c_changemonthlyitemizedexpensestext(initialTotalValue - difference)
        );
        dispatch(changeexpenses(initialTotalValue - difference));
        cdispatch(c_changecellphonebillslider(cleanedNumber));
        cdispatch(c_changecellphonebilltext(cleanedNumber));
        dispatch(changecellphonebill(cellphonebilltext));
      } else {
        //console.log("zero");
        cdispatch(c_changemonthlyitemizedexpensesslider(0));
        cdispatch(c_changemonthlyitemizedexpensestext(String(0)));
        dispatch(changeexpenses(0));
        cdispatch(c_changecellphonebillslider(0));
        cdispatch(c_changecellphonebilltext(0));
        dispatch(changecellphonebill(0));
      }
    }
  };

  const OnChange = ({ nativeEvent: { eventCount, target, text } }) => {
    //console.log("OnChange() cellphonebill function");
    // //console.log(value);
    //dispatch(changecellphonebill(cellphonebillslider)); // not sure this is needed
  };

  const OnEndEditing = () => {
    // // //console.log("OnEndEditing() cellphonebill function");

   
    cdispatch(c_cellphonebillvalueiseditable(false));
    dispatch(changecellphonebill(cellphonebilltext));
    

     
  };

  const OnFocus = () => {
    // //console.log("OnFocus() gross income function");

    cdispatch(c_cellphonebillvalueiseditable(true));

    setInitialTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialItemValue(Number(cellphonebillslider));
  };

  const getCleanedValueFromSlider = () => {
    // // //console.log("get cleaned number");

    return String(cellphonebillslider);
  };

  return (
    <ViewContainerTextInput>
      <DollarText>$</DollarText>
       
      <SliderTextInput
        textAlignVertical="top" // or top
        textAlignHorizontal="right"
        placeholder="0000"
        defaultValue="0"
        keyboardType="number-pad"
        step={10}
        value={getCleanedValueFromSlider()}
        onChangeText={(value) => OnChangeText(value)}
        onEndEditing={() => OnEndEditing()}
        onChange={({ nativeEvent: { eventCount, target, text } }) =>
          OnChange({
            nativeEvent: { eventCount, target, text },
          })
        }
        onFocus={() => OnFocus()}
      />
    </ViewContainerTextInput>
  );
};

export default connect(select)(CellPhoneBillTextInput);

const SliderTextInput = styled.TextInput`
  /* border: 10px blue; */
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 2;

  text-align: right;

  width: 70px;
  height: 32px;
  color: black;
  display: flex;

  height: ${Platform.select({ ios: "30px", android: "25px" })};
 5 */
`; // change height ofmail

const ViewContainerTextInput = styled.View`
 
 padding-left: 2;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  

  width: 80px;
  height: 32px;
  color: black;
  display: flex;
   
  /* flex: 1;*/
  flex-direction: row; 
  border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
  border-width: 1px;
  border-radius: 5;

`;

const DollarText = styled.Text`
  padding-left: 0;
`
 