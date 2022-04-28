import React, { useEffect, useContext, useState } from "react";

import { useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { Platform, Text, TextInput } from "react-native";

import { connect } from "react-redux";

import CalculatorState from "../../../Arc/CalculatorState";

// REDUX
import {
  changeinsurance,
  changeexpenses,
} from "../../../../../redux/actions/actions";

// CONTEXT
import {
  c_changeinsuranceslider,
  c_changeinsurancetext,
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
  
} from "./../../ExpensesActions";

import appColors from "../../../../../config/colors";

import { StateContext, DispatchContext } from "../../ExpensesDetailContext";
import { positiveSliderMove } from "../../functions/PositiveMove";

import { knobImage } from "../../functions/KnobImage";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const InsuranceSlider = (props) => {
  const { calculatorUIData } = props;

  const dispatch = useDispatch();

  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let {
    insurancetext,
    insuranceslider,
    insurance_editable,
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
     
  } = cstate;

  let [firstTimeThrough, setFirstTimeThrough] = useState(true);
  let [initialTotalValue, setInitialTotalValue] = useState(monthlyitemizedexpensesslider);
  let [initialItemValue, setInitialItemValue] = useState(insuranceslider);
  
 

  //  insurance

  const changeValue = (value) => {
    if (firstTimeThrough) {
      setFirstTimeThrough(false);
    } else {
      // cdispatch(c_changeinsuranceslider(value));

      if (value > initialItemValue) {
        positiveSliderMove(value, initialItemValue);
      }

      if (initialItemValue > value) {
        negativeSliderMove(value, initialItemValue);
      }
    }
  };

  const positiveSliderMove = (value, beginSlideValue) => {
    let diff = value - beginSlideValue;

    //console.log("pos diff", diff);
   
    //console.log("pos initialTotalValue", initialTotalValue);

    if (initialTotalValue + diff > 5000) {
    
      diff = 5000 - initialTotalValue;
      
      cdispatch(c_changeinsuranceslider(initialItemValue + diff));
  
      dispatch(changeinsurance(initialItemValue + diff))
      
      cdispatch(c_changemonthlyitemizedexpensesslider(5000));
      cdispatch(c_changemonthlyitemizedexpensestext(5000));
      dispatch(changeexpenses(5000));
    } else {
      // set the MEX
      cdispatch(
        c_changemonthlyitemizedexpensesslider(initialTotalValue + diff)
      );
      cdispatch(
        c_changemonthlyitemizedexpensestext(initialTotalValue + diff)
      );
      dispatch(changeexpenses(initialTotalValue + diff));
      
    }
   
    // now adjust the value to limits
  };

  const negativeSliderMove = (value, beginSlideValue) => {
    let diff = beginSlideValue - value;

    cdispatch(c_changeinsuranceslider(initialItemValue - diff));
      dispatch(changeinsurance(initialItemValue - diff))

    // set the MEX
    cdispatch(c_changemonthlyitemizedexpensesslider(initialTotalValue - diff));
    cdispatch(c_changemonthlyitemizedexpensestext(initialTotalValue - diff));
    dispatch(changeexpenses(initialTotalValue - diff));

    // now adjust the value to limits
  };

  const slidingStart = (value: number) => {
    setFirstTimeThrough(true);

    setInitialTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialItemValue(Number(insuranceslider));
  };

  const slidingComplete = (value: number) => {
    cdispatch(c_changeinsuranceslider(value));
   
      dispatch(changeinsurance(value))

    if (value > initialItemValue) {
      positiveSliderMove(value, initialItemValue);
    }

    if (initialItemValue > value) {
      negativeSliderMove(value, initialItemValue);
    }

    async () =>
      await analytics().logEvent("ItemizedExp_Insurance_Slider_Move", {
        id: 60000003,
        event: "slider-insurance",
        description: ["used insurance slider", { value }],
      });

    setFirstTimeThrough(true);
  };

  const getBoolEditableValue = () => {
    let editable: boolean = insurance_editable;

    return editable;
  };

  useEffect(() => {
    // init react context from redux
    cdispatch(c_changeinsurancetext(calculatorUIData.insurance));
    cdispatch(c_changeinsuranceslider(calculatorUIData.insurance));
  }, []);

  return (
    <ViewContainer>
      <SliderWrapper>
        <Slider
          disabled={getBoolEditableValue()}
          thumbImage={knobImage()}
          minimumValue={0}
          maximumValue={CalculatorState.grossIncomeRange / 10}
          style={{ width: 350, height: 40 }}
          step={10}
          minimumTrackTintColor={appColors.brandColor}  
          maximumTrackTintColor={appColors.keyboardGray}
          // thumbTintColor={Platform.select({
          //   android: appColors.keyboardGray,
          // })}
          value={insurancetext} // set by text input
          onValueChange={(value) => changeValue(value)}
          onSlidingStart={(value) => slidingStart(value)}
          onSlidingComplete={(value) => slidingComplete(value)}
        />
      </SliderWrapper>
    </ViewContainer>
  );
};

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default connect(select)(InsuranceSlider);

 

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
