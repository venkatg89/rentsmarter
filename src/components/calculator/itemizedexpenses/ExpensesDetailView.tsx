import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useContext,
} from "react";
import { useFocusEffect } from "@react-navigation/native";

import styled from "styled-components/native";

// import Platform from 'react-native';
import { Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

import { useDispatch } from "react-redux";

import InsuranceSlider from "./itemized-expense-sliders/insurance/InsuranceSlider";
import InsuranceTextInput from "./itemized-expense-sliders/insurance/InsuranceTextInput";

import CellPhoneBillTextInput from "./itemized-expense-sliders/cellphonebill/CellPhoneBillTextInput";
import CellPhoneBillSlider from "./itemized-expense-sliders/cellphonebill/CellPhoneBillSlider";

import {
  StateContext,
  DispatchContext,
} from "../itemizedexpenses/ExpensesDetailContext";

import { c_changemonthlyitemizedexpensesslider } from "../itemizedexpenses/ExpensesActions";

// import ExpensesSlider from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningSlider";
// import ExpensesTextInput from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningTextInput";

// import PayDeductionsSlider from "./itemized-expense-sliders/transportation/TransportationSlider";
// import PayDeductionsTextInput from "./itemized-expense-sliders/transportation/TransportationTextInput";

// import DebtSlider from "./itemized-expense-sliders/utilities/UtilitiesSlider";
// import DebtTextInput from "./itemized-expense-sliders/utilities/UtilitiesTextInput";

// import GrossIncomeInfoButtonView from "./itemized-expense-sliders/cellphonebill/CellPhoneBillnfoButtonView"
// import PercentIncomeInfoButtonView from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningInfoButtonView";
// import DeductionsInfoButtonView from "./itemized-expense-sliders/transportation/TransportationInfoButtonView";
// import DebtInfoButtonView from "./itemized-expense-sliders/utilities/UtilitiesInfoButtonView";
import InsuranceInfoButtonView from "./itemized-expense-sliders/insurance/InsuranceInfoButtonView";

import CalculatorState from "../Arc/CalculatorState";
import CellPhoneBillInfoButtonView from "./itemized-expense-sliders/cellphonebill/CellPhoneBillnfoButtonView";
import GroceriesAndDiningInfoAlert from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningInfoAlert";
import GroceriesAndDiningInfoButtonView from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningInfoButtonView";
import GroceriesAndDiningTextInput from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningTextInput";
import GroceriesAndDiningSlider from "./itemized-expense-sliders/groceriesanddining/GroceriesAndDiningSlider";
import UtilitiesInfoButtonView from "./itemized-expense-sliders/utilities/UtilitiesInfoButtonView";
import UtilitiesTextInput from "./itemized-expense-sliders/utilities/UtilitiesTextInput";
import UtilitiesSlider from "./itemized-expense-sliders/utilities/UtilitiesSlider";
import TransportationInfoButtonView from "./itemized-expense-sliders/transportation/TransportationInfoButtonView";
import TransportationTextInput from "./itemized-expense-sliders/transportation/TransportationTextInput";
import TransportationSlider from "./itemized-expense-sliders/transportation/TransportationSlider";
import SubscriptionServicesInfoButtonView from "./itemized-expense-sliders/subscriptionservices/SubscriptionServicesInfoButtonView";
import SubscriptionServicesTextInput from "./itemized-expense-sliders/subscriptionservices/SubscriptionServicesTextInput";
import SubscriptionServicesSlider from "./itemized-expense-sliders/subscriptionservices/SubscriptionServicesSlider";
import OtherExpensesInfoButtonView from "./itemized-expense-sliders/otherexpenses/OtherExpensesInfoButtonView";
import OtherExpensesTextInput from "./itemized-expense-sliders/otherexpenses/OtherExpensesTextInput";
import OtherExpensesSlider from "./itemized-expense-sliders/otherexpenses/OtherExpensesSlider";
import MonthlyItemizedExpensesInfoButtonView from "./itemized-expense-sliders/monthlyitemizedexpenses/MonthlyItemizedExpensesnfoButtonView";
import MonthlyItemizedExpensesTextInput from "./itemized-expense-sliders/monthlyitemizedexpenses/MonthlyItemizedExpensesTextInput";
import MonthlyItemizedExpensesSlider from "./itemized-expense-sliders/monthlyitemizedexpenses/MonthlyItemizedExpensesSlider";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
  calculatorCalculationsData: state.calculatorCalculationsData,
  arcData: state.arcData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
  };
};

function lazyInit(initialCount: number) {
  return { count: initialCount };
}

// context / useReducer state management
// for itemized expenses sliders

// const DispatchContext = React.createContext();
// created
// DispatchContext.Provider and
// DispatchContext.Consumer (like Publisher in SwiftUI)
// useContext() subscribes(consumes)
// note: I still don't understand useMemo

