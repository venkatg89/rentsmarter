import React, { useContext, useState } from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Platform } from "react-native";

import { connect, useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import {
  changesubscriptionservices,
  changeexpenses,
} from "../../../../../redux/actions/actions";

import {
  c_changesubscriptionservicestext,
  c_subscriptionservicesvalueiseditable,
  c_changesubscriptionservicesslider,
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
} from "./../../ExpensesActions";
import CalculatorState from "../../../Arc/CalculatorState";
import { StateContext, DispatchContext } from "../../ExpensesDetailContext";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const SubscriptionServicesTextInput = (props) => {
  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let [initialTotalValue, setInitialTotalValue] = useState(0);
  let [initialItemValue, setInitialItemValue] = useState(0);

  let {
    subscriptionservicestext,
    subscriptionservicesslider,
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

  // subscriptionservices

  const OnChangeText = (value) => {
    // // //console.log("OnChangeText SubscriptionServices()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainCleanedNumber(cleanedNumber);

    analytics().logEvent("ItemizedExp_Subscriptions_Text_Change", {
      id: 91000003,
      event: "text-input-changed-subscriptions",
      description: ["used subscriptions text input", { cleanedNumber }],
    });

    if (cleanedNumber > initialItemValue) {
      let difference = cleanedNumber - initialItemValue;
      if (Number(initialTotalValue + difference) <= CalculatorState.grossIncomeRange / 2) {
        cdispatch(
          c_changemonthlyitemizedexpensesslider(initialTotalValue + difference)
        );
        cdispatch(
          c_changemonthlyitemizedexpensestext(initialTotalValue + difference)
        );
        dispatch(changeexpenses(initialTotalValue + difference));

        cdispatch(c_changesubscriptionservicesslider(cleanedNumber));
        cdispatch(c_changesubscriptionservicestext(cleanedNumber));
        dispatch(changesubscriptionservices(subscriptionservicestext));
      } else {
        cdispatch(c_changemonthlyitemizedexpensesslider(initialTotalValue));
        cdispatch(c_changemonthlyitemizedexpensestext(initialTotalValue));
        dispatch(changeexpenses(initialTotalValue));
        cdispatch(c_changesubscriptionservicesslider(initialItemValue));
        cdispatch(c_changesubscriptionservicestext(initialItemValue));
        dispatch(changesubscriptionservices(initialItemValue));
      }
    }

    if (initialItemValue >= cleanedNumber) {
      let difference = initialItemValue - cleanedNumber;
      if (Number(initialTotalValue - difference) >= 0) {
        cdispatch(
          c_changemonthlyitemizedexpensesslider(initialTotalValue - difference)
        );
        cdispatch(
          c_changemonthlyitemizedexpensestext(initialTotalValue - difference)
        );
        dispatch(changeexpenses(initialTotalValue - difference));
        cdispatch(c_changesubscriptionservicesslider(cleanedNumber));
        cdispatch(c_changesubscriptionservicestext(cleanedNumber));
        dispatch(changesubscriptionservices(subscriptionservicestext));
      } else {
        //console.log();
        cdispatch(c_changemonthlyitemizedexpensesslider(0));
        cdispatch(c_changemonthlyitemizedexpensestext(String(0)));
        dispatch(changeexpenses(0));
        cdispatch(c_changesubscriptionservicesslider(0));
        cdispatch(c_changesubscriptionservicestext(0));
        dispatch(changesubscriptionservices(0));
      }
    }
  };

  const OnChange = ({ nativeEvent: { eventCount, target, text } }) => {
    //console.log("OnChange() subscriptionservices function");
    // //console.log(value);
    dispatch(changesubscriptionservices(subscriptionservicesslider)); // not sure this is needed
  };

  const OnEndEditing = () => {
    // // //console.log("OnEndEditing() subscriptionservices function");

     
    cdispatch(c_subscriptionservicesvalueiseditable(false));
    dispatch(changesubscriptionservices(subscriptionservicestext)); 
    

    
  };

  const OnFocus = () => {
    // //console.log("OnFocus() gross income function");

    cdispatch(c_subscriptionservicesvalueiseditable(true));

    setInitialTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialItemValue(Number(subscriptionservicesslider));
  };

  const getCleanedValueFromSlider = () => {
    // // //console.log("get cleaned number");

    return String(subscriptionservicesslider);
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

export default connect(select)(SubscriptionServicesTextInput);

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
`; // change height of

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
 