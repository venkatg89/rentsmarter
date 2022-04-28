import React, { useEffect, useContext, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { Platform, Text, TextInput } from "react-native";

import { connect } from "react-redux";

import CalculatorState from "../../../Arc/CalculatorState";

import { positiveSliderMove } from "../../functions/PositiveMove";
import { negativeSliderMove } from "../../functions/NegativeMove";

import { knobImage } from "../../functions/KnobImage";

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
} from "../../../../../redux/actions/actions";

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
 
} from "./../../ExpensesActions";

import appColors from "../../../../../config/colors";

import { StateContext, DispatchContext } from "../../ExpensesDetailContext";

const numberOfItemizedExpenseTypes: number = 7;
const halfrange = CalculatorState.grossIncomeRange / 2;
const tenthrange = CalculatorState.grossIncomeRange / 10;

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const MonthlyItemizedExpensesSlider = (props) => {
  const { calculatorUIData } = props;

  const dispatch = useDispatch();

  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let {
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
    monthlyitemizedexpenses_editable,
    otherexpensesslider,
    otherexpensestext,
    utilitiestext,
    utilitiesslider,
    groceriesanddiningtext,
    groceriesanddiningslider,
    insurancetext,
    insuranceslider,
    cellphonebilltext,
    cellphonebillslider,
    transportationtext,
    transportationslider,
    subscriptionservicestext,
    subscriptionservicesslider,
    
  } = cstate;

  const constrainCleanedNumber = (cleanedNumber: number) => {
    if (cleanedNumber > 10000) {
      return 10000;
    } else {
      return cleanedNumber;
    }
  };

  let [initialMexTotalValue, setInitialMexTotalValue] = useState(0);

  let [initialOexItemValue, setInitialOexItemValue] = useState(0);
  let [initialCellpItemValue, setInitialCellpItemValue] = useState(0);
  let [initialInsItemValue, setInitialInsItemValue] = useState(0);
  let [initialGroItemValue, setInitialGroItemValue] = useState(0);
  let [initialSubItemValue, setInitialSubItemValue] = useState(0);
  let [initialUtiItemValue, setInitialUtiItemValue] = useState(0);
  let [initialTraItemValue, setInitialTraItemValue] = useState(0);

  let [firstTimeThrough, setFirstTimeThrough] = useState(true);
  let [initialTotalValue, setInitialTotalValue] = useState(0);
  let [initialItemValue, setInitialItemValue] = useState(0);
 

  //  monthlyitemizedexpenses

  // const changeValue = (value) => {
  //   if (firstTimeThrough) {
  //     setFirstTimeThrough(false);
  //   } else {
  //     //   // cdispatch(c_changeotherexpensesslider(value));

  //     if (value > initialItemValue) {
  //       posSliderMove(value, initialItemValue);
  //     }

  //     if (initialItemValue > value) {
  //       negSliderMove(value, initialItemValue);
  //     }
  //   }
  // };

  const posSliderMove = (value, beginSlideValue) => {
    let diff = value - beginSlideValue;
    let sliderSetting = 0;

    if (initialTotalValue + diff > 5000) {
      sliderSetting = 5000;
      diff = 5000 - initialTotalValue;
      // console.log("diff", diff);
      // console.log("initialTotalValue", initialTotalValue);
    } else {
      sliderSetting = initialTotalValue + diff;
    }

    cdispatch(c_changemonthlyitemizedexpensesslider(sliderSetting));
    cdispatch(c_changemonthlyitemizedexpensesslider(sliderSetting));

    dispatch(changeexpenses(sliderSetting));

     
    positiveSliderMove(
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
    );

    // now adjust the value to limits
  };

  const negSliderMove = (value, beginSlideValue) => {
    let diff = beginSlideValue - value;

    // set the MEX
    cdispatch(c_changemonthlyitemizedexpensesslider(initialTotalValue - diff));
    dispatch(changeexpenses(initialTotalValue - diff));

    negativeSliderMove(
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
    );

    // now adjust the value to limits
  };

  const changeValue = (value) => {
    // console.log("change value");

    // cdispatch(c_changemonthlyitemizedexpensesslider(value));
    // cdispatch(c_changemonthlyitemizedexpensestext(value));

    // dispatch(changeexpenses(value));

    // if we're positive
    if (value > initialMexTotalValue) {
      positiveSliderMove(
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
      );
    }

    if (initialMexTotalValue > value) {
      negativeSliderMove(
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
      );
    }

  };

  const slidingComplete = (value: number) => {
    // cdispatch(c_changemonthlyitemizedexpensesslider(value));
    // cdispatch(c_changemonthlyitemizedexpensestext(value));
    // dispatch(changeexpenses(value));

    async () =>
      await analytics().logEvent("ItemizedExp_MonthExp_Slider_Move", {
        id: 60000009,
        event: "slider-monthlyitemizedexpenses",
        description: ["used monthlyitemizedexpenses slider", { value }],
      });
  };

  const slidingStart = (value: number) => {
    setFirstTimeThrough(true);

    //initialize from redux
    setInitialTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialItemValue(Number(monthlyitemizedexpensesslider));

    // we've just started the slide, save the first value
    setInitialMexTotalValue(Number(monthlyitemizedexpensestext));
    setInitialOexItemValue(Number(otherexpensesslider));
    setInitialCellpItemValue(Number(cellphonebillslider));
    setInitialInsItemValue(Number(insuranceslider));
    setInitialGroItemValue(Number(groceriesanddiningslider));
    setInitialSubItemValue(Number(subscriptionservicesslider));
    setInitialUtiItemValue(Number(utilitiesslider));
    setInitialTraItemValue(Number(transportationslider));
  };

  const getBoolEditableValue = () => {
    // // // console.log("get cleaned number");

    let editable: boolean = monthlyitemizedexpenses_editable;
    //// console.log("getBoolEditableValue monthlyitemizedexpenses: " + String(editable))
    return editable;
  };

  useEffect(() => {
    // init react context from redux
    cdispatch(c_changemonthlyitemizedexpensesslider(calculatorUIData.expenses));
    cdispatch(c_changemonthlyitemizedexpensestext(calculatorUIData.expenses));
    
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log("usefocus on slider");
  //     cdispatch(
  //       c_changemonthlyitemizedexpensesslider(
  //         String(monthlyitemizedexpensestext)
  //       )
  //     );
  //   }, [monthlyitemizedexpensestext, monthlyitemizedexpensesslider])
  // );

  return (
    <ViewContainer>
      <SliderWrapper>
        <Slider
          disabled={getBoolEditableValue()}
          thumbImage={knobImage()}
          minimumValue={0}
          maximumValue={CalculatorState.grossIncomeRange / 2}
          style={{ width: 350, height: 40 }}
          step={10}
          minimumTrackTintColor={appColors.brandColor}  
          maximumTrackTintColor={appColors.keyboardGray}
          // thumbTintColor={Platform.select({
          //   android: appColors.keyboardGray,
          // })}
          value={monthlyitemizedexpensestext} // set by text input
          onValueChange={(value) => changeValue(value)}
          onSlidingStart={(value) => slidingStart(value)}
          onSlidingComplete={(value) => slidingComplete(value)}
        />
      </SliderWrapper>
    </ViewContainer>
  );
};

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default connect(select)(MonthlyItemizedExpensesSlider);

const slidingStart = (value: number) => {};

const SliderWrapper = styled.View`
  margin: 0px;
  height: 40px;
  justify-content: center;
`;
//this controls je

const ViewContainer = styled.View`
  padding-left: 10px;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderHeader = styled.Text`
  color: blue;
`;
