import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  Platform,
  useWindowDimensions,
  Dimensions,
  View,
  Text,
  Pressable,
  PixelRatio,
  Share,
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
// import ExpensesSlider from "../sliders/expenses/ExpensesSlider";
// import ExpensesTextInput from "../sliders/expenses/ExpensesTextInput";
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
  changecellphonebill,
  changegroceriesanddining,
  changeinsurance,
  changeotherexpenses,
  changesubscriptionservices,
  changetransportation,
  changeutilities,
} from "../../../redux/actions/actions";

import {
  c_changemonthlyitemizedexpensesslider,
  c_changemonthlyitemizedexpensestext,
  c_cv_expensesvalueiseditable,
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
} from "../itemizedexpenses/ExpensesActions";

import { positiveSliderMove } from "../../calculator/itemizedexpenses/functions/PositiveMove";
import { negativeSliderMove } from "../../calculator/itemizedexpenses/functions/NegativeMove";
import { updateItems } from "../../calculator/itemizedexpenses/functions//UpdateItems";

import { knobImage } from "../itemizedexpenses/functions/KnobImage";
import { isEqual } from "@react-spring/shared";
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
  const [calcAnalytics, setCalcAnalytics] = useState();

  let {
    monthlyitemizedexpensestext,
    monthlyitemizedexpensesslider,
    cv_expenses_editable,
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

  let s = state;

  let { expenses } = calculatorUIData;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log("usefocus on calcview");
  //     cdispatch(c_changemonthlyitemizedexpensesslider(String(monthlyitemizedexpensestext)));
  //   }, [monthlyitemizedexpensestext, monthlyitemizedexpensesslider])
  // );

  useEffect(() => {
    analytics()
      .logEvent("Calcultr_MainPg_Arrived", {
        id: 20000002,
        event: "arrived on calculator page",
        description: "arrived on calculator",
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log("#003 calcanalytics ", calcAnalytics);
  }, [calcAnalytics]);

  useEffect(() => {
    // init react context from redux
    cdispatch(c_changemonthlyitemizedexpensesslider(calculatorUIData.expenses));
    cdispatch(c_changemonthlyitemizedexpensestext(calculatorUIData.expenses));

    cdispatch(c_changeotherexpensesslider(calculatorUIData.cellphonebill));
    cdispatch(c_changeotherexpensestext(calculatorUIData.cellphonebill));

    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
    cdispatch(c_changecellphonebillslider(calculatorUIData.cellphonebill));
  }, []);

  useEffect(() => {
    analytics();
    if (CalculatorState.monthlyLeftOver >= 0) {
      //console.log("Calcultr_MainPg_Arc_Segment_View")
      analytics()
        .logEvent("Calcultr_MainPg_Arc_Segment_View", {
          id: 10000002,
          event: "calculator_segmentedarc",
          description: ["show segmented arc with income portions"],
        })
        .catch((err) => console.log(err));
    } else {
      // console.log("Calcultr_MainPg_Arc_Red_View")
      analytics()
        .logEvent("Calcultr_MainPg_Arc_Red_View", {
          id: 10000002,
          event: "calculator_segmentedarc",
          description: ["show segmented arc with income portions"],
        })
        .catch((err) => console.log(err));
    }
  }, [CalculatorState.monthlyLeftOver]);

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

  // useEffect ?? was there ever anything here, check a few weeks ago

  const DisplaySegments = (props) => {
    if (everythingIsZero()) {
      analytics()
        .logEvent("Calcultr_MainPg_Arc_Gray_View", {
          id: 10000003,
          event: "calculator_grayarc",
          description: ["show gray arc in all fields = zero state"],
        })
        .catch((err) => console.log(err));

      setRenderWhoops(false);
      return (
        // <View><Text>Hello there</Text></View>
        <View>
          <Path
            fill="none"
            stroke={appColors.grayNeutral}
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
              0,
              180
            )}
          />
        </View>
      );
    } else if (CalculatorState.monthlyLeftOver >= 0) {
      // analytics()
      // moved analytics to useEffect

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
      // analytics()
      // moved analytics to useEffect

      setRenderWhoops(true);
      return (
        <RedArcView>
          <RedArcPathView>
            <Path
              fill="none"
              stroke={appColors.spentTooMuchMaroonRed}
              strokeWidth={30}
              strokeLinecap="square"
              d={drawArc(
                windowWidth * 0.5,
                svgsize.height,
                Platform.OS === "ios"
                  ? svgsize.height * 0.81
                  : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
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
            strokeWidth={30}
            strokeLinecap="square"
            d={drawArc(
              windowWidth * 0.5,
              svgsize.height,
              Platform.OS === "ios"
                ? svgsize.height * 0.81
                : svgsize.height * 0.8,
              SegmentsState.segment6Start,
              SegmentsState.segment6End
            )}
          />
        </View>
      );
    } else return null;
  };

  const shareMessage = async () => {
    const options = {
      title: "Sharing!",
      message: "Hello, world, we're sharing messages",
    };

    const response = await Share.share(options);
  };

  const shareiOSURL = async () => {
    const options = {
      title: "Sharing!",
      url: "https://www.fanniemae.com",
    };

    const response = await Share.share(options);
  };

  const shareAndroidURL = async () => {
    const options = {
      title: "Sharing!",
      message: "The Fannie Mae URL: " + "https://www.fanniemae.com",
    };

    const response = await Share.share(options);
  };

  const shareMultipleLinesMessage = async () => {
    const options = {
      title: "Sharing!",
      message: "Multiple \nlines message",
    };

    const response = await Share.share(options);
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
    if (cleanedNumber > 1000) {
      return 1000;
    } else {
      return cleanedNumber;
    }
  };

  const constrainIncomeCleanedNumber = (cleanedNumber: number) => {
    if (cleanedNumber > 10000) {
      return 10000;
    } else {
      return cleanedNumber;
    }
  };

  const constrainCleanedExpenses = (cleanedNumber: number) => {
    if (cleanedNumber > 5000) {
      return 5000;
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
              <ArcTitleAmount>
                $ {Math.round(cleanedGrossIncomeSlider)}/month
              </ArcTitleAmount>

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
            <RedArcTextRow>
              <Spacer></Spacer>
              <ArcTitleFrame>
                <Spacer></Spacer>
                <WhoopsRow>
                  <Spacer></Spacer>
                  <WhoopsTitle>Whoops! </WhoopsTitle>
                  <CompleteWhoopsTitle>
                    Your inputs exceeded your monthly income
                  </CompleteWhoopsTitle>
                  <Spacer></Spacer>
                </WhoopsRow>
              </ArcTitleFrame>
            </RedArcTextRow>
          </WhoopsPackage>
        );
    }
  };

  let partialMarginTop = true;
  let fullMarginTop = false;

  const fullArcView = renderWhoops ? -20 : -20;
  // const partialArcView = -20;
  const partialArcView = renderWhoops ? -100 : -100;

  let [arcMarginTop, setArcMarginTop] = useState(fullMarginTop);

  const renderRemainingSwitch = (param) => {
    //

    switch (param) {
      case true:
        return (
          <SliderMessageView>
            <SliderMessageViewTextContainer>
              <SliderMessageText>You will have</SliderMessageText>
              <SliderMessageTextBold>
                {" "}
                ${Math.round(localLeftOver)}{" "}
              </SliderMessageTextBold>
              <SliderMessageText>remaining.</SliderMessageText>
            </SliderMessageViewTextContainer>
          </SliderMessageView>
        );
      case false:
        return (
          <SliderMoveView>
            <SliderMessageViewTextContainer>
              <SliderMessageText>Move</SliderMessageText>
              <SliderMessageTextBold> all sliders below </SliderMessageTextBold>
              <SliderMessageText>to see what you can afford.</SliderMessageText>
            </SliderMessageViewTextContainer>
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
        return (
          <RowView>
            <CoinsIcon
              source={require("../../../../assets/CalcIcons/coins.png")}
            />

            <RowText>
              {"  "}
              <SmallText>Your rent should fit </SmallText>
              <SmallBoldText>comfortably</SmallBoldText>
              <SmallText> in your budget.</SmallText>
            </RowText>
          </RowView>
        );
        break;
      case 40:
        return (
          <RowText>
            <CoinsIcon
              source={require("../../../../assets/CalcIcons/coins.png")}
            />
            {"  "}
            <SmallText>You will be </SmallText>
            <SmallBoldText>rent burdened</SmallBoldText>
            <SmallText> by the cost.</SmallText>
          </RowText>
        );
        break;
      case 50:
      case 60:
      case 70:
      case 80:
      case 90:
      case 100:
        return (
          <RowText>
            <CoinsIcon
              source={require("../../../../assets/CalcIcons/coins.png")}
            />
            {"  "}
            <SmallText>You will be </SmallText>
            <SmallBoldText>severely rent burdened</SmallBoldText>
            <SmallText> by the cost.</SmallText>
          </RowText>
        );
        break;
      default:
        return <Text>No Logo</Text>;
        break;
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

    analytics().logEvent("Calcultr_MainPg_Income_Slider_Move", {
      id: 10000007,
      event: "slider-changed-grossincome",
      description: ["used gross income slider", { value }],
    });

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
  };

  const OnChangeTextGrossIncome = (value) => {
    // console.log("OnChangeTextGrossIncome() function");

    let a: string = String(value);

    if (a == "") {
      a = "0";
    }
    let cleanedNumber = Number(a.replace(/[^0-9]/g, ""));

    cleanedNumber = constrainIncomeCleanedNumber(cleanedNumber);
    // // console.log("cleaned gross income in change text: " + String(cleanedNumber))

    // the text input picks up it's displayed value from slider
    // so value in text input as you type won't stick with out this line:
    setCleanedGrossIncomeSlider(Number(cleanedNumber));

    // just to keep the number up to date.
    setCleanedGrossIncomeText(Number(cleanedNumber));

    analytics().logEvent("Calcultr_MainPg_Income_Text_Change", {
      id: 10000008,
      event: "text-input-changed-grossincome",
      description: [
        "used gross income text input",
        { cleanedGrossIncomeSlider },
      ],
    });
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

    setArcMarginTop(fullMarginTop);
    setGrossIncomeValueIsEditable(false);
  };

  const OnFocusGrossIncome = () => {
    // console.log("OnFocus() gross income function");

    setArcMarginTop(partialMarginTop);
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
    switch (value) {
      case 0:
      case 10:
      case 20:

      case 30:
        //console.log("<=30%")
        analytics().logEvent("Calcultr_MainPg_PercentSlider_LTE30", {
          id: 10000004,
          event: "percent<=30",
          description: ["rent fits comfortably in budget"],
        });

        break;
      case 40:
        //console.log("40%")
        analytics().logEvent("Calcultr_MainPg_PercentSlider_EQ40", {
          id: 10000005,
          event: "percent=40",
          description: ["rent exceeds budget"],
        });

        break;
      case 50:
      case 60:
      case 70:
      case 80:
      case 90:
      case 100:
        //console.log(">=50%")
        analytics().logEvent("Calcultr_MainPg_PercentSlider_GTE50", {
          id: 10000006,
          event: "percent>=50",
          description: ["rent SEVERElY exceeds budget"],
        });

        break;
      default:
        break;
    }
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

    analytics().logEvent("Calcultr_MainPg_Deducts_Slider_Move", {
      id: 10000009,
      event: "slider-changed-deductions",
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

    analytics().logEvent("Calcultr_MainPg_Deducts_Text_Change", {
      id: 10000010,
      event: "text-input-changed-deductions",
      description: [
        "used deductions text input",
        { cleanedPayDeductionsSlider },
      ],
    });
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

    setArcMarginTop(fullMarginTop);
    setPayDeductionsValueIsEditable(false);
  };

  const OnFocusPayDeductions = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialMarginTop);
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

  let [initialMexTotalValue, setInitialMexTotalValue] = useState(0);

  let [initialOexItemValue, setInitialOexItemValue] =
    useState(otherexpensesslider);
  let [initialCellpItemValue, setInitialCellpItemValue] =
    useState(cellphonebillslider);
  let [initialInsItemValue, setInitialInsItemValue] = useState(insuranceslider);
  let [initialGroItemValue, setInitialGroItemValue] = useState(
    groceriesanddiningslider
  );
  let [initialSubItemValue, setInitialSubItemValue] = useState(
    subscriptionservicesslider
  );
  let [initialUtiItemValue, setInitialUtiItemValue] = useState(utilitiesslider);
  let [initialTraItemValue, setInitialTraItemValue] =
    useState(transportationslider);

  let [lastCleanedNumberExpenses, setLastCleanedNumberExpenses] = useState(0);

  // const numberOfItemizedExpenseTypes: number = 7;
  // const halfrange = CalculatorState.grossIncomeRange / 2
  // const tenthrange = CalculatorState.grossIncomeRange / 10

  const positiveSliderMove2 = (
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
    let part = Math.ceil(difference / numberOfItemizedExpenseTypes / 1) * 1;
    let realpart = difference / numberOfItemizedExpenseTypes;

    // console.log("slider positive part is " + String(part));
    // console.log("slider positive realpart is " + String(realpart));

    // console.log(
    //   "initialOexItemValue in positiveSlider move",
    //   initialOexItemValue
    // );

    // setInitialOexItemValue(initialOexItemValue + 10)

    // if the new positive value is less than the limit
    // update as usual, nothing special
    // BUT if the new positive value is greater than the limit
    // do other things

    if (value <= halfrange) {
      // console.log("updateitems 002");
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
        positivebucket
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

  const changeExpenses = (value) => {
    // console.log("======= sliding change expenses ======= ");
    // console.log("before initialOexItemValue set", initialOexItemValue);

    // console.log("after initialOexItemValue set", initialOexItemValue);

    cdispatch(c_changemonthlyitemizedexpensestext(value));
    cdispatch(c_changemonthlyitemizedexpensesslider(value));

    dispatch(changeexpenses(value));

    // console.log("value ", value);
    // console.log("initialMexTotalValue", initialMexTotalValue);

    // if we're positive
    if (value > initialMexTotalValue) {
      // console.log("positive slider move 2 oex", initialOexItemValue);

      positiveSliderMove2(
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

  const slidingStartExpenses = (value: number) => {
    // console.log("======= sliding start expenses ======= ");

    // we've just started the slide, save the first value
    setInitialMexTotalValue(Number(monthlyitemizedexpensesslider));
    setInitialOexItemValue(Number(otherexpensesslider));
    setInitialCellpItemValue(Number(cellphonebillslider));
    setInitialInsItemValue(Number(insuranceslider));
    setInitialGroItemValue(Number(groceriesanddiningslider));
    setInitialSubItemValue(Number(subscriptionservicesslider));
    setInitialUtiItemValue(Number(utilitiesslider));
    setInitialTraItemValue(Number(transportationslider));

    // console.log(" initial oex ", initialOexItemValue);
    // console.log("otherexpensesslider", otherexpensesslider);
    // console.log("otherexpensestext", otherexpensestext);

    // console.log("======= FINISH sliding start expenses ======= ");
  };

  const slidingCompleteExpenses = (value: number) => {
    // setCleanedExpensesSlider(value);
    // console.log("======= sliding complete expenses ======= ");

    // cdispatch(c_changemonthlyitemizedexpensestext(value));
    // cdispatch(c_changemonthlyitemizedexpensesslider(value));

    // dispatch(changeexpenses(value));

    analytics().logEvent("Calcultr_MainPg_Expense_Slider_Move", {
      id: 10000011,
      event: "slider-changed-expenses",
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
    cleanedNumber = constrainCleanedExpenses(cleanedNumber);
    // cdispatch(c_changemonthlyitemizedexpensestext(cleanedNumber));
    // // setCleanedExpensesSlider(Number(cleanedNumber));
    // cdispatch(c_changemonthlyitemizedexpensesslider(cleanedNumber));
    // // setCleanedExpensesText(Number(cleanedNumber));
    cdispatch(c_changemonthlyitemizedexpensesslider(cleanedNumber));
    cdispatch(c_changemonthlyitemizedexpensestext(cleanedNumber));
    setLastCleanedNumberExpenses(cleanedNumber);

    analytics().logEvent("Calcultr_MainPg_Expense_Text_Change", {
      id: 10000012,
      event: "text-input-changed-expenses",
      description: [
        "used expenses text input",
        { monthlyitemizedexpensesslider },
      ],
    });
  };

  const OnSelectionChangeExpenses = () => {
    // // // console.log("OnSelectionChange() Expenses function");
  };

  const OnContentSizeChangeExpenses = () => {
    // // console.log("OnContentSizeChange() Expenses function");
  };

  // const OnChangeExpenses = (value) => {
  //   // // console.log("OnChange() Expenses function");
  //   // // console.log(value);
  // };

  const OnSubmitEditingExpenses = () => {
    // // console.log("OnSubmitEditing() Expenses function");
  };

  const numberOfItemizedExpenseTypes: number = 7;
  const halfrange = CalculatorState.grossIncomeRange / 2;
  const tenthrange = CalculatorState.grossIncomeRange / 10;

  const OnEndEditingExpenses = () => {
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

    if (lastCleanedNumberExpenses > initialMexTotalValue) {
      let positivebucket = 0;

      if (lastCleanedNumberExpenses > halfrange) {
        lastCleanedNumberExpenses = halfrange;
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
        if (positivebucket >= lastCleanedNumberExpenses) {
          break;
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumins + 1 <= tenthrange) {
            itemsumins += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumgro + 1 <= tenthrange) {
            itemsumgro += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumuti + 1 <= tenthrange) {
            itemsumuti += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumtra + 1 <= tenthrange) {
            itemsumtra += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumsub + 1 <= tenthrange) {
            itemsumsub += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
          if (itemsumcell + 1 <= tenthrange) {
            itemsumcell += 1;
            positivebucket += 1;
          }
        }

        if (positivebucket + 1 <= lastCleanedNumberExpenses) {
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
        if (negativebucket <= lastCleanedNumberExpenses) {
          break;
        }

        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumins - 1 >= 0) {
            itemsumins -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumgro - 1 >= 0) {
            itemsumgro -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumuti - 1 >= 0) {
            itemsumuti -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumtra - 1 >= 0) {
            itemsumtra -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumsub - 1 >= 0) {
            itemsumsub -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
          if (itemsumcell - 1 >= 0) {
            itemsumcell -= 1;
            negativebucket -= 1;
          }
        }
        if (negativebucket - 1 >= lastCleanedNumberExpenses) {
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

    setArcMarginTop(fullMarginTop);

    //setExpensesValueIsEditable(false);
    cdispatch(c_cv_expensesvalueiseditable(false));
  };

  const OnFocusExpenses = () => {
    // // console.log("OnFocus() Expenses function");
    setArcMarginTop(partialMarginTop);
    // setExpensesValueIsEditable(true);
    cdispatch(c_cv_expensesvalueiseditable(true));

    setInitialMexTotalValue(Number(monthlyitemizedexpensestext));
    setInitialOexItemValue(Number(otherexpensesslider));
    setInitialCellpItemValue(Number(cellphonebillslider));
    setInitialInsItemValue(Number(insuranceslider));
    setInitialGroItemValue(Number(groceriesanddiningslider));
    setInitialSubItemValue(Number(subscriptionservicesslider));
    setInitialUtiItemValue(Number(utilitiesslider));
    setInitialTraItemValue(Number(transportationslider));
  };

  const getCleanedExpensesFromSlider = () => {
    // get from redux
    //// console.log("get cleaned expenses slider", monthlyitemizedexpensesslider);

    return String(monthlyitemizedexpensesslider);
  };

  const getExpensesTextInput = () => {
    // get from redux
    //// console.log("get cleaned expenses text", monthlyitemizedexpensestext);
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

    analytics().logEvent("Calcultr_MainPg_Debt_Slider_Move", {
      id: 10000013,
      event: "slider-changed-debt",
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

    analytics().logEvent("Calcultr_MainPg_Debt_Text_Change", {
      id: 10000014,
      event: "text-input-changed-debt",
      description: ["used debt text input", { cleanedDebtSlider }],
    });
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

    setArcMarginTop(fullMarginTop);
    setDebtValueIsEditable(false);
  };

  const OnFocusDebt = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialMarginTop);
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

    analytics().logEvent("Calcultr_MainPg_Savings_Slider_Move", {
      id: 10000015,
      event: "slider-changed-savings",
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
    analytics().logEvent("Calcultr_MainPg_Savings_Text_Change", {
      id: 10000016,
      event: "text-input-changed-savings",
      description: ["used savings text input = ", { cleanedSavingsSlider }],
    });
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

    setArcMarginTop(fullMarginTop);
    setSavingsValueIsEditable(false);
  };

  const OnFocusSavings = () => {
    // // console.log("OnFocus() gross income function");
    setArcMarginTop(partialMarginTop);
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
  let rentAmountLabel = renderRentAmountSwitch(false);

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
        {/* {whoopsLabel} */}
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
                    {Math.round(localRentAmount)}
                  </ArcDataItemIcon>
                  <ArcDataItemBold>/month</ArcDataItemBold>
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
          <Text>Does this every show</Text>
          <Text>segg 1 begin {arcData.arc_segment_1_begin}</Text>
          <Text>segg 1 end {arcData.arc_segment_1_end}</Text>
          <Text>segg 2 begin {arcData.arc_segment_2_begin}</Text>
          <Text>segg 2 end {arcData.arc_segment_2_end}</Text>
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
                  {/* <TestMessageButton /> */}
                </Pressable>
              </TitlePackage>
              <Spacer></Spacer>

              <ViewContainerTextInput>
                <DollarText>$</DollarText>
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

            {/* <SliderTitleRow>
              <Text>{PixelRatio.getPixelSizeForLayoutSize(16)}</Text>
              <Text> : </Text>
              <Text>{PixelRatio.getPixelSizeForLayoutSize(18)}</Text>
            </SliderTitleRow> */}

            <SliderWrapper>
              <Slider
                disabled={grossIncomeValueIsEditable}
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor={appColors.brandColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
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
                {/* <PercentIncomeInfoButtonView /> */}
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerPercentLabel>
                <PercentLabel>{percentOfGrossIncome} %</PercentLabel>
              </ViewContainerPercentLabel>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={100}
                step={10}
                style={{ width: 350, height: 40 }}
                minimumTrackTintColor={sliderPercentColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
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
                <DollarText>$</DollarText>
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
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor={appColors.brandColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
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

          <DeductionsRowView>
            <Pressable onPress={() => navigation.navigate("Pay Deductions")}>
              <RowTextContainer>
                <DollarIcon
                  source={require("../../../../assets/CalcIcons/bank-note.png")}
                />
                {"  "}
                <DeductionsText>Where are my deductions</DeductionsText>
              </RowTextContainer>
            </Pressable>
          </DeductionsRowView>
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
                <DollarText>$</DollarText>
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
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor={appColors.brandColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
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
                <DollarText>$</DollarText>
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
                  onEndEditing={(value) => OnEndEditingExpenses(value)}
                  onFocus={() => OnFocusExpenses()}
                />
              </ViewContainerTextInput>
            </SliderTitleRow>

            <SliderWrapper>
              <Slider
                disabled={getExpensesIsEditable()}
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 2} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor={appColors.brandColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
                //redux values:
                value={getExpensesTextInput()}
                onValueChange={(value) => changeExpenses(value)}
                // events:
                onSlidingStart={(value) => slidingStartExpenses(value)}
                onSlidingComplete={(value) => slidingCompleteExpenses(value)}
              />
            </SliderWrapper>
          </ViewContainerLeftPad>

          <ExpensesRowView>
            <Pressable onPress={() => navigation.navigate("Itemized Expenses")}>
              <RowTextContainer>
                <Ionicons name="pencil" size={14} color="#0A649D"></Ionicons>
                {"  "}
                <ExpensesText>Itemized Expenses</ExpensesText>
              </RowTextContainer>
            </Pressable>
          </ExpensesRowView>

          {/* =========== monthly savings  ============ */}
          <ViewContainerLeftPad>
            <SliderTitleRow>
              <TitlePackage>
                <SliderHeader>Monthly Savings</SliderHeader>
                <SavingsInfoButtonView />
              </TitlePackage>
              <Spacer></Spacer>
              <ViewContainerTextInput>
                <DollarText>$</DollarText>
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
                thumbImage={knobImage()}
                minimumValue={0}
                maximumValue={CalculatorState.grossIncomeRange / 10} // {calculatorUIData.gross_income_range}
                style={{ width: 350, height: 40 }}
                step={10}
                minimumTrackTintColor={appColors.brandColor}
                maximumTrackTintColor={appColors.keyboardGray}
                // thumbTintColor={Platform.select({
                //   android: appColors.keyboardGray,
                // })}
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
  padding-top: 15px;
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

const ArcDataItemIcon = styled(typography.mediumTextBold)``;
const ArcDataItem = styled(typography.mediumTextStyle)``;
const ArcDataItemBold = styled(typography.mediumTextBold)``;

/* Text Layer */
const ArcTitle = styled(typography.mediumTextStyle)`
  width: 200px;
  text-align: center;
`;

const ArcTitleAmount = styled(typography.largerTextBold)`
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

const RedArcTextRow = styled.View`
  flex-direction: row;
  justify-content: center;
  /* height:0px; */
`;

const ArcIconContainerRow = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  z-index: 2000;
  padding-right: 15px;
  padding-top: 30px;
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

const RowView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const RowText = styled.Text`
  flex: 1;
  /* border: blue;
border-width: 1; */
`;

const RowTextContainer = styled.Text`
  /* border: purple;
border-width: 1; */
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

const ViewContainerTextInput = styled.View`
  padding-left: 2;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  /* width: 0px; */
  height: 30px;
  color: black;
  /* display: flex; */

  flex-direction: row;
  border: ${Platform.select({ ios: "lightgray", android: "lightgray" })};
  border-width: 1px;
  border-radius: 5;
`;

const DollarText = styled.Text`
  padding-left: 0;
  padding-top: 2px;
`;

const PercentText = styled.Text`
  padding-left: 0;
`;

const SliderTextInput = styled.TextInput`
  /* border: 10px blue; */
  padding-top: 0px;
  padding-bottom: 0;
  padding-right: 2;
  margin-top: 2px;

  text-align: right;

  width: 70px;
  height: 32px;
  color: black;
  display: flex;

  /* height: ${Platform.select({ ios: "30px", android: "25px" })}; */
`; // change height of

const ComfortableRentText = styled.View`
  padding-bottom: 20px;
  padding-left: 25px;
`;

const RentText = styled.Text``;

const DeductionsRowView = styled.View`
  height: 60px;
  padding-left: 25px;

  padding-top: 10px;

  /* border: red;
  border-width: 1px; */
`;

const DeductionsText = styled.Text`
  color: ${appColors.brandColor};
  /* padding-bottom: 20px;
  padding-left: 20px; */
  /* order: orange;
  border-width: 1px; */
`;

const ExpensesRowView = styled.View`
  height: 60px;
  padding-left: 25px;

  padding-top: 10px;
  /* border: green;
  border-width: 1px; */
`;

const ExpensesText = styled.Text`
  color: ${appColors.brandColor};
  /* padding-bottom: 20px; */
  /* border: orange;
  border-width: 1px; */
  /* width: 120px; */
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
  padding-top: 10px;
  background-color: white;
  height: 50px;
  justify-content: center;
`;

const SliderMessageViewTextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-horizontal: 15px;
  background-color: ${appColors.bubbleGray};
  height: 40px;
  justify-content: center;
  border-radius: 15;
  border-color: ${appColors.bubbleGray};
  border-width: 8px;
`;
const SliderMoveView = styled.View`
  padding-horizontal: 10px;
  background-color: white;
  height: 50px;
  justify-content: center;
`;

const SliderMessageText = styled(typography.smallTextStyle)`
  padding-top: 6px;

  background-color: ${appColors.bubbleGray};
  height: 30px;

  text-align: center;
`;

const SliderMessageTextBold = styled(typography.smallTextBold)`
  padding-top: 5px;

  background-color: ${appColors.bubbleGray};
  height: 30px;

  text-align: center;
`;

const ScrollRowView = styled.View``;

const ViewContainer = styled.View`
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;
const SliderHeader = styled.Text`
  color: black;
  /* border-color: blue;
  border-width: 1px; */
`;

const SliderTitleRow = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  /* flex: 1;  causes labels to jump and disappear */
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
  padding-left: 10px;
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

// textAlignVertical="top" // or top
// textAlignHorizontal="right"
// placeholder="0000"
// defaultValue="0"
// keyboardType="number-pad"
// step={10}

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
  /* padding-bottom:100; */
`;
const RedArcPathView = styled.View`
  /* padding-bottom:100; */
`;

const ArcTextPackage = styled.View`
  flex-direction: column;
  padding-top: 50px;
`;

const WhoopsPackage = styled.View`
  z-index: 4000;
  align-self: center;
  /* position: absolute;
  align-self: center;
  padding-bottom: 143px;
  width: ${windowWidth}px; */
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
{
  /* <CoinsIcon
          source={require("../../../../assets/BlueInfo/BlueInfo.png")}
        /> */
}

const CoinsIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const DollarIcon = styled.Image`
  margin-top: 2px;
  width: 25px;
  height: 16px;
`;

const NegView = styled.View`
  padding-top: -100;
`;
