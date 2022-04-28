import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  Platform,
  useWindowDimensions,
  Dimensions,
  View,
  Text,
  Pressable,
} from "react-native";

import DataItemCircle from "../Arc/DataItemCircle";
import appColors from "./../../../config/colors";
import typography from "../../../config/typography";

import ArcInfoButtonView from "../Arc/ArcInfoButtonView";
import { drawArc } from "../../../tools/segmented-round/helpers";

import { Svg, Path } from "react-native-svg";

import { connect } from "react-redux";

import { useCallback } from "react";

import CalculatorState from "../Arc/CalculatorState";

// styled-components
import styled from "styled-components/native";

// application
import CalcSlidersScrollView from "../../../components/calculator/CalcSlidersScrollView";

// import Platform from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";

// import GrossIncomeTextInput from "./sliders/monthlygrossincome/GrossIncomeTextInput";
// import GrossIncomeSlider from "./sliders/monthlygrossincome/GrossIncomeSlider";
// import GrossIncomeSliderRange from "../sliders/monthlygrossincome/GrossIncomeSliderRange";
import ExpensesSlider from "../sliders/expenses/ExpensesSlider";
import ExpensesTextInput from "../sliders/expenses/ExpensesTextInput";
// import PayDeductionsSlider from "../sliders/deductions/PayDeductionsSlider";
// import PayDeductionsTextInput from "../sliders/deductions/PayDeductionsTextInput";
// import DebtSlider from "../sliders/debt/DebtSlider";
// import DebtTextInput from "../sliders/debt/DebtTextInput";
// import SavingsSlider from "../sliders/savings/SavingsSlider";
// import SavingsTextInput from "../sliders/savings/SavingsTextInput";
// import PercentIncomeSlider from "../sliders/percentIncomeToRent/PercentIncomeSlider";
import PercentIncomeLabel from "../sliders/percentIncomeToRent/PercentIncomeLabel";

import SegmentsState from "../Arc/SegmentsState";
import GrossIncomeInfoButtonView from "../sliders/monthlygrossincome/GrossIncomeInfoButtonView";
import PercentIncomeInfoButtonView from "../sliders/percentIncomeToRent/PercentIncomeButtonView";
import DeductionsInfoButtonView from "../sliders/deductions/DeductionsInfoButtonView";
import DebtInfoButtonView from "../sliders/debt/DebtInfoButtonView";
import ExpensesInfoButtonView from "../sliders/expenses/ExpensesInfoButtonView";
import SavingsInfoButtonView from "../sliders/savings/SavingsInfoButtonView";

import Ionicons from "react-native-vector-icons/Ionicons";

import NewGrossIncomeGroup from "../sliders/monthlygrossincome/NewGrossIncomeGroup";
import analytics from "@react-native-firebase/analytics";
import {
  StateContext,
  DispatchContext,
} from "../itemizedexpenses/ExpensesDetailContext";

const select = (state, props) => ({
  state: state,
  calculatorUIData: state.calculatorUIData,
  calculatorCalculationsData: state.calculatorCalculationsData,
  arcData: state.arcData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
  };
};

import Slider from "@react-native-community/slider";

import {
  changegrossincome,
  changepercentincome,
  changepaydeductions,
  changeexpenses,
  changedebt,
  changesavings,
  changeincomerange,
  changeleftover,
  changerentamount,
} from "../../../redux/actions/actions";
import {
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
  c_cv_expensesvalueiseditable,
} from "../itemizedexpenses/ExpensesActions";

//

// let seg1 = false;
// let seg2 = false;

// let seg3 = false;
// let seg4 = false;

