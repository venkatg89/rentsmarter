
import React, { useEffect, useContext, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { Platform, Text, TextInput } from "react-native";

import { connect } from "react-redux";

import CalculatorState from "../../Arc/CalculatorState";

// REDUX
import {
  changecellphonebill,
  changeexpenses,
  changegroceriesanddining,
  changeinsurance,
  changeotherexpenses,
  changesubscriptionservices,
  changetransportation,
  changeutilities,
} from "../../../../redux/actions/actions";

// CONTEXT
import {
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
  c_changeotherexpensesslider,
  c_changeotherexpensestext,
  c_changeutilitiesslider,
  c_changeutilitiestext,
  c_changecellphonebillslider,
  c_changecellphonebilltext,
  c_changeinsuranceslider,
  c_changeinsurancetext,
  c_changegroceriesanddiningtext,
  c_changegroceriesanddiningslider,
  c_changesubscriptionservicesslider,
  c_changesubscriptionservicestext,
  c_changetransportationslider,
  c_changetransportationtext,
} from "./../ExpensesActions"

import { updateItems } from "./UpdateItems";

const numberOfItemizedExpenseTypes: number = 7;
const halfrange = CalculatorState.grossIncomeRange / 2
const tenthrange = CalculatorState.grossIncomeRange / 10

 

export const positiveSliderMove = (
    cdispatch,
    dispatch,
    value,
    initialMexTotalValue,
    initialOexItemValue,
    initialCellpItemValue,
    initialInsItemValue,
    initialUtiItemValue,
    initialGroItemValue,
    initialTraItemValue,
    initialSubItemValue
  ) => {
    let positivebucket = 0;
    let difference = value - initialMexTotalValue;
    let part = Math.ceil((difference / numberOfItemizedExpenseTypes) / 1) * 1;
    let realpart = difference / numberOfItemizedExpenseTypes
   
    // console.log("slider positive part is " + String(part));
    // console.log("slider positive realpart is " + String(realpart));
    
    // console.log("initialOexItemValue in positiveSlider move", initialOexItemValue)
  
    // if the new positive value is less than the limit
    // update as usual, nothing special
    // BUT if the new positive value is greater than the limit
    // do other things
    
    if (value <= (halfrange)) {
      // console.log("updateitems 002")
      updateItems(
        cdispatch,
        dispatch,
        0,
        initialMexTotalValue,
        initialOexItemValue,
        initialCellpItemValue,
        initialInsItemValue,
        initialUtiItemValue,
        initialGroItemValue,
        initialTraItemValue,
        initialSubItemValue,
        part,
        realpart,
        positivebucket,
      );
    } else {
      // value is greater than 5000, that's no good.
      // so reset to first initial value and don't set itemized at all.
      // or possibly set to last value and do the recalcs. or 
      // set to 5000
      cdispatch(c_changemonthlyitemizedexpensesslider(initialMexTotalValue));
      cdispatch(c_changemonthlyitemizedexpensestext(initialMexTotalValue));
  
      dispatch(changeexpenses(initialMexTotalValue));
    }
  };
  