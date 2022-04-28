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

const numberOfItemizedExpenseTypes: number = 7;
const halfrange = CalculatorState.grossIncomeRange / 2;
const tenthrange = CalculatorState.grossIncomeRange / 10;

// 1 for each itemized list, add the new amount
// 2 if the new amount is greater than the upper limit
//    then make it the upper limit
// 3 accumulate the adds and make the final Mex total the accumulated total, so they match
// this may be slightly over 5000 because rounding
// 4 update all items and Mex

// for text entry
// keep adding until total all itemized fields exceeds or matches text entry
// if matches exit
// if exceeds, subtract from last field until it matches
// work this out on spreadsheet in the morning.

export const updateItems = (
  cdispatch,
  dispatch,
  newMex,
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
  positivebucket
) => {
  // console.log("update items global func");
  // console.log("positivebucket at beginning is " + String(positivebucket));
  // console.log(">>>>part before", part);
  // console.log(">>>>realpart before", realpart);

  part = boundaryCheck(
    initialOexItemValue,
    initialCellpItemValue,
    initialInsItemValue,
    initialUtiItemValue,
    initialGroItemValue,
    initialTraItemValue,
    initialSubItemValue,
    part
  );

  // console.log(">>>>part after", part);
  // console.log(">>>>realpart after", realpart);

  // insurance
  if (!(initialInsItemValue + part > tenthrange)) {
    // console.log("insurance 1");
    positivebucket += initialInsItemValue + part;
    cdispatch(c_changeinsuranceslider(initialInsItemValue + part));
    cdispatch(c_changeinsurancetext(initialInsItemValue + part));
    dispatch(changeinsurance(initialInsItemValue + part));
  } else {
    // console.log("insurance 2");
    positivebucket += tenthrange;
    cdispatch(c_changeinsuranceslider(tenthrange));
    cdispatch(c_changeinsurancetext(tenthrange));
    dispatch(changeinsurance(tenthrange));
  }
  // if (positivebucket > newMex) {
  //   positivebucket = newMex
  // }
  // part = fairpart(positivebucket, newMex, part);
  // 66
  // groceries and dining
  if (!(initialGroItemValue + part > tenthrange)) {
    // console.log("gro 1");
    positivebucket += initialGroItemValue + part;
    cdispatch(c_changegroceriesanddiningslider(initialGroItemValue + part));
    cdispatch(c_changegroceriesanddiningtext(initialGroItemValue + part));
    dispatch(changegroceriesanddining(initialGroItemValue + part));
  } else {
    // console.log("gro 2");
    positivebucket += tenthrange;
    cdispatch(c_changegroceriesanddiningslider(tenthrange));
    cdispatch(c_changegroceriesanddiningtext(tenthrange));
    dispatch(changegroceriesanddining(tenthrange));
  }
  
  // utilities
  if (!(initialUtiItemValue + part > tenthrange)) {
    // console.log("util 1");
    positivebucket += initialUtiItemValue + part;
    cdispatch(c_changeutilitiesslider(initialUtiItemValue + part));
    cdispatch(c_changeutilitiestext(initialUtiItemValue + part));
    dispatch(changeutilities(initialUtiItemValue + part));
  } else {
    // console.log("util 2");
    positivebucket += tenthrange;
    cdispatch(c_changeutilitiesslider(tenthrange));
    cdispatch(c_changeutilitiestext(tenthrange));
    dispatch(changeutilities(tenthrange));
  }
  
  // transportation
  if (!(initialTraItemValue + part > tenthrange)) {
    // console.log("tra 1");
    positivebucket += initialTraItemValue + part;
    cdispatch(c_changetransportationslider(initialTraItemValue + part));
    cdispatch(c_changetransportationtext(initialTraItemValue + part));
    dispatch(changetransportation(initialTraItemValue + part));
  } else {
    // console.log("tra 2");
    positivebucket += tenthrange;
    cdispatch(c_changetransportationslider(tenthrange));
    cdispatch(c_changetransportationtext(tenthrange));
    dispatch(changetransportation(tenthrange));
  }
  
  // subscription services
  if (!(initialSubItemValue + part > tenthrange)) {
    // console.log("sub 1");
    positivebucket += initialSubItemValue + part;
    cdispatch(c_changesubscriptionservicesslider(initialSubItemValue + part));
    cdispatch(c_changesubscriptionservicestext(initialSubItemValue + part));
    dispatch(changesubscriptionservices(initialSubItemValue + part));
  } else {
    // console.log("sub 2");
    positivebucket += tenthrange;
    cdispatch(c_changesubscriptionservicesslider(tenthrange));
    cdispatch(c_changesubscriptionservicestext(tenthrange));
    dispatch(changesubscriptionservices(tenthrange));
  }

   
  // cellphone bill
  if (!(initialCellpItemValue + part > tenthrange)) {
    // console.log("cell 1");
    positivebucket += initialCellpItemValue + part;
    cdispatch(c_changecellphonebillslider(initialCellpItemValue + part));
    cdispatch(c_changecellphonebilltext(initialCellpItemValue + part));
    dispatch(changecellphonebill(initialCellpItemValue + part));
  } else {
    // console.log("cell 2");
    positivebucket += tenthrange;
    cdispatch(c_changecellphonebillslider(tenthrange));
    cdispatch(c_changecellphonebilltext(tenthrange));
    dispatch(changecellphonebill(tenthrange));
  }

   

  // other expenses
  if (!(initialOexItemValue + part > tenthrange)) {
    // console.log("oex 1");
    // console.log(">>>>initialOexItemValue ", initialOexItemValue); // NAN
    // console.log(">>>>initialMexItemValue ", initialMexTotalValue); // NAN
    // console.log(">>>>oex part", part);
    positivebucket += initialOexItemValue + part;
    // console.log(">>>>oex positivebucket", positivebucket);
    // console.log(">>>>oex  newMex", newMex);
  
    cdispatch(c_changeotherexpensesslider(initialOexItemValue + part));
    cdispatch(c_changeotherexpensestext(initialOexItemValue + part));
    dispatch(changeotherexpenses(initialOexItemValue + part));
  } else {
  
    // console.log("oex 2");
    cdispatch(c_changeotherexpensesslider(tenthrange));
    cdispatch(c_changeotherexpensestext(tenthrange));
    dispatch(changeotherexpenses(tenthrange));
  }

  // console.log("positivebucket Oex is " + String(positivebucket));

  // console.log("positivebucket at end is " + String(positivebucket));

  cdispatch(c_changemonthlyitemizedexpensesslider(positivebucket));
  cdispatch(c_changemonthlyitemizedexpensestext(positivebucket));

  dispatch(changeexpenses(positivebucket));
};