// let seg5 = false;
// let seg6 = false;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function CalculatorView(props, state) {
  const { calculatorUIData, calculatorCalculationsData, arcData } = props;
  const { cstate } = useContext(StateContext);
  const { cdispatch } = useContext(DispatchContext);

  let {
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
    cv_expenses_editable,
  } = cstate;

  let s = state;

  let { expenses } = calculatorUIData;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log("usefocus on calcview");
  //     cdispatch(c_changemonthlyitemizedexpensesslider(String(monthlyitemizedexpensestext)));
  //   }, [monthlyitemizedexpensestext, monthlyitemizedexpensesslider])
  // );

  useEffect(() => {
    async () =>
      await analytics().logEvent("calculator", {
        id: 20000002,
        event: "calculator page",
        description: ["arrived on calculator page"],
      });
  }, []);

  useEffect(() => {
    // init react context from redux
    cdispatch(c_changemonthlyitemizedexpensesslider(calculatorUIData.expenses));
    cdispatch(c_changemonthlyitemizedexpensestext(calculatorUIData.expenses));
  }, []);

  // width/height of entire screen
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const windowHeightFactor = Platform.OS === "ios" ? 0.3 : 0.28;
  const modwindowHeight = useWindowDimensions().height * windowHeightFactor;
  const svgWindowHeightFactor = Platform.OS === "ios" ? 70 : 0;

  const radiusDial = 0.7;

  // width/height of the Container View
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  // width/height of the Svg View
  const [svgsize, setSvgsize] = useState({ width: 0, height: 0 });

  const onSVGLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSvgsize({ width, height }); // these may NOT be the problem
  }, []);

  const [renderRemaining, setRenderRemaining] = useState(false);
  const [renderWhoops, setRenderWhoops] = useState(false);

  const everythingIsZero = () => {
    if (
      cleanedGrossIncomeSlider == 0 &&
      cleanedSavingsSlider == 0 &&
      monthlyitemizedexpensesslider == 0 &&
      cleanedPayDeductionsSlider == 0 &&
      cleanedDebtSlider == 0
    ) {
      setRenderRemaining(false);
      return true;
    } else {
      setRenderRemaining(true);
      return false;
    }
  };

  const DisplaySegments = (props) => {
    if (everythingIsZero()) {
      async () =>
        await analytics().logEvent("calculator", {
          id: 10000003,
          event: "calculator-grayarc",
          description: ["show gray arc in all fields = zero state"],
        });
      setRenderWhoops(false);
      return (
        // <View><Text>Hello there</Text></View>
        <View>
          <Path
            fill="none"
            stroke={appColors.grayNeutral}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              0,
              180
            )}
          />
        </View>
      );
    } else if (CalculatorState.monthlyLeftOver >= 0) {
      async () =>
        await analytics().logEvent("calculator", {
          id: 10000002,
          event: "calculator-segmentedarc",
          description: ["show segmented arc with income portions"],
        });
      setRenderWhoops(false);
      return (
        <View>
          <SegMM1></SegMM1>
          <SegMM2></SegMM2>
          <SegMM3></SegMM3>
          <SegMM4></SegMM4>
          <SegMM5></SegMM5>
          <SegMM6></SegMM6>
        </View>
      );
    } else {
      async () =>
        await analytics().logEvent("calculator", {
          id: 10000001,
          event: "calculator-redarc",
          description: ["the input amount exceeded the income"],
        });

      setRenderWhoops(true);
      return (
        <RedArcView>
          <RedArcPathView>
            <Path
              fill="none"
              stroke={appColors.spentTooMuchMaroonRed}
              strokeWidth={15}
              strokeLinecap="square"
              d={drawArc(
                windowWidth * 0.5,
                svgsize.height,
                Platform.OS === "ios"
                  ? svgsize.height * 0.93
                  : svgsize.height * 0.92,
                0,
                180
              )}
            />
          </RedArcPathView>
        </RedArcView>
      );
    }
  };

  const SegMM1 = () => {
    if (SegmentsState.segment1End != SegmentsState.segment1Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.rentAmountGreen}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment1Start,
              SegmentsState.segment1End
            )}
          />
        </View>
      );
    } else return null;
  };

  const SegMM2 = () => {
    if (SegmentsState.segment2End != SegmentsState.segment2Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.expensesAqua}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment2Start,
              SegmentsState.segment2End
            )}
          />
        </View>
      );
    } else return null;
  };

  const SegMM3 = () => {
    if (SegmentsState.segment3End != SegmentsState.segment3Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.deductionsAqua}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment3Start,
              SegmentsState.segment3End
            )}
          />
        </View>
      );
    } else return null;
  };

  const SegMM4 = () => {
    if (SegmentsState.segment4End != SegmentsState.segment4Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.debtBlue}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment4Start,
              SegmentsState.segment4End
            )}
          />
        </View>
      );
    } else return null;
  };

  const SegMM5 = () => {
    if (SegmentsState.segment5End != SegmentsState.segment5Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.savingsGold}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment5Start,
              SegmentsState.segment5End
            )}
          />
        </View>
      );
    } else return null;
  };

  const SegMM6 = () => {
    if (SegmentsState.segment6End != SegmentsState.segment6Start) {
      return (
        <View>
          <Path
            fill="none"
            stroke={appColors.remainingAmountBlue}
            strokeWidth={15}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.93
                : svgsize.height * 0.92,
              SegmentsState.segment6Start,
              SegmentsState.segment6End
            )}
          />
        </View>
      );
    } else return null;
  };

  //// ============= calc scroll view constants ============== ///

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    // // console.log("useeffect!!");

    // setCleanedGrossIncomeSlider(cleanedGrossIncomeText)

    // has to go here. and only here.
    updateCalculatedStateSlider();

    CalculatorState.calculateOptimalRent(props);

    if (GrayArcWillShow()) {
      /* just let it show */
    } else if (SegmentedArcWillShow()) {
      // calculate the arc segments
      //// // console.log("CALCULATE THE ARCS!!!!!!!!!")
      SegmentsState.calculateArc(props, dispatch);
      SegmentsState.calculateArc2(props, dispatch);
    } else {
      RedArcWillShow(); /* just let it show */
    }

    colorStep(percentOfGrossIncome);

    // NOTE: IF the SegmentStates methods are run when a static arc is present
    // the app goes into an infinite loop. That is bad.
  });

  useLayoutEffect(() => {
    // // // console.log("useLayoutEffect ");
  });

  // const SetTheArc = () => {
  //   calculateOptimalRent();

  //   if (GrayArcWillShow()) {
  //     /* just let it show */
  //   } else if (SegmentedArcWillShow()) {
  //     // calculate the arc segments
  //      calculateArc()
  //      calculateArc2()
  //   } else {
  //     RedArcWillShow(); /* just let it show */
  //   }

  // }

  const constrainCleanedNumber = (cleanedNumber: number) => {
    if (cleanedNumber > 10000) {
      return 10000;
    } else {
      return cleanedNumber;
    }
  };

  const GrayArcWillShow = () => {
    if (
      CalculatorState.monthlyGrossIncome == 0 &&
      CalculatorState.monthlySavings == 0 &&
      CalculatorState.monthlyExpenses == 0 &&
      CalculatorState.monthlyMandatoryDeductions == 0 &&
      CalculatorState.monthlyDebt == 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const SegmentedArcWillShow = () => {
    if (CalculatorState.monthlyLeftOver >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const RedArcWillShow = () => {
    // do nothing
  };

  const renderRentAmountSwitch = (param) => {
    switch (param) {
      case false:
        return (
          <ArcTextPackage>
            <ArcTextRow>
              <Spacer></Spacer>
              <ArcTitle>Your monthly income </ArcTitle>
              <Spacer></Spacer>
            </ArcTextRow>

            <ArcTextRow>
              <Spacer></Spacer>
              <ArcTitle>$ {Math.round(cleanedGrossIncomeSlider)}</ArcTitle>
              {/* <ArcTitle> ${calculatorUIData.gross_income} /month</ArcTitle> */}
              {/* <ArcTitle> ${CalculatorState.monthlyGrossIncome} /month</ArcTitle> */}
              <Spacer></Spacer>
            </ArcTextRow>
          </ArcTextPackage>
        );
    }
  };

  const renderWhoopsSwitch = (param) => {
    switch (param) {
      case true:
        return (
          <WhoopsPackage>
            <ArcTextRow>
              <Spacer></Spacer>
              <ArcTitleFrame>
                <WhoopsRow>
                  <Spacer></Spacer>
                  <WhoopsTitle>Whoops! </WhoopsTitle>
                  <CompleteWhoopsTitle>
                    Your inputs exceeded your monthly income
                  </CompleteWhoopsTitle>
                  <Spacer></Spacer>
                </WhoopsRow>
              </ArcTitleFrame>
              <Spacer></Spacer>
            </ArcTextRow>
          </WhoopsPackage>
        );
    }
  };

  const fullArcView = 0;
  const partialArcView = -100;
  let [arcMarginTop, setArcMarginTop] = useState(fullArcView);

  const renderRemainingSwitch = (param) => {
    //

    switch (param) {
      case true:
        return (
          <SliderMessageView>
            <SliderMessageText>
              You will have ${Math.round(localLeftOver)} remaining
            </SliderMessageText>
          </SliderMessageView>
        );
      case false:
        return (
          <SliderMoveView>
            <SliderMessageText>
              Move all sliders below to see what you can afford.
            </SliderMessageText>
          </SliderMoveView>
        );
    }
  };

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
      case 10:
      case 20:

      case 30:
        async () =>
          await analytics().logEvent("calculator", {
            id: 10000004,
            event: "percent<=30",
            description: ["rent fits comfortably in budget"],
          });
        return (
          <RowText>
            <SmallText>Your rent should fit </SmallText>
            <SmallBoldText>comfortably</SmallBoldText>
            <SmallText> in your budget.</SmallText>
          </RowText>
        );
      case 40:
        async () =>
          await analytics().logEvent("calculator", {
            id: 10000005,
            event: "percent=40",
            description: ["rent exceeds budget"],
          });
        return (
          <RowText>
            <SmallText>You will be </SmallText>
            <SmallBoldText>rent burdened</SmallBoldText>
            <SmallText> by the cost.</SmallText>
          </RowText>
        );

      case 50:
      case 60:
      case 70:
      case 80:
      case 90:
      case 100:
        async () =>
          await analytics().logEvent("calculator", {
            id: 10000006,
            event: "percent>=50",
            description: ["rent SEVERElY exceeds budget"],
          });
        return (
          <RowText>
            <SmallText>You will be </SmallText>
            <SmallBoldText>severely rent burdened</SmallBoldText>
            <SmallText> by the cost.</SmallText>
          </RowText>
        );
      default:
        return <Text>No Logo</Text>;
    }
  };

  let [localNetAmount, setLocalNetAmount] = useState(0);

  const updateCalculatedStateSlider = () => {
    CalculatorState.monthlyGrossIncome = cleanedGrossIncomeSlider;
    CalculatorState.percentIncome = percentOfGrossIncome;
    CalculatorState.rentAmount =
      cleanedGrossIncomeSlider * percentOfGrossIncome * 0.01;

    updateCalculatedLeftoverSlider();
  };

  const updateCalculatedLeftoverSlider = () => {
    setLocalNetAmount(
      cleanedGrossIncomeSlider -
        cleanedGrossIncomeSlider * (percentOfGrossIncome * 0.01)
    );

    //// console.log(localNetAmount)

    const slidertot: number =
      cleanedDebtSlider +
      monthlyitemizedexpensesslider +
      cleanedSavingsSlider +
      cleanedPayDeductionsSlider;

    const leftover: number =
      Number(
        cleanedGrossIncomeSlider -
          cleanedGrossIncomeSlider * (percentOfGrossIncome * 0.01)
      ) - slidertot;

    // // console.log("four sliders added " + String(slidertot));
    // // console.log("const leftover" + String(leftover));
    // // console.log("-----------------");

    setLocalLeftOver(leftover);
    // no dispatches here! infinite loop in useeffect

    CalculatorState.monthlyNetIncome = localNetAmount;
    CalculatorState.monthlyLeftOver = leftover;

    // // console.log("localnetamount " + String(localNetAmount))
    // // console.log("localleftover" + String(localLeftOver))

    // // console.log(cleanedDebtSlider )
    //   // console.log(  cleanedExpensesSlider )
    //     // console.log( cleanedSavingsSlider )
    //       // console.log( cleanedPayDeductionsSlider)
  };

  ///============= GROSS INCOME SLIDER ================ ///
  let [cleanedGrossIncomeSlider, setCleanedGrossIncomeSlider] = useState(
    calculatorUIData.gross_income
  );
  let [cleanedGrossIncomeText, setCleanedGrossIncomeText] = useState(
    calculatorUIData.gross_income
  );
  let [grossIncomeValueIsEditable, setGrossIncomeValueIsEditable] =
    useState(false);

  const changeSliderGrossIncome = (value: number) => {
    // removed async keyword
    //props.dispatch(changegrossincome(value));
    // console.log("changeSliderGrossIncome");
    // console.log(value);

    dispatch(changegrossincome(value));
    setCleanedGrossIncomeSlider(value);
    setLocalRentAmount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01);
    dispatch(
      changerentamount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01)
    );

    // setCleanedGrossIncomeText(value);

    // CalculatorState.monthlyGrossIncome = value;
    // setLocalRentAmount(CalculatorState.percentIncome * value * 0.01);

    // if (localRentAmount == 0) {
    //   //// console.log("local rent amount is equal to zero");

    //   CalculatorState.percentIncome = percentOfGrossIncome;
    //   CalculatorState.rentAmount =
    //     CalculatorState.monthlyGrossIncome * CalculatorState.percentIncome;

    //   setLocalRentAmount(
    //     CalculatorState.percentIncome *
    //       CalculatorState.monthlyGrossIncome *
    //       0.01
    //   );

    //   // // console.log("Rent amount and percent: " + String(CalculatorState.rentAmount) +  " " + String(CalculatorState.percentIncome))

    //   dispatch(changepercentincome(percentOfGrossIncome));

    // }
  };

  const slidingStartGrossIncome = (value: number) => {
    // console.log("slidingStart() gross income");
    //props.dispatch(changegrossincome(value));
  };

  const slidingCompleteGrossIncome = (value: number) => {
    // you can do a test here to see if value has changed since last OnValueChange,
    // if it's the same, don't do the dispatch, save a cycle. Later optimization.
    // // // console.log("sliding start");
    //props.dispatch(changegrossincome(value));
    // console.log("slidingComplete() gross income");

    setCleanedGrossIncomeSlider(value);
    setLocalRentAmount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01);
    dispatch(
      changerentamount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01)
    );
    // updateCalculatedStateSlider();

    // it's okay to do this now because it's not longer updating
    // the text field. It may cause a render on the arc, as it's supposed
    // to do. philosophy: useState updates the interaction between sliders and
    // text inputs, for speed; and redux posted values update the arc, because there's
    // no recursive interaction.
    dispatch(changegrossincome(value));
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000007,
        event: "slider-grossincome",
        description: ["used gross income slider", { value }],
      });
  };

  const OnChangeTextGrossIncome = (value) => {
    // console.log("OnChangeTextGrossIncome() function");

    let a: string = String(value);

    if (a == "") {
      a = "0";
    }
    let cleanedNumber = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainCleanedNumber(cleanedNumber);
    // // console.log("cleaned gross income in change text: " + String(cleanedNumber))

    // the text input picks up it's displayed value from slider
    // so value in text input as you type won't stick with out this line:
    setCleanedGrossIncomeSlider(Number(cleanedNumber));

    // just to keep the number up to date.
    setCleanedGrossIncomeText(Number(cleanedNumber));
  };

  const OnSelectionChangeGrossIncome = () => {
    // console.log("OnSelectionChange() gross income function");
    // // console.log(cleanedGrossIncomeText);
  };

  const OnContentSizeChangeGrossIncome = () => {
    // console.log("OnContentSizeChange() gross income function");
  };

  const OnChangeGrossIncome = ({
    nativeEvent: { eventCount, target, text },
  }) => {
    // console.log("OnChange() gross income function");
    // console.log("event count " + String(eventCount));
    // console.log("target " + String(target));
    // console.log("text " + String(text));
  };

  const OnSubmitEditingGrossIncome = () => {
    // replace with individual events as needed
    // console.log("OnSubmitEditing() gross income function");
  };

  const OnEndEditingGrossIncome = () => {
    // console.log("OnEndEditing() gross income function");
    // console.log("gross income text " + cleanedGrossIncomeText);

    // updateCalculatedStateSlider();
    setLocalRentAmount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01);
    dispatch(changegrossincome(cleanedGrossIncomeText));
    dispatch(
      changerentamount(percentOfGrossIncome * cleanedGrossIncomeSlider * 0.01)
    );

    setArcMarginTop(fullArcView);
    setGrossIncomeValueIsEditable(false);

    async () =>
      await analytics().logEvent("calculator", {
        id: 10000008,
        event: "text-input-grossincome",
        description: [
          "used gross income text input",
          { cleanedGrossIncomeSlider },
        ],
      });
  };

  const OnFocusGrossIncome = () => {
    // console.log("OnFocus() gross income function");

    setArcMarginTop(partialArcView);
    setGrossIncomeValueIsEditable(true);
  };

  const getCleanedGrossIncomeFromSlider = () => {
    // // console.log("get cleaned gross income number");

    // this function is needed for the value of the text input
    // if you try to use the simple state field the text input value  will NOT
    // update when sliding

    //  // console.log("is editable: slider: " + String(cleanedGrossIncomeSlider));
    // // console.log("is editable: pure slider: " + cleanedGrossIncomeSlider);

    return String(cleanedGrossIncomeSlider); // always zero -- component not mounted error sporadically
  };

  // ==============================
  // percent slider

  let [percentOfGrossIncome, setPercentOfGrossIncome] = useState(
    calculatorUIData.percent_income
  );
  let renterFeedbackText = renderSwitch(percentOfGrossIncome);
  let [localRentAmount, setLocalRentAmount] = useState(
    Math.round(
      Number(calculatorUIData.percent_income) *
        Number(calculatorUIData.gross_income) *
        0.01
    )
  );
  let [localLeftOver, setLocalLeftOver] = useState(
    Math.round(
      calculatorUIData.gross_income -
        calculatorUIData.gross_income * calculatorUIData.percent_income * 0.01 -
        (calculatorUIData.expenses +
          calculatorUIData.savings +
          calculatorUIData.debt +
          calculatorUIData.pay_deductions)
    )
  );
  // useState(calculatorUIData.percent_income * calculatorUIData.gross_Income * .01);

  const changePercentIncome = (value) => {
    colorStep(value);
    setPercentOfGrossIncome(value);
    // let anum = props.dispatch(changepercentincome(value));
    setLocalRentAmount(value * cleanedGrossIncomeSlider * 0.01);
    CalculatorState.percentIncome = value;

    dispatch(changepercentincome(value));
  };

  function colorStep(value) {
    switch (true) {
      case value <= 30:
        setSliderPercentColor(appColors.percentIncomeSliderBGGreen);

        break;
      case value == 40:
        setSliderPercentColor(appColors.savingsGold);

        break;
      case value >= 50:
        setSliderPercentColor(appColors.spentTooMuchMaroonRed);

        break;
      default:
        setSliderPercentColor(appColors.percentIncomeSliderBGGreen);

        break;
    }
  }

  const [sliderPercentColor, setSliderPercentColor] = useState(
    appColors.percentIncomeSliderBGGreen
  );

  const [stepValue, setStepValue] = useState(10);

  const slidingCompletePercentIncome = (value: number) => {
    // colorStep(value);
    // //let anum = dispatch(changepercentincome(value));
    // setPercentOfGrossIncome(value);
    // CalculatorState.rentAmount = cleanedGrossIncomeSlider * value;
    // CalculatorState.percentIncome = value;
    // setLocalRentAmount(value * cleanedGrossIncomeSlider * 0.01);
    // // // console.log("Rent amount and percent: " + String(CalculatorState.rentAmount) +  " " + String(CalculatorState.percentIncome))
    // // updateCalculatedLeftoverSlider();
    // dispatch(changepercentincome(value));
  };

  // monthly pay deductions

  let [cleanedPayDeductionsSlider, setCleanedPayDeductionsSlider] = useState(
    calculatorUIData.pay_deductions
  );
  let [cleanedPayDeductionsText, setCleanedPayDeductionsText] = useState(
    calculatorUIData.pay_deductions
  );
  let [payDeductionsValueIsEditable, setPayDeductionsValueIsEditable] =
    useState(false);

  const changePayDeductions = (value) => {
    setCleanedPayDeductionsSlider(value);
    dispatch(changepaydeductions(value));
  };

  const slidingCompletePayDeductions = (value: number) => {
    setCleanedPayDeductionsSlider(value);
    dispatch(changepaydeductions(value));
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000009,
        event: "slider-deductions",
        description: ["used deductions slider", { value }],
      });
  };

  const OnChangeTextPayDeductions = (value) => {
    // // // console.log("OnChangeTextPayDeductions()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainCleanedNumber(cleanedNumber);

    setCleanedPayDeductionsSlider(Number(cleanedNumber));
    setCleanedPayDeductionsText(Number(cleanedNumber));
  };

  const OnSelectionChangePayDeductions = () => {
    // // // console.log("OnSelectionChange() deductions function");
  };

  const OnContentSizeChangePayDeductions = () => {
    // // console.log("OnContentSizeChange()pay deductions function");
  };

  const OnChangePayDeductions = ({
    nativeEvent: { eventCount, target, text },
  }) => {
    // // console.log("OnChange() pay deductions function");
    // // console.log(value);
    // console.log("event count " + String(eventCount));
    // console.log("target " + String(target));
    // console.log("text " + String(text));
    dispatch(changepaydeductions(cleanedPayDeductionsSlider));
  };

  const OnSubmitEditingPayDeductions = () => {
    // // console.log("OnSubmitEditing() pay deductions function");
  };

  const OnEndEditingPayDeductions = () => {
    // // // console.log("OnEndEditing() pay deductions function");

    // setCleanedPayDeductionsSlider(cleanedPayDeductionsText);
    // // updateCalculatedStateSlider();

    dispatch(changepaydeductions(cleanedPayDeductionsText)); //questionable

    setArcMarginTop(fullArcView);
    setPayDeductionsValueIsEditable(false);
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000010,
        event: "text-input-deductions",
        description: [
          "used deductions text input",
          { cleanedPayDeductionsSlider },
        ],
      });
  };

  const OnFocusPayDeductions = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialArcView);
    setPayDeductionsValueIsEditable(true);
  };

  const getCleanedPayDeductionsFromSlider = () => {
    // // // console.log("get cleaned number");

    return String(cleanedPayDeductionsSlider);
  };

  //=====

  // monthly expenses

  // let [cleanedExpensesSlider, setCleanedExpensesSlider] = useState(
  //   calculatorUIData.expenses
  // );
  // let [cleanedExpensesText, setCleanedExpensesText] = useState(
  //   calculatorUIData.expenses
  // );
  // let [expensesValueIsEditable, setExpensesValueIsEditable] = useState(false);

  const changeExpenses = (value) => {
    // setCleanedExpensesSlider(value);
    cdispatch(c_changemonthlyitemizedexpensestext(value));
    cdispatch(c_changemonthlyitemizedexpensesslider(value));

    dispatch(changeexpenses(value));
  };

  const slidingStartExpenses = (value: number) => {};

  const slidingCompleteExpenses = (value: number) => {
    // setCleanedExpensesSlider(value);
    cdispatch(c_changemonthlyitemizedexpensestext(value));
    cdispatch(c_changemonthlyitemizedexpensesslider(value));

    dispatch(changeexpenses(value));
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000011,
        event: "slider-expenses",
        description: ["used expenses slider", { value }],
      });
  };

  const OnChangeTextExpenses = (value) => {
    // // // console.log("OnChangeTextExpenses()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    // if (cleanedNumber > 1000) {
    //   cleanedNumber = 1000;
    // }
    cleanedNumber = constrainCleanedNumber(cleanedNumber);
    cdispatch(c_changemonthlyitemizedexpensestext(cleanedNumber));
    // setCleanedExpensesSlider(Number(cleanedNumber));
    cdispatch(c_changemonthlyitemizedexpensesslider(cleanedNumber));
    // setCleanedExpensesText(Number(cleanedNumber));
  };

  const OnSelectionChangeExpenses = () => {
    // // // console.log("OnSelectionChange() Expenses function");
  };

  const OnContentSizeChangeExpenses = () => {
    // // console.log("OnContentSizeChange() Expenses function");
  };

  const OnChangeExpenses = (value) => {
    // // console.log("OnChange() Expenses function");
    // // console.log(value);
  };

  const OnSubmitEditingExpenses = () => {
    // // console.log("OnSubmitEditing() Expenses function");
  };

  const OnEndEditingExpenses = () => {
    // // // console.log("OnEndEditing() Expenses function");

    dispatch(changeexpenses(monthlyitemizedexpensestext)); //questionable
    cdispatch(
      c_changemonthlyitemizedexpensesslider(monthlyitemizedexpensestext)
    );

    setArcMarginTop(fullArcView);

    //setExpensesValueIsEditable(false);
    cdispatch(c_cv_expensesvalueiseditable(false));

    async () =>
      await analytics().logEvent("calculator", {
        id: 10000012,
        event: "text-input-expenses",
        description: [
          "used expenses text input",
          { monthlyitemizedexpensesslider },
        ],
      });
  };

  const OnFocusExpenses = () => {
    // // console.log("OnFocus() Expenses function");
    setArcMarginTop(partialArcView);
    // setExpensesValueIsEditable(true);
    cdispatch(c_cv_expensesvalueiseditable(true));
  };

  const getCleanedExpensesFromSlider = () => {
    // // // console.log("get cleaned number");

    return String(monthlyitemizedexpensesslider);
  };

  const getExpensesTextInput = () => {
    return Number(monthlyitemizedexpensestext);
  };

  const getExpensesIsEditable = () => {
    // // // console.log("get cleaned number");

    let editable: boolean = cv_expenses_editable;
    //// console.log("getBoolEditableValue monthlyitemizedexpenses: " + String(editable))
    return editable;
  };

  // ------------

  // monthly debt

  //-----------
  let [cleanedDebtSlider, setCleanedDebtSlider] = useState(
    calculatorUIData.debt
  );
  let [cleanedDebtText, setCleanedDebtText] = useState(calculatorUIData.debt);
  let [debtValueIsEditable, setDebtValueIsEditable] = useState(false);

  const changeDebt = (value) => {
    setCleanedDebtSlider(value);
    dispatch(changedebt(value));
  };

  const slidingCompleteDebt = (value: number) => {
    setCleanedDebtSlider(value);

    dispatch(changedebt(value));
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000013,
        event: "slider-debt",
        description: ["used debt slider", { value }],
      });
  };

  const OnChangeTextDebt = (value) => {
    // // // console.log("OnChangeTextDebt()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    // if (cleanedNumber > 1000) {
    //   cleanedNumber = 1000;
    // }
    cleanedNumber = constrainCleanedNumber(cleanedNumber);

    setCleanedDebtSlider(Number(cleanedNumber));
    setCleanedDebtText(Number(cleanedNumber));
  };

  const OnSelectionChangeDebt = () => {
    // // // console.log("OnSelectionChange() debt function");
  };

  const OnContentSizeChangeDebt = () => {
    // // console.log("OnContentSizeChange()debt function");
  };

  const OnChangeDebt = (value) => {
    // // console.log("OnChange() debt function");
    // // console.log(value);
  };

  const OnSubmitEditingDebt = () => {
    // // console.log("OnSubmitEditing() debt function");
  };

  const OnEndEditingDebt = () => {
    // // console.log("OnEndEditing() debt function");

    dispatch(changedebt(cleanedDebtText));

    setArcMarginTop(fullArcView);
    setDebtValueIsEditable(false);
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000014,
        event: "text-input-debt",
        description: ["used debt text input", { cleanedDebtSlider }],
      });
  };

  const OnFocusDebt = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialArcView);
    setDebtValueIsEditable(true);
  };

  const getCleanedDebtFromSlider = () => {
    // // // console.log("get cleaned number");

    return String(cleanedDebtSlider);
  };

  //-------------

  //  monthly savings

  let [cleanedSavingsSlider, setCleanedSavingsSlider] = useState(
    calculatorUIData.savings
  );
  let [cleanedSavingsText, setCleanedSavingsText] = useState(
    calculatorUIData.savings
  );
  let [savingsValueIsEditable, setSavingsValueIsEditable] = useState(false);

  const changeSavings = (value) => {
    setCleanedSavingsSlider(value);
    dispatch(changesavings(value));
  };

  const slidingCompleteSavings = (value: number) => {
    setCleanedSavingsSlider(value);

    dispatch(changesavings(value));
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000009,
        event: "slider-savings",
        description: ["used savings slider", { value }],
      });
  };

  const OnChangeTextSavings = (value) => {
    // console.log("OnChangeTextSavings()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    // if (cleanedNumber > 1000) {
    //   cleanedNumber = 1000;
    // }
    cleanedNumber = constrainCleanedNumber(cleanedNumber);

    setCleanedSavingsSlider(Number(cleanedNumber));
    setCleanedSavingsText(Number(cleanedNumber));
    // setCleanedSavingsSlider(Number(cleanedNumber));
  };

  const OnSelectionChangeSavings = () => {
    // console.log("OnSelectionChange() savings function");
  };

  const OnContentSizeChangeSavings = () => {
    // console.log("OnContentSizeChange()savings function");
  };

  const OnChangeSavings = (value) => {
    // console.log("OnChange() savings function");
    // // console.log(value);
  };

  const OnSubmitEditingSavings = () => {
    // console.log("OnSubmitEditing() savings function");
  };

  const OnEndEditingSavings = () => {
    // console.log("OnEndEditing() savings function");

    dispatch(changesavings(cleanedSavingsText));

    setArcMarginTop(fullArcView);
    setSavingsValueIsEditable(false);
    async () =>
      await analytics().logEvent("calculator", {
        id: 10000016,
        event: "text-input-savings",
        description: ["used savings text input", { cleanedSavingsSlider }],
      });
  };

  const OnFocusSavings = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialArcView);
    setSavingsValueIsEditable(true);
  };

  const getCleanedSavingsFromSlider = () => {
    // // // console.log("get cleaned number");

    return String(cleanedSavingsSlider);
  };

  // ----------------

  // income range

  const changeIncomeRange = (value) => {
    // // // console.log(' range text before')
    // // // console.log(value)

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    // // // console.log(' range text after')
    // // // console.log(cleanedNumber)

    // // console.log(
    // "from inside changeIncomeRange: grossincome slider is " +
    //   String(cleanedGrossIncomeSlider)
    // );

    let saveddeductions = cleanedPayDeductionsSlider;
    // // console.log("saved deductions is " + String(saveddeductions))

    setCleanedIncomeRangeText(cleanedNumber);

    if (cleanedGrossIncomeSlider > value) {
      // // console.log("setting gross income slider to " + String(value));
      setCleanedGrossIncomeSlider(value);
      setCleanedGrossIncomeText(value);

      if (cleanedPayDeductionsSlider > value) {
        // // console.log("GREATER setting pay deductions slider to " + String(value));
        setCleanedPayDeductionsSlider(value);
        setCleanedPayDeductionsText(value);
      } else {
        // // console.log("LESSER setting pay deductions slider to " + saveddeductions);
        setCleanedPayDeductionsSlider(saveddeductions);
        //setCleanedPayDeductionsText(saveddeductions)
      }

      // the following need to set up, after we make deductions work.

      if (cleanedDebtSlider > value) {
        // // console.log("setting debt slider to " + String(value));
        setCleanedDebtSlider(value);
        setCleanedDebtText(value);
      }

      if (cleanedExpensesSlider > value) {
        // // console.log("setting expenses slider to " + String(value));
        setCleanedExpensesSlider(value);
        setCleanedExpensesText(value);
      }

      if (cleanedSavingsSlider > value) {
        // // console.log("setting savings slider to " + String(value));
        setCleanedSavingsSlider(value);
        setCleanedSavingsText(value);
      }

      // dispatch(changeincomerange(Number(cleanedNumber)));
    }

    const changeIncomeFromRange = (value) => {
      // // console.log("grossincome is " + String(cleanedGrossIncomeSlider));
      // // console.log("range is " + String(value));
    };
    //dispatch(changegrossincome(value));
  };

  const incrementRange = () => {
    // // console.log(
    //   "increment cleanedIncomeRangeText " + String(cleanedIncomeRangeText)
    // );
    changeIncomeRange(cleanedIncomeRangeText + 5000);
  };

  const decrementRange = () => {
    // // console.log(
    //   "decrement cleanedIncomeRangeText " + String(cleanedIncomeRangeText)
    // );
    changeIncomeRange(cleanedIncomeRangeText - 5000);
  };

  const defaultEvent = () => {
    // replace with individual events as needed
  };

  //-------------

  let [cleanedIncomeRangeText, setCleanedIncomeRangeText] = useState(0);
  // let [incomerangeValueIsEditable, setIncomeRangeValueIsEditable] =
  //   useState(true);

  const OnChangeTextIncomeRange = (value) => {
    // // console.log("OnChangeTextIncomeRange()  function");

    let a: string = String(value);
    let cleanedNumber: number = Number(a.replace(/[^0-9]/g, ""));

    // if (cleanedNumber > 1000) {
    //   cleanedNumber = 1000;
    // }

    //dispatch(changeincomerange(cleanedNumber));
    setCleanedIncomeRangeText(value);
    // // console.log("value = " + String(value));
  };

  const OnSelectionChangeIncomeRange = (value) => {
    // // console.log("OnSelectionChange() incomerange function");
    // // console.log("value = " + String(value));
    // // console.log("-----------------------");
  };

  const OnContentSizeChangeIncomeRange = (value) => {
    // // console.log("OnContentSizeChange()incomerange function");
    // // console.log("value = " + String(value));
  };

  const OnChangeIncomeRange = (value) => {
    // // console.log("OnChange() incomerange function");
    // // console.log("value = " + String(value));
  };

  const OnSubmitEditingIncomeRange = (value) => {
    // // console.log("OnSubmitEditing() incomerange function");
    // // console.log("value = " + String(value));
  };

  const OnEndEditingIncomeRange = (value) => {
    // // console.log("OnEndEditing() incomerange function");
    // // console.log("value = " + String(value));

    setCleanedIncomeRangeText(cleanedIncomeRangeText);
    //dispatch(changeincomerange(cleanedIncomeRangeText));
    //setIncomeRangeValueIsEditable(true);
    changeIncomeRange(cleanedIncomeRangeText);
    // // console.log("============================");
  };

  const OnFocusIncomeRange = (value) => {
    // // console.log("OnFocus() income range function");
    // // console.log("value = " + String(value));
    // setIncomeRangeValueIsEditable(false);
  };

  const getCleanedIncomeRangeFromText = () => {
    // this is where the value of the state is assigned
    // to the UI text field
    // // // console.log("get cleaned income range number");

    return cleanedIncomeRangeText;
  };

  let remainingLabel = renderRemainingSwitch(renderRemaining);
  let whoopsLabel = renderWhoopsSwitch(renderWhoops);
  let rentAmountLabel = renderRentAmountSwitch(renderWhoops);

  // // console.log(
  //   "calculatorUIData.percent_income " + String(calculatorUIData.percent_income)
  // );
  // // console.log(
  //   "calculatorUIData.gross_income " + String(calculatorUIData.gross_income)
  // );

  return (
    <Container>
      {/* <ArcComponentView></ArcComponentView> */}

      {/* <Text>seg state 1 beg {arcData.arc_segment_1_begin}</Text>
      <Text>seg state 1 end {arcData.arc_segment_1_end}</Text> */}

      {/* <CalcSlidersScrollView></CalcSlidersScrollView> */}

      <Container2
        style={{ marginTop: arcMarginTop ? partialArcView : fullArcView }}
      >
        <ArcIconColumn>
          <ArcIconContainerRow>
            <Spacer></Spacer>

            <ArcInfoButtonView />
          </ArcIconContainerRow>
          <Spacer></Spacer>
        </ArcIconColumn>
        {whoopsLabel}
        <ArcTextContainerRow>
          <Spacer></Spacer>

          <ArcTextColumn>
            {rentAmountLabel}

            <ArcDetailsDataRow>
              <ArcDetailsColumn1>
                <ArcDataItemRow>
                  <DataItemCircle color={appColors.rentAmountGreen} />
                  <ArcDataItem>Rent Amount</ArcDataItem>
                </ArcDataItemRow>
                <ArcDataItemRow>
                  <DataItemCircle color={appColors.deductionsAqua} />
                  <ArcDataItem>Deductions</ArcDataItem>
                </ArcDataItemRow>
                <ArcDataItemRow>
                  <DataItemCircle color={appColors.debtBlue} />
                  <ArcDataItem>Debt</ArcDataItem>
                </ArcDataItemRow>
              </ArcDetailsColumn1>

              <Spacer1></Spacer1>

              <ArcDetailsColumn2>
                <ArcDataItemRow>
                  {/* <ArcDataItemIcon>$ {CalculatorState.monthlyRent} </ArcDataItemIcon> */}
                  <ArcDataItemIcon>
                    {/* $ {calculatorCalculationsData.rentAmount}{" "} */}${" "}
                    {Math.round(localRentAmount)}{" "}
                  </ArcDataItemIcon>
                  <ArcDataItem>/month</ArcDataItem>
                </ArcDataItemRow>
                <ArcDataItemRow>
                  <DataItemCircle color={appColors.expensesAqua} />
                  <ArcDataItem>Expenses</ArcDataItem>
                </ArcDataItemRow>
                <ArcDataItemRow>
                  <DataItemCircle color={appColors.savingsGold} />
                  <ArcDataItem>Savings</ArcDataItem>
                </ArcDataItemRow>
              </ArcDetailsColumn2>
            </ArcDetailsDataRow>
          </ArcTextColumn>

          <Spacer></Spacer>
        </ArcTextContainerRow>

        <Container>
          <Text>NEW VERSION</Text>
          <Text>seg 1 begin {arcData.arc_segment_1_begin}</Text>
          <Text>seg 1 end {arcData.arc_segment_1_end}</Text>
          <Text>seg 2 begin {arcData.arc_segment_2_begin}</Text>
          <Text>seg 2 end {arcData.arc_segment_2_end}</Text>
        </Container>
        {/* 
        //  <Container>
        //    <Text>Monthly Leftover</Text>
        //   <Text>{CalculatorState.monthlyLeftOver}</Text>
        // </Container> */}

        <Svg
          width={windowWidth}
          height={modwindowHeight - svgWindowHeightFactor}
          onLayout={onSVGLayout}
        >
          <DisplaySegments></DisplaySegments>
        </Svg>
      </Container2>

      <ViewContainer>
        {remainingLabel}

        <SlidersScrollView>
          {/* <SliderTitleRow>
          <SliderHeader>Monthly Gross Income</SliderHeader>
          <Pressable onPress={() => navigation.navigate("PayDeductions")}>
            <GrossIncomeInfoButtonView />
          </Pressable>
          <Spacer></Spacer>
          <NewGrossIncomeGroup />
          <GrossIncomeTextInput />  
        </SliderTitleRow> */}

          {/* =========== Gross Income  ============ */}

          {/* <GrossIncomeSlider /> */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Gross Income</SliderHeader>
                <Pressable
                  onPress={() => navigation.navigate("Pay Deductions")}
                >
                  <GrossIncomeInfoButtonView />
                </Pressable>
              </TitlePackage>
              <Spacer></Spacer>

              <ViewContainerTextInput>
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:
                  value={getCleanedGrossIncomeFromSlider()}
                  onChangeText={(value) => OnChangeTextGrossIncome(value)}
                  // onSelectionChange={() => OnSelectionChangeGrossIncome()}
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingGrossIncome(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  //  onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={({ nativeEvent: { eventCount, target, text } }) =>
                    OnChangeGrossIncome({
                      nativeEvent: { eventCount, target, text },
                    })
                  }
                  onContentSizeChange={() => OnContentSizeChangeGrossIncome()}
                  // }
                  onFocus={() => OnFocusGrossIncome()}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={grossIncomeValueIsEditable}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor="#AADD00" // "#242423"
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={Number(cleanedGrossIncomeText)}
                onValueChange={(value) => changeSliderGrossIncome(value)}
                // events:
                // onSlidingStart={(value) => slidingStartGrossIncome(value)}
                onSlidingComplete={(value) => slidingCompleteGrossIncome(value)}
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          {/* =========== Range  ============ */}

          {/* <GrossIncomeRANGESlider /> */}
          {/* <ViewContainerRange>
            <RangeChangeRow>
              <Spacer />
              <Pressable onPress={() => decrementRange()}>
                <InfoButtonContainer>
                  <Ionicons
                    name="remove-circle"
                    size={20}
                    color="#0A649D"
                  ></Ionicons>
                </InfoButtonContainer>
              </Pressable>
              <ViewContainerTextInput>
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:d
                  value={String(getCleanedIncomeRangeFromText())}
                  onChangeText={(value) => OnChangeTextIncomeRange(value)}
                  onSelectionChange={(value) =>
                    OnSelectionChangeIncomeRange(value)
                  }
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingIncomeRange(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  // onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={(value) => OnChangeIncomeRange(value)}
                  onContentSizeChange={(value) =>
                    OnContentSizeChangeIncomeRange(value)
                  }
                  onFocus={(value) => OnFocusIncomeRange(value)}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                  onSubmitEditing={(value) => OnSubmitEditingIncomeRange(value)}
                />
              </ViewContainerTextInput>

              <Pressable onPress={() => incrementRange()}>
                <InfoButtonContainer>
                  <Ionicons
                    name="add-circle"
                    size={20}
                    color="#0A649D"
                  ></Ionicons>
                </InfoButtonContainer>
              </Pressable>
            </RangeChangeRow>
          </ViewContainerRange> */}

          <GraybarContainer>
            <GraybarThick></GraybarThick>
          </GraybarContainer>

          {/* =========== Percent Income  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>% of Income to Rent</SliderHeader>
                <PercentIncomeInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerPercentLabel>
                <PercentLabel>{percentOfGrossIncome} %</PercentLabel>
              </ViewContainerPercentLabel>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                minimumValue={0}
                maximumValue={100}
                step={10}
                style={{ width: 350, height: 40 }}
                minimumTrackTintColor={sliderPercentColor}
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={percentOfGrossIncome}
                onValueChange={(value) => changePercentIncome(value)}
                // events:
                // onSlidingStart={(value) => slidingStart(value)}
                onSlidingComplete={(value) =>
                  slidingCompletePercentIncome(value)
                }
              />
            </SliderWrapper>
          </ViewContainerLeftPad>
          <ComfortableRentText>{renterFeedbackText}</ComfortableRentText>

          <GraybarContainer>
            <GraybarThin></GraybarThin>
          </GraybarContainer>

          {/* =========== Pay Deductions  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Pay Deductions</SliderHeader>
                <DeductionsInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerTextInput>
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:
                  value={getCleanedPayDeductionsFromSlider()}
                  onChangeText={(value) => OnChangeTextPayDeductions(value)}
                  onSelectionChange={() => OnSelectionChangeGrossIncome()}
                  onSubmnit
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingPayDeductions(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  // onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={({ nativeEvent: { eventCount, target, text } }) =>
                    OnChangePayDeductions({
                      nativeEvent: { eventCount, target, text },
                    })
                  }
                  // onContentSizeChange={(value) =>
                  //   OnContentSizeChangeGrossIncome()
                  // }
                  onFocus={() => OnFocusPayDeductions()}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={payDeductionsValueIsEditable}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor="#AADD00" // "#242423"
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={Number(cleanedPayDeductionsText)}
                onValueChange={(value) => changePayDeductions(value)}
                // events:
                // onSlidingStart={(value) => slidingStartGrossIncome(value)}
                onSlidingComplete={(value) =>
                  slidingCompletePayDeductions(value)
                }
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          <Pressable onPress={() => navigation.navigate("Pay Deductions")}>
            <DeductionsText>Where are my deductions</DeductionsText>
          </Pressable>

          {/* =========== Monthly Debt  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Debt</SliderHeader>
                <DebtInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerTextInput>
                {/* <Text>{calculatorUIData.debt}</Text> */}
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:
                  value={getCleanedDebtFromSlider()}
                  onChangeText={(value) => OnChangeTextDebt(value)}
                  // onSelectionChange={() => OnSelectionChangeGrossIncome()}
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingDebt(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  // onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={(value) => OnChangeDebt(value)}
                  // onContentSizeChange={(value) =>
                  //   OnContentSizeChangeGrossIncome()
                  // }
                  onFocus={() => OnFocusDebt()}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={debtValueIsEditable}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor="#AADD00" // "#242423"
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={Number(cleanedDebtText)}
                onValueChange={(value) => changeDebt(value)}
                // events:
                // onSlidingStart={(value) => slidingStartGrossIncome(value)}
                onSlidingComplete={(value) => slidingCompleteDebt(value)}
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          {/* =========== monthly expenses  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Expenses</SliderHeader>
                <ExpensesInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerTextInput>
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:
                  value={getCleanedExpensesFromSlider()}
                  onChangeText={(value) => OnChangeTextExpenses(value)}
                  // onSelectionChange={() => OnSelectionChangeGrossIncome()}
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingExpenses(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  // onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={(value) => OnChangeExpenses(value)}
                  // onContentSizeChange={(value) =>
                  //   OnContentSizeChangeGrossIncome()
                  // }
                  onFocus={() => OnFocusExpenses()}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={getExpensesIsEditable()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 2} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor="#AADD00" // "#d1d14a"
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={getExpensesTextInput()}
                onValueChange={(value) => changeExpenses(value)}
                // events:
                onSlidingStart={(value) => slidingStartExpenses(value)}
                onSlidingComplete={(value) => slidingCompleteExpenses(value)}
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          <Pressable onPress={() => navigation.navigate("Itemized Expenses")}>
            <ExpensesText>Itemized Expenses</ExpensesText>
          </Pressable>

          {/* =========== monthly savings  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Savings</SliderHeader>
                <SavingsInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerTextInput>
                <SliderTextInput
                  textAlignVertical="top" // or top
                  textAlignHorizontal="right"
                  placeholder="0000"
                  defaultValue="0"
                  keyboardType="number-pad"
                  step={10}
                  //redux values:
                  value={getCleanedSavingsFromSlider()}
                  onChangeText={(value) => OnChangeTextSavings(value)}
                  // onSelectionChange={() => OnSelectionChangeGrossIncome()}
                  // everthing else (placeholders)
                  onEndEditing={(value) => OnEndEditingSavings(value)}
                  // onPressIn={(value) => OnPressIn(value)}
                  // onPressOut={(value) => OnPressOut(value)}
                  // onLayout={(value) => OnLayout(value)}
                  // onBlur={(value) => OnBlur(value)}
                  // native:
                  onChange={(value) => OnChangeSavings(value)}
                  // onContentSizeChange={(value) =>
                  //   OnContentSizeChangeGrossIncome()
                  // }
                  onFocus={() => OnFocusSavings()}
                  // onKeyPress={() => OnKeyPress()}
                  // onScroll={() => OnScroll()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={savingsValueIsEditable}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor="#AADD00" // "#242423"
                maximumTrackTintColor="000000"
                thumbTintColor={Platform.select({
                  android: appColors.keyboardGray,
                })}
                //redux values:
                value={Number(cleanedSavingsText)}
                onValueChange={(value) => changeSavings(value)}
                // events:
                // onSlidingStart={(value) => slidingStartGrossIncome(value)}
                onSlidingComplete={(value) => slidingCompleteSavings(value)}
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          <BottomSpacer />

          {/* <SliderTitleRow>
          <SliderHeader>% of Income to Rent</SliderHeader>
          <InfoButtonView />
          <Spacer></Spacer>
          <SliderTextInput> </SliderTextInput>
        </SliderTitleRow>
        <CalcSlider />
        <ComfortableRentText>
          Your rent should fit comfortably in your budget
        </ComfortableRentText>

       */}
        </SlidersScrollView>
      </ViewContainer>
    </Container>
  );
}

export default connect(select, mapDispatchToProps)(CalculatorView);

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

const PathContainer = styled.View`
  height: 300px;
  width: 300px;
`;

const ArcDetailsDataRow = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;
  flex: 1;
`;

const Spacer1 = styled.View`
  width: 20px;
`;

const ArcTextContainerRow = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  padding-top: 40px;
  flex: 1;
`;

const ArcDetailsColumn1 = styled.View`
  flex-direction: column;
`;

const ArcDetailsColumn2 = styled.View`
  flex-direction: column;
`;

const ArcDataItemRow = styled.View`
  flex-direction: row;
  flex: 1;
`;
const ArcDataItemIcon = styled.Text``;
const ArcDataItem = styled.Text``;

/* Text Layer */
const ArcTitle = styled(typography.mediumTextStyle)`
  width: 200px;
  text-align: center;
`;

const WhoopsTitle = styled(typography.mediumTextBold)`
  text-align: center;
`;
const CompleteWhoopsTitle = styled(typography.mediumTextStyle)`
  text-align: center;
`;

const IconName = styled.Text`
  color: blue;
  padding-top: 20px;
`;

const ArcTextRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const ArcIconContainerRow = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  z-index: 2000;
  padding-right: 15px;
  padding-top: 10px;
`;

const ArcTextColumn = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ArcIconColumn = styled.View`
  flex: 1;
  flex-direction: column;
`;

/*Arc Layer*/

const SVGView = styled.View``;

const Spacer = styled.View`
  flex: 1;
`;

const RowText = styled.Text`
  flex: 1;
`;

const Container2 = styled.View`
  justify-content: center;
  background-color: white;
`;

const ArcRow = styled.View`
  flex-direction: row;
`;

// from calcsliderscrollview

const BottomSpacer = styled.View`
  height: 50px;
`;

const SliderTextInput = styled.TextInput`
  /* border: 10px blue; */
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  text-align: right;

  width: 70px;
  height: 30px;
  color: black;
  display: flex;

  height: ${Platform.select({ ios: "30px", android: "25px" })};
  border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
`; // change height of

const ComfortableRentText = styled.View`
  padding-bottom: 20px;
  padding-left: 20px;
`;

const RentText = styled.Text``;

const DeductionsText = styled.Text`
  color: blue;
  padding-bottom: 20px;
  padding-left: 20px;
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
const SliderMoveView = styled.View`
  padding-horizontal: 10px;
  background-color: white;
  height: 50px;
  justify-content: center;
`;

const SliderMessageText = styled.Text`
  padding-top: 6px;
  background-color: lightgray;
  height: 30px;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 10;
  text-align: center;
`;

const ScrollRowView = styled.View``;

const ViewContainer = styled.View`
  justify-content: center;
  flex: 1;
`;
const SliderHeader = styled.Text`
  color: black;
  /* border-color: blue;
  border-width: 1px; */
`;

const SliderTitleRow = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  flex: 1;
  padding-bottom: 10px;
  /* border-color: lightgray;
  border-width: 1px; */
`;

const TitlePackage = styled.View`
  flex-direction: row;
  width: 200px;
  /* border-color: red;
  border-width: 1px; */
`;

// const Spacer = styled.Text`
//   /* border: red; */
//   flex: 1;
// `;

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

const MediumText = styled(typography.mediumTextBold)`
  justify-content: center;
  align-self: center;
  color: ${appColors.fannieBlue};
  padding-vertical: 10px;
`;

const SmallText = styled(typography.smallTextStyle)`
  color: ${appColors.fannieBlack};
`;

const SmallBoldText = styled(typography.smallTextBold)`
  color: ${appColors.fannieBlack};
`;

// const RowText = styled.View`
// flex-direction: row;
// flex: 1
// `

// percent slider

const SliderWrapper = styled.View`
  margin: 0px;
  height: 40px;
  padding-left: 15px;
  justify-content: center;
`;

const ViewContainerPercentLabel = styled.View`
  justify-content: center;
  flex: 1;
  /* border-color: blue;
  border-width: 1px; */
  width: 70px;
`;
const PercentLabel = styled.Text`
  /* border-color: orange;
  border-width: 1px; */
  text-align: right;
  width: 70px;
`;

const ViewContainerTextInput = styled.View`
  justify-content: center;
  flex: 1;
`;

//this controls je

const ViewContainerLeftPad = styled.View`
  /* border-color: green;
  border-width: 5px; */
`;

const ViewContainerRange = styled.View`
  justify-content: center;
  flex: 1;
`;

const RangeChangeRow = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  padding-right: 30px;
`;
const InfoButtonContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;

const RedArcView = styled.View`
  flex: 1;
`;
const RedArcPathView = styled.View``;

const ArcTextPackage = styled.View`
  flex-direction: column;
`;

const WhoopsPackage = styled.View`
  z-index: 4000;
  align-self: center;
`;

const ArcTitleFrame = styled.View`
  border-color: ${appColors.fannieBlack};
  border-width: 0.5px;
  margin-top: 1px;
  width: ${windowWidth}px;
  height: 60px;
  z-index: 3000;
  background-color: white;
`;

const WhoopsRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: ${windowWidth}px;
  text-align: center;
`;
