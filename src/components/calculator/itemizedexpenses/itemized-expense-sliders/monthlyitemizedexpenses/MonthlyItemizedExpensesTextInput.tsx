import React, { useContext, useState } from "react";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Platform } from "react-native";

import { connect, useDispatch } from "react-redux";

import analytics from "@react-native-firebase/analytics";

import { StateContext, DispatchContext } from "../../ExpensesDetailContext";

import { updateItems } from "../../functions/UpdateItems";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
});
import CalculatorState from "../../../Arc/CalculatorState";
const halfrange = CalculatorState.grossIncomeRange / 2;
const tenthrange = CalculatorState.grossIncomeRange / 10;

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

import {
  c_changemonthlyitemizedexpensestext,
  c_monthlyitemizedexpensesvalueiseditable,
  c_changemonthlyitemizedexpensesslider,
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
import MonthlyItemizedExpensesSlider from "./MonthlyItemizedExpensesSlider";

const MonthlyItemizedExpensesTextInput = (props) => {
  let [initialMexTotalValue, setInitialMexTotalValue] = useState(0);

  let [initialOexItemValue, setInitialOexItemValue] = useState(0);
  let [initialCellpItemValue, setInitialCellpItemValue] = useState(0);
  let [initialInsItemValue, setInitialInsItemValue] = useState(0);
  let [initialGroItemValue, setInitialGroItemValue] = useState(0);
  let [initialSubItemValue, setInitialSubItemValue] = useState(0);
  let [initialUtiItemValue, setInitialUtiItemValue] = useState(0);
  let [initialTraItemValue, setInitialTraItemValue] = useState(0);

  let [lastCleanedNumber, setLastCleanedNumber] = useState(0);

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

  const numberOfItemizedExpenseTypes: number = 7;

  const dispatch = useDispatch();

  const constrainCleanedNumber = (cleanedNumber: number) => {
    if (cleanedNumber > 5000) {
      return 5000;
    } else {
      return cleanedNumber;
    }
  };

  // monthlyitemizedexpenses

  const OnChangeText = (value) => {
    // // // console.log("OnChangeText MonthlyItemizedExpenses()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainCleanedNumber(cleanedNumber);

    analytics().logEvent("ItemizedExp_MonthExp_Text_Change", {
      id: 91000005,
      event: "text-input-changed-monthlyexpenses",
      description: ["used monthlyexpenses text input", { cleanedNumber }],
    });

    cdispatch(c_changemonthlyitemizedexpensesslider(cleanedNumber));
    cdispatch(c_changemonthlyitemizedexpensestext(cleanedNumber));
    setLastCleanedNumber(cleanedNumber);
  };

  const OnChange = ({ nativeEvent: { eventCount, target, text } }) => {
    // // console.log("OnChange() monthlyitemizedexpenses function");
    // // console.log(value);
    //  dispatch(changeexpenses(monthlyitemizedexpensesslider)); // not sure this is needed
  };

  const OnEndEditing = () => {
    // console.log(
    //   "xtext:  ========================== end text input =================="
    // );
    let itemsumcell = 0;
    let itemsumins = 0;
    let itemsumtra = 0;
    let itemsumgro = 0;
    let itemsumuti = 0;
    let itemsumoex = 0;
    let itemsumsub = 0;
    let itemsumbucket = 0;

    if (lastCleanedNumber > initialMexTotalValue) {
      let positivebucket = 0;

      if (lastCleanedNumber > halfrange) {
        lastCleanedNumber = halfrange;
      }

      // let difference = lastCleanedNumber - initialMexTotalValue;
      // let part = Math.ceil(difference / numberOfItemizedExpenseTypes / 1) * 1;
      // let realpart = difference / numberOfItemizedExpenseTypes;
      // //if part > 100
      // // if total monthly > 5000
      // // console.log("positive part is " + String(part));
      // // console.log("positive  real part is " + String(realpart));

      // if (Number(initialMexTotalValue + difference) <= CalculatorState.grossIncomeRange / 2) {

      // first come up with a total of all the non-negative values

      positivebucket += initialCellpItemValue;
      positivebucket += initialUtiItemValue;
      positivebucket += initialInsItemValue;
      positivebucket += initialSubItemValue;
      positivebucket += initialGroItemValue;
      positivebucket += initialTraItemValue;
      positivebucket += initialOexItemValue;

      itemsumcell = initialCellpItemValue;
      itemsumins = initialInsItemValue;
      itemsumtra = initialTraItemValue;
      itemsumgro = initialGroItemValue;
      itemsumuti = initialUtiItemValue;
      itemsumoex = initialOexItemValue;
      itemsumsub = initialSubItemValue;

      while (true) {
        // console.log("======== new calcs============");
        // console.log("slider", monthlyitemizedexpensesslider);
        // console.log("positivebucket", positivebucket);

        // console.log("initialMexTotalValue", initialMexTotalValue);
        // console.log("lastcleanednumber", lastCleanedNumber);
        // console.log("======== new calcs============");

        if (positivebucket >= lastCleanedNumber) {
          break;
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumins + 1 <= tenthrange) {
            itemsumins += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumgro + 1 <= tenthrange) {
            itemsumgro += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumuti + 1 <= tenthrange) {
            itemsumuti += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumtra + 1 <= tenthrange) {
            itemsumtra += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumsub + 1 <= tenthrange) {
            itemsumsub += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumcell + 1 <= tenthrange) {
            itemsumcell += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumber) {
          if (itemsumoex + 1 <= tenthrange) {
            itemsumoex += 1;
            positivebucket += 1;
          }
        }
      }
    }

    // ============= end positive move ===========

    // ============== negative move
    if (initialMexTotalValue > monthlyitemizedexpensesslider) {
      let negativebucket = 0;
      let difference = initialMexTotalValue - monthlyitemizedexpensesslider;

      let part = Math.ceil(difference / numberOfItemizedExpenseTypes / 1) * 1;
      let realpart = difference / numberOfItemizedExpenseTypes;
      if (part < 0) part = 0;

      if (monthlyitemizedexpensesslider == 0) {
        // console.log("xtext: monthly expenses slider == 0");
        part = 0;
        initialOexItemValue = 0;
        initialCellpItemValue = 0;
        initialInsItemValue = 0;
        initialUtiItemValue = 0;
        initialGroItemValue = 0;
        initialTraItemValue = 0;
        initialSubItemValue = 0;
      }

      negativebucket += initialCellpItemValue;
      negativebucket += initialUtiItemValue;
      negativebucket += initialInsItemValue;
      negativebucket += initialSubItemValue;
      negativebucket += initialGroItemValue;
      negativebucket += initialTraItemValue;
      negativebucket += initialOexItemValue;

      itemsumcell = initialCellpItemValue;
      itemsumins = initialInsItemValue;
      itemsumtra = initialTraItemValue;
      itemsumgro = initialGroItemValue;
      itemsumuti = initialUtiItemValue;
      itemsumoex = initialOexItemValue;
      itemsumsub = initialSubItemValue;

      while (true) {
        // console.log("======== new calcs============");
        // console.log("slider", monthlyitemizedexpensesslider);
        // console.log("positivebucket", negativebucket);

        // console.log("initialMexTotalValue", initialMexTotalValue);
        // console.log("lastcleanednumber", lastCleanedNumber);
        // console.log("======== new calcs============");

        if (negativebucket <= lastCleanedNumber) {
          break;
        }

        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumins - 1 >= 0) {
            itemsumins -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumgro - 1 >= 0) {
            itemsumgro -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumuti - 1 >= 0) {
            itemsumuti -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumtra - 1 >= 0) {
            itemsumtra -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumsub - 1 >= 0) {
            itemsumsub -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumcell - 1 >= 0) {
            itemsumcell -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumber) {
          if (itemsumoex - 1 >= 0) {
            itemsumoex -= 1;
            negativebucket -= 1;
          }
        }
      }
    }

    if (initialMexTotalValue != monthlyitemizedexpensesslider) {
      cdispatch(c_changecellphonebillslider(itemsumcell));
      cdispatch(c_changecellphonebilltext(itemsumcell));
      dispatch(changecellphonebill(itemsumcell));

      cdispatch(c_changeutilitiesslider(itemsumuti));
      cdispatch(c_changeutilitiestext(itemsumuti));
      dispatch(changeutilities(itemsumuti));

      cdispatch(c_changeinsuranceslider(itemsumins));
      cdispatch(c_changeinsurancetext(itemsumins));
      dispatch(changeinsurance(itemsumins));

      cdispatch(c_changesubscriptionservicesslider(itemsumsub));
      cdispatch(c_changesubscriptionservicestext(itemsumsub));
      dispatch(changesubscriptionservices(itemsumsub));

      cdispatch(c_changegroceriesanddiningslider(itemsumgro));
      cdispatch(c_changegroceriesanddiningtext(itemsumgro));
      dispatch(changegroceriesanddining(itemsumgro));

      cdispatch(c_changetransportationslider(itemsumtra));
      cdispatch(c_changetransportationtext(itemsumtra));
      dispatch(changetransportation(itemsumtra));

      cdispatch(c_changeotherexpensesslider(itemsumoex));
      cdispatch(c_changeotherexpensestext(itemsumoex));
      dispatch(changeotherexpenses(itemsumoex));

      // cdispatch(c_changemonthlyitemizedexpensesslider(negativebucket));
      // cdispatch(c_changemonthlyitemizedexpensestext(negativebucket));

      dispatch(changeexpenses(monthlyitemizedexpensesslider));
    }

    cdispatch(c_monthlyitemizedexpensesvalueiseditable(false));
  };

  const OnFocus = () => {
    // // console.log("OnFocus() gross income function");

    cdispatch(c_monthlyitemizedexpensesvalueiseditable(true));

    setInitialMexTotalValue(Number(monthlyitemizedexpensestext));
    setInitialOexItemValue(Number(otherexpensesslider));
    setInitialCellpItemValue(Number(cellphonebillslider));
    setInitialInsItemValue(Number(insuranceslider));
    setInitialGroItemValue(Number(groceriesanddiningslider));
    setInitialSubItemValue(Number(subscriptionservicesslider));
    setInitialUtiItemValue(Number(utilitiesslider));
    setInitialTraItemValue(Number(transportationslider));
  };

  const getCleanedValueFromSlider = () => {
    //// console.log("get cleaned number from slider mie text input");
    //// console.log('and that is ' + String(monthlyitemizedexpensesslider))

    return String(monthlyitemizedexpensesslider);
  };

  return (
    <ViewContainerTextInput>
      <DollarText>$</DollarText>
      <SliderTextInput
        editable={true}
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

export default connect(select)(MonthlyItemizedExpensesTextInput);

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
`;