const fairpart = (positivebucket: number, newMex: number, part: number) => {
   
  if (positivebucket == newMex) { 
    return 0
}
  // console.log("fairpart");
  // console.log("newmex", newMex);
  // console.log("positivebucket", positivebucket);
  if (positivebucket < newMex) {
    let whatsleft = newMex - positivebucket;
    // console.log("whatsleft", whatsleft);
    if (whatsleft - part >= 0) {
      // continue
    } else {
      // fix the off by one errors in the total
      // console.log("whatsleft 1", whatsleft);
      // console.log(newMex);
      // console.log(positivebucket);
      if (whatsleft == 1) {
        if (positivebucket + 1 > newMex) {
          // console.log("part 1");
          part = 0;
        } else {
          // console.log("part 2");
          part = 1;
        }
      } else {
        // console.log("part 3");
        part = whatsleft;
      }
    }
  }
  return part;
};

export const boundaryCheck = (
  initialOexItemValue,
  initialCellpItemValue,
  initialInsItemValue,
  initialUtiItemValue,
  initialGroItemValue,
  initialTraItemValue,
  initialSubItemValue,
  part
) => {
  let firstpass = 0;

  do {
    firstpass += initialOexItemValue + part;
    firstpass += initialCellpItemValue + part;
    firstpass += initialInsItemValue + part;
    firstpass += initialUtiItemValue + part;
    firstpass += initialGroItemValue + part;
    firstpass += initialTraItemValue + part;
    firstpass += initialSubItemValue + part;

    // never let the total amount exceed the 5000 mark
    // keep subtracting 10 from the part added until
    // we're below the boundary limit

    if (firstpass > 5000) {
      firstpass = 0;
      part = part - 10;
    } else {
      break;
    }
  } while (true);

  return part;
};
