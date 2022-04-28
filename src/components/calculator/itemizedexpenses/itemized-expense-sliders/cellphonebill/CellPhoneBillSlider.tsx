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
  changecellphonebill,
  changeexpenses,
} from "../../../../../redux/actions/actions";

// CONTEXT
import {
  c_changecellphonebillslider,
  c_changecellphonebilltext,
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
  
} from "./../../ExpensesActions";

import appColors from "../../../../../config/colors";

import { StateContext, DispatchContext } from "../../ExpensesDetailContext";

import Icon from "react-native-vector-icons";
 
import { knobImage } from "../../functions/KnobImage";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});

const CellPhoneBillSlider = (props) => {
  const { calculatorUIData } = props;

  const dispatch = useDispatch();

  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let {
    cellphonebilltext,
    cellphonebillslider,
    cellphonebill_editable,
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
    
  } = cstate;

  let [firstTimeThrough, setFirstTimeThrough] = useState(true);
  let [initialTotalValue, setInitialTotalValue] = useState(
    monthlyitemizedexpensesslider
  );
  let [initialItemValue, setInitialItemValue] = useState(cellphonebillslider);

  //  cell phone bill

  const changeValue = (value) => {
    // console.log("change, value", value);
    // console.log("change initialItemValue", initialItemValue);
    // console.log("change initialTotalValue", initialTotalValue);

    if (firstTimeThrough) {
      setFirstTimeThrough(false);
    } else {
      // cdispatch(c_changecellphonebillslider(value));

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

    // console.log("pos diff", diff);
   
    // console.log("pos initialTotalValue", initialTotalValue);

    if (initialTotalValue + diff > 5000) {
    
      diff = 5000 - initialTotalValue;
      
      cdispatch(c_changecellphonebillslider(initialItemValue + diff));
      dispatch(changecellphonebill(initialItemValue + diff))
      
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
  };

  const negativeSliderMove = (value, beginSlideValue) => {
    let diff = beginSlideValue - value;

    // console.log("neg diff", diff);
    // console.log("neg beginSlideValue", beginSlideValue);
    // console.log("neg initialTotalValue", initialTotalValue);

    cdispatch(c_changecellphonebillslider(initialItemValue - diff));
    dispatch(changecellphonebill(initialItemValue - diff))

    // set the MEX
    cdispatch(c_changemonthlyitemizedexpensesslider(initialTotalValue - diff));
    cdispatch(c_changemonthlyitemizedexpensestext(initialTotalValue - diff));
    dispatch(changeexpenses(initialTotalValue - diff));

    // now adjust the value to limits

    // what if initialTotalValue < 0? is that possible?
    // I don't think it is...
  };

  const slidingStart = (value: number) => {
    setFirstTimeThrough(true);

    // console.log("start, value", value);
    // console.log("start initialItemValue", initialItemValue);
    // console.log("start initialTotalValue", initialTotalValue);

    setInitialTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialItemValue(Number(cellphonebillslider));
  };

  const slidingComplete = (value: number) => {
    cdispatch(c_changecellphonebillslider(value));
    dispatch(changecellphonebill(value))

    // console.log("complete, value", value);
    // console.log("complete initialItemValue", initialItemValue);
    // console.log("complete initialTotalValue", initialTotalValue);

    if (value > initialItemValue) {
      positiveSliderMove(value, initialItemValue);
    }

    if (initialItemValue > value) {
      negativeSliderMove(value, initialItemValue);
    }

    async () =>
      await analytics().logEvent("ItemizedExp_CellPho_Slider_Move", {
        id: 60000001,
        event: "slider-cellphonebill",
        description: ["used cellphone bill slider", { value }],
      });

    setFirstTimeThrough(true);
  };

  const getBoolEditableValue = () => {
    let editable: boolean = cellphonebill_editable;

    return editable;
  };

  useEffect(() => {
    // init react context from redux
    cdispatch(c_changecellphonebilltext(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));

     

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
          value={cellphonebilltext} // set by text input
          onValueChange={(value) => changeValue(value)}
          onSlidingStart={(value) => slidingStart(value)}
          onSlidingComplete={(value) => slidingComplete(value)}
        />
      </SliderWrapper>
    </ViewContainer>
  );
};

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default connect(select)(CellPhoneBillSlider);

// const CellPhoneBillSlider = (props) => {
//   const { calculatorUIData } = props;

//   const dispatch = useDispatch();

//   const { cstate } = useContext(StateContext);
//   const { cdispatch } = useContext(DispatchContext);

//   let {
//     cellphonebilltext,
//     cellphonebillslider,
//     cellphonebill_editable,
//     monthlyitemizedexpensestext,
//   } = cstate;

//   let [slidingInProgress, setSlidingInProgress] = useState(false);
//   let [initialTotalValue, setInitialTotalValue] = useState(0);
//   let [initialItemValue, setInitialItemValue] = useState(0);

//   //  cellphonebill

//   const changeValue = (value) => {
//     if (!slidingInProgress) {
//       setInitialTotalValue(Number(monthlyitemizedexpensestext));
//       setInitialItemValue(Number(cellphonebillslider));
//     }

//     setSlidingInProgress(true);

//     cdispatch(c_changecellphonebillslider(value));
//     dispatch(changecellphonebill(value));

//     //// console.log("initial total value " + String(initialTotalValue));
//     //// console.log("initial item value " + String(initialItemValue));
//     //// console.log("value " + String(value));

//     if (value > initialItemValue) {
//       let difference = value - initialItemValue;
//       //// console.log("growing diff" + String(difference));
//       if (Number(initialTotalValue + difference) <= CalculatorState.grossIncomeRange / 2) {
//         cdispatch(
//           c_changemonthlyitemizedexpensesslider(initialTotalValue + difference)
//         );
//         cdispatch(
//           c_changemonthlyitemizedexpensestext(initialTotalValue + difference)
//         );
//         dispatch(changeexpenses(initialTotalValue + difference));
//       } else {
//         cdispatch(
//           c_changemonthlyitemizedexpensesslider(initialTotalValue)
//         );
//         cdispatch(
//           c_changemonthlyitemizedexpensestext(initialTotalValue)
//         );
//         dispatch(changeexpenses(initialTotalValue));
//         cdispatch(c_changecellphonebillslider(initialItemValue));
//         cdispatch(c_changecellphonebilltext(initialItemValue));
//         dispatch(changecellphonebill(initialItemValue));
//       }
//     }
//     if (initialItemValue > value) {
//       let difference = initialItemValue - value;
//       //// console.log("shrinking diff" + String(difference));
//       if (Number(initialTotalValue - difference) > 0) {
//         cdispatch(
//           c_changemonthlyitemizedexpensesslider(initialTotalValue - difference)
//         );
//         cdispatch(
//           c_changemonthlyitemizedexpensestext(initialTotalValue - difference)
//         );
//         dispatch(changeexpenses(initialTotalValue - difference));
//       } else {
//         cdispatch(
//           c_changemonthlyitemizedexpensesslider(0)
//         );
//         cdispatch(
//           c_changemonthlyitemizedexpensestext(0)
//         );
//         dispatch(changeexpenses(0));
//         cdispatch(c_changecellphonebillslider(0));
//         cdispatch(c_changecellphonebilltext(0));
//         dispatch(changecellphonebill(0));
//       }
//     }
//   };

//   const slidingComplete = (value: number) => {
//     setSlidingInProgress(false);

//     // cdispatch(c_changecellphonebillslider(value));
//     // dispatch(changecellphonebill(value));

//     // //// console.log("initial value " + String(initialValue));
//     // //// console.log("value " + String(value));

//     // if (value > initialValue) {
//     //   // difference, not the actual value
//     //   cdispatch(c_changemonthlyitemizedexpensesslider(initialValue + value));
//     //   cdispatch(c_changemonthlyitemizedexpensestext(initialValue + value));
//     //   dispatch(changeexpenses(initialValue + value));
//     // }
//     // if (initialValue > value) {
//     //   // difference, not the actual value.
//     //   cdispatch(c_changemonthlyitemizedexpensesslider(initialValue - value));
//     //   cdispatch(c_changemonthlyitemizedexpensestext(initialValue - value));
//     //   dispatch(changeexpenses(initialValue - value));
//     // }

//     async () =>
//       await analytics().logEvent("calculator", {
//         id: 6000000x,
//         event: "slider-cellphonebill",
//         description: ["used cellphonebill slider", { value }],
//       });
//   };

//   const getBoolEditableValue = () => {
//     // // //// console.log("get cleaned number");

//     let editable: boolean = cellphonebill_editable;
//     ////// console.log("getBoolEditableValue cellphonebill: " + String(editable))
//     return editable;
//   };

//   useEffect(() => {
//     // init react context from redux
//     cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
//   }, []);

//   return (
//     <ViewContainer>
//       <SliderWrapper>
//         <Slider
//           disabled={getBoolEditableValue()}
//           minimumValue={0}
//           maximumValue={CalculatorState.grossIncomeRange / 10}
//           style={{ width: 350, height: 40 }}
//           step={10}
//           minimumTrackTintColor="#AADD00" //
//           maximumTrackTintColor="000000"
//           thumbTintColor={Platform.select({
//             android: appColors.keyboardGray,
//           })}
//           value={cellphonebilltext} // set by text input
//           onValueChange={(value) => changeValue(value)}
//           onSlidingComplete={(value) => slidingComplete(value)}
//         />
//       </SliderWrapper>
//     </ViewContainer>
//   );
// };

// // the backwards tick (the grave accent character) is an ES6 Javascript template literal

// export default connect(select)(CellPhoneBillSlider);

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
