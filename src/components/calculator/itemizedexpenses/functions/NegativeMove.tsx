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
} from "./../ExpensesActions";

import { updateItems } from "./UpdateItems";

const numberOfItemizedExpenseTypes: number = 7;
const halfrange = CalculatorState.grossIncomeRange / 2;
const tenthrange = CalculatorState.grossIncomeRange / 10;

export const negativeSliderMove = (
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

    
  const negativeUpdates = () => {
    // console.log("negativeupdates function")
    // console.log("part ", String(part))


    let diff = initialOexItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialOexItemValue ", String(initialOexItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changeotherexpensesslider(diff));
    cdispatch(c_changeotherexpensestext(diff));
    dispatch(changeotherexpenses(diff));




     diff = initialCellpItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialCellpItemValue ", String(initialCellpItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changecellphonebillslider(diff));
    cdispatch(c_changecellphonebilltext(diff));
    dispatch(changecellphonebill(diff));



     diff = initialUtiItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialUtiItemValue ", String(initialUtiItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changeutilitiesslider(diff));
    cdispatch(c_changeutilitiestext(diff));
    dispatch(changeutilities(diff));


  
     diff = initialInsItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialInsItemValue ", String(initialInsItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changeinsuranceslider(diff));
    cdispatch(c_changeinsurancetext(diff));
    dispatch(changeinsurance(diff));

     diff = initialSubItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialSubItemValue ", String(initialSubItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changesubscriptionservicesslider(diff));
    cdispatch(c_changesubscriptionservicestext(diff));
    dispatch(changesubscriptionservices(diff));

     diff = initialGroItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialGroItemValue ", String(initialGroItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changegroceriesanddiningslider(diff));
    cdispatch(c_changegroceriesanddiningtext(diff));
    dispatch(changegroceriesanddining(diff));

     diff = initialTraItemValue - part;
    if (diff < 0) { 
      // console.log(diff, " will become 0")
      diff = 0
    }
    negativebucket += diff
    // console.log("initialTraItemValue ", String(initialTraItemValue))
    // console.log("diff", diff)
    // console.log("negativebucket ", String(negativebucket))
    cdispatch(c_changetransportationslider(diff));
    cdispatch(c_changetransportationtext(diff));
    dispatch(changetransportation(diff));

    cdispatch(c_changemonthlyitemizedexpensesslider(negativebucket));
    cdispatch(c_changemonthlyitemizedexpensestext(negativebucket));

    dispatch(changeexpenses(negativebucket));
  };

  let negativebucket = 0;
  let difference = initialMexTotalValue - value;
  let part = Math.ceil(difference / numberOfItemizedExpenseTypes / 1) * 1;

  let realpart = difference / numberOfItemizedExpenseTypes;

  // console.log("slider negative part is " + String(part));
  // console.log("slider negative realpart is " + String(realpart));

  // if things are zeroes, we zero everything out and update
  if (part < 0) part = 0;
  if (value == 0) {
    part = 0;
    initialOexItemValue = 0;
    initialCellpItemValue = 0;
    initialInsItemValue = 0;
    initialUtiItemValue = 0;
    initialGroItemValue = 0;
    initialTraItemValue = 0;
    initialSubItemValue = 0;
    negativeUpdates();
  } else {
    negativeUpdates();
  }
};