// const StateContext = React.createContext();

function ExpensesDetailView(props) {
  const navigation = useNavigation();

  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let {
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
    monthlyitemizedexpenses_editable,
  } = cstate;

  useEffect(() => {
    CalculatorState.calculateOptimalRent(props);
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("usefocus on expdetail");
  //     cdispatch(c_changemonthlyitemizedexpensesslider(String(monthlyitemizedexpensestext)));
  //   }, [monthlyitemizedexpensestext, monthlyitemizedexpensesslider])
  // );

  return (
    <ViewContainer>
      <SlidersScrollView>
        <SliderTitleRow>
          <SliderHeader>Monthly Itemized Expenses</SliderHeader>
          <MonthlyItemizedExpensesInfoButtonView />
          <Spacer></Spacer>
          <MonthlyItemizedExpensesTextInput />
        </SliderTitleRow>
        <MonthlyItemizedExpensesSlider />

        <SliderTitleRow>
          <SliderHeader>Insurance</SliderHeader>
          <InsuranceInfoButtonView />
          <Spacer></Spacer>
          <InsuranceTextInput />
        </SliderTitleRow>
        <InsuranceSlider />

        <SliderTitleRow>
          <SliderHeader>Groceries and Dining</SliderHeader>
          <GroceriesAndDiningInfoButtonView />
          <Spacer></Spacer>
          <GroceriesAndDiningTextInput />
        </SliderTitleRow>
        <GroceriesAndDiningSlider />

        <SliderTitleRow>
          <SliderHeader>Utilities</SliderHeader>
          <UtilitiesInfoButtonView />
          <Spacer></Spacer>
          <UtilitiesTextInput />
        </SliderTitleRow>
        <UtilitiesSlider />

        <SliderTitleRow>
          <SliderHeader>Transportation</SliderHeader>
          <TransportationInfoButtonView />
          <Spacer></Spacer>
          <TransportationTextInput />
        </SliderTitleRow>
        <TransportationSlider />

        <SliderTitleRow>
          <SliderHeader>Subscription Services</SliderHeader>
          <SubscriptionServicesInfoButtonView />
          <Spacer></Spacer>
          <SubscriptionServicesTextInput />
        </SliderTitleRow>
        <SubscriptionServicesSlider />

        <SliderTitleRow>
          <SliderHeader>Cellphone Bill</SliderHeader>
          <CellPhoneBillInfoButtonView />
          <Spacer></Spacer>
          <CellPhoneBillTextInput />
        </SliderTitleRow>
        <CellPhoneBillSlider />

        <SliderTitleRow>
          <SliderHeader>Other Expenses</SliderHeader>
          <OtherExpensesInfoButtonView />
          <Spacer></Spacer>
          <OtherExpensesTextInput />
        </SliderTitleRow>
        <OtherExpensesSlider />
      </SlidersScrollView>
    </ViewContainer>
  );
}

export default connect(select, mapDispatchToProps)(ExpensesDetailView);

const BottomSpacer = styled.View`
  height: 50px;
`;

const SliderTextInput = styled.TextInput`
  /* border: 10px blue; */
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  width: 70px;
  height: 32px;
  color: black;
  display: flex;

  height: ${Platform.select({ ios: "30px", android: "25px" })};
  border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
`; // change height of

const ComfortableRentText = styled.Text`
  padding-bottom: 20px;
`;

const DeductionsText = styled.Text`
  color: blue;
  padding-bottom: 20px;
`;

const ExpensesText = styled.Text`
  color: blue;
  padding-bottom: 20px;
`;

const GraybarContainer = styled.View`
  background-color: white;
  padding-bottom: 30px;
`;
const GraybarThick = styled.View`
  background-color: lightgray;
  height: 4px;
`;

const GraybarThin = styled.View`
  background-color: lightgray;
  height: 1px;
`;

const SliderMessageView = styled.View`
  padding-horizontal: 30px;
  background-color: white;
  height: 30px;
  justify-content: center;
`;

const SliderMessageText = styled.Text`
  padding-top: 6px;
  background-color: lightgray;
  height: 30px;
`;

const ScrollRowView = styled.View``;

const ViewContainer = styled.View`
  justify-content: center;
  flex: 1;
`;
const SliderHeader = styled.Text`
  color: black;
`;

const SliderTitleRow = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  /* flex: 1; causes labels to jump and disappear */
`;

const Spacer = styled.Text`
  /* border: red; */
  flex: 1;
`;

const SlidersScrollView = styled.ScrollView`
  background-color: white;
  padding-top: 20px;
  flex: 1;
`;

const ArcView = styled.View`
  flex: 1;
  height: 100px;
  background-color: blue;
`;

const MainVerticalContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;
