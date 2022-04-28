import React, { useState, useEffect } from "react";

// styled-components
import styled from "styled-components/native";

import { connect } from "react-redux";

import CalculatorState from "../Arc/CalculatorState";

// react-native
import { Text } from "react-native";

import typography from "../../../config/typography";
import appColors from "../../../config/colors";

import analytics from "@react-native-firebase/analytics";

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
  calculatorCalculationsData: state.calculatorCalculationsData,
  arcData: state.arcData,
});

function CalculatorSummaryView(props) {
  const { calculatorUIData, calculatorCalculationsData, arcData } = props;
  let [logoSwitch, setLogoSwitch] = useState(30);

  useEffect(() => {
     analytics().logEvent("Calculator_SummaryPage_Arrived", {
        id: 20000003,
        event: "calculator summary page",
        description: ["arrived on calculator summary page"],
      });
  }, []);

  let categories = [
    "Monthly Gross Income",
    "Percentage of Income",
    "Monthly Rent Amount",
    "Monthly Deductions",
    "Monthly Debt",
    "Monthly Expenses",
    "Monthly Savings",
    "Remaining Balance Before Taxes",
  ];

  let [cats, setCats] = useState(categories);

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
      case 10:
      case 20:
        return (
          <Column>
            <SummaryHeaderLogo
              source={require("../../../../assets/SummaryAwesome/SummaryAwesome.png")}
            />
            <MediumText>
              Awesome! You are using {calculatorUIData.percent_income}% of your
              income!
            </MediumText>
            <SmallText>
              You are under the recommended amount of your income to rent which
              is 30%. Doing this gives you a surplus of money to use for saving
              or anything else you've been wanting to purchase.
            </SmallText>
          </Column>
        );
      case 30:
        return (
          <Column>
            <SummaryHeaderLogo
              source={require("../../../../assets/SummaryGreatJob/SummaryGreatJob.png")}
            />
            <MediumText>Great Job! You are at 30% of your income!</MediumText>
            <SmallText>
              You are allocating the recommended amount of your income to rent
              which is 30%. This allows you to stay comfortably within your
              expenses and be prepared for when life happens.
            </SmallText>
          </Column>
        );
      case 40:
        return (
          <Column>
            <SummaryHeaderLogo
              source={require("../../../../assets/SummaryBeCareful/SummaryBeCareful.png")}
            />
            <MediumText>
              Be careful! You are using 40% of your income!
            </MediumText>
            <SmallText>
              You are above the recommended amount of your income to rent which
              is 30%. Be mindful of how much income you allocate to rent, to
              ensure you're prepared for unforseen circumstances.
            </SmallText>
          </Column>
        );

      case 50:
      case 60:
      case 70:
      case 80:
      case 90:
      case 100:
        return (
          <Column>
            <SummaryHeaderLogo
              source={require("../../../../assets/SummaryStop/SummaryStop.png")}
            />
            <MediumText>
              Stop! You are using over {calculatorUIData.percent_income}% of
              your income.
            </MediumText>
            <SmallText>
              You are way above the recommended amount of your income to rent
              which is 30%. Putting this money into your rent leaves little to
              no room for anything else life throws at you.
            </SmallText>
          </Column>
        );
      default:
        return <Text>No Logo</Text>;
    }
  };

  let logo = renderSwitch(CalculatorState.percentIncome);

  return (
    <Container>
      {/* <LargeTextStyle>Summary View</LargeTextStyle> */}
      <Column>{logo}</Column>

      <SummaryScrollView>
        <Column3>
          <Row>
            <RowText1>{categories[0]}</RowText1>
            <Spacer />
            {/* <RowText2>$ {Math.round(calculatorUIData.gross_income)} </RowText2> */}
            <RowText2>$ {Math.round(calculatorUIData.gross_income)} </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[1]}</RowText1>
            <Spacer />
            {/* <RowText2>{Math.round(calculatorUIData.percent)}% </RowText2> */}
            <RowText2>{Math.round(calculatorUIData.percent_income)}% </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[2]}</RowText1>
            <Spacer />
            <RowText2>
              ${" "}
              {Math.round(
                calculatorUIData.gross_income *
                  calculatorUIData.percent_income *
                  0.01
              )}{" "}
            </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[3]}</RowText1>
            <Spacer />
            {/* <RowText2>$ {Math.round(CalculatorState.monthlyMandatoryDeductions)} </RowText2> */}
            <RowText2>
              $ {Math.round(calculatorUIData.pay_deductions)}{" "}
            </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[4]}</RowText1>
            <Spacer />
            {/* <RowText2>$ {Math.round(CalculatorState.monthlyDebt)} </RowText2> */}
            <RowText2>$ {Math.round(calculatorUIData.debt)} </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[5]}</RowText1>
            <Spacer />
            {/* <RowText2>$ {Math.round(CalculatorState.monthlyExpenses)} </RowText2> */}
            <RowText2>$ {Math.round(calculatorUIData.expenses)} </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[6]}</RowText1>
            <Spacer />
            {/* <RowText2>$ {Math.round(CalculatorState.monthlySavings)} </RowText2> */}
            <RowText2>$ {Math.round(calculatorUIData.savings)} </RowText2>
          </Row>
          <Row2></Row2>
          <Row>
            <RowText1>{categories[7]}</RowText1>
            <Spacer />
            <RowText2>
              ${" "}
              {Math.round(
                calculatorUIData.gross_income -
                  calculatorUIData.gross_income *
                    calculatorUIData.percent_income *
                    0.01 -
                  (calculatorUIData.expenses +
                    calculatorUIData.savings +
                    calculatorUIData.debt +
                    calculatorUIData.pay_deductions)
              )}{" "}
            </RowText2>
          </Row>
          <Row2></Row2>
        </Column3>
      </SummaryScrollView>
    </Container>
  );
}

export default connect(select)(CalculatorSummaryView);

const LargeTextStyle = typography.largeTextStyle;
const MediumTextStyle = typography.mediumTextStyle;
const SmallTextStyle = typography.smallTextStyle;

const Container = styled.View`
  flex: 1;
  background-color: ${appColors.grayNeutral};
`;

const Spacer = styled.View`
  flex: 1;
`;

const Column = styled.View`
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
`;

const Column2 = styled.View`
  align-items: center;
  flex-direction: column;
`;

const Column3 = styled.View`
  flex-direction: column;
`;

const Row = styled.View`
  align-items: flex-start;
  flex-direction: row;
  background-color: #fff;
  padding-vertical: 6px;
`;

const Row2 = styled.View`
  align-items: flex-start;
  flex-direction: row;
  background-color: ${appColors.grayNeutral};
  padding-vertical: 6px;
`;

const SummaryHeaderLogo = styled.Image`
  height: 50px;
  width: 50px;
`;
const ImgView = styled.Image`
  padding-top: 20px;
  align-self: center;
  justify-content: center;
`;

const LargeText = styled(typography.largeTextStyle)`
  justify-content: center;
  align-self: center;
  color: ;
`;

const MediumText = styled(typography.mediumTextBold)`
  justify-content: center;
  align-self: center;
  color: ${appColors.fannieBlue};
  padding-vertical: 10px;
`;

const SmallText = styled(typography.smallTextStyle)`
  justify-content: center;
  align-self: center;
  color: ${appColors.fannieBlue};
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;

const RowText1 = styled(typography.mediumTextStyle)`
  padding-left: 16px;
`;

const RowText2 = styled(typography.mediumTextStyle)`
  padding-right: 16px;
`;

const SummaryScrollView = styled.ScrollView``;
