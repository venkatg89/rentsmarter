import {
  SLIDER_GROSS_INCOME_CHANGE,
  GROSS_INCOME_CHANGE,
  GROSS_INCOME_RANGE_CHANGE,
  SLIDER_SAVINGS_CHANGE,
  SAVINGS_CHANGE,
  SLIDER_PAY_DEDUCTIONS_CHANGE,
  PAY_DEDUCTIONS_CHANGE,
  SLIDER_DEBT_CHANGE,
  DEBT_CHANGE,
  SLIDER_EXPENSES_CHANGE,
  EXPENSES_CHANGE,
  PERCENT_INCOME_CHANGE,
  RENT_AMOUNT_CHANGE,
  LEFTOVER_CHANGE,
  CELLPHONEBILL_CHANGE,
  INSURANCE_CHANGE,
  GROCERIESANDDINING_CHANGE,
  UTILITIES_CHANGE,
  TRANSPORTATION_CHANGE,
  OTHEREXPENSES_CHANGE,
  SUBSCRIPTIONSERVICES_CHANGE,
  MONTHLYITEMIZEDEXPENSES_CHANGE,
} from "../constants";

const initialState = {
  gross_income_slider: 0,
  gross_income: 0,
  gross_income_range: 10000,
  savings: 0,
  debt: 0,
  pay_deductions: 0,
  expenses: 0,
  percent_income: 30,
  left_over: 0,
  rent_amount: 0,

  // itemized expenses
  cellphonebill: 0,
  insurance: 0,
  transportation: 0,
  subscriptionservices: 0,
  groceriesanddining: 0,
  utilities: 0,
  otherexpenses: 0,
  monthlyitemizedexpenses: 0,
};

const calculatorUIReducer = (state = initialState, action) => {
  switch (action.type) {
    // gross income
    case SLIDER_GROSS_INCOME_CHANGE:
      // console.log("in gross income change slider");
      return {
        ...state,
        gross_income_slider: action.payload,
      };
    case GROSS_INCOME_CHANGE:
      // console.log("in gross income change");
      return {
        ...state,
        gross_income: action.payload,
      };
    case GROSS_INCOME_RANGE_CHANGE:
      // console.log("in gross income range change");
      return {
        ...state,
        gross_income_range: action.payload,
      };

    // savings
    case SLIDER_SAVINGS_CHANGE:
      // console.log("in savings change slider");
      return {
        ...state,
        savings_slider: action.payload,
      };
    case SAVINGS_CHANGE:
      // console.log("in savings change");
      return {
        ...state,
        savings: action.payload,
      };

    // debt
    case SLIDER_DEBT_CHANGE:
      // console.log("in debt change slider");
      return {
        ...state,
        debt_slider: action.payload,
      };
    case DEBT_CHANGE:
      // console.log("in debt change");
      return {
        ...state,
        debt: action.payload,
      };

    // pay deductions
    case SLIDER_PAY_DEDUCTIONS_CHANGE:
      // console.log("in deductions change slider");
      return {
        ...state,
        pay_deductions_slider: action.payload,
      };
    case PAY_DEDUCTIONS_CHANGE:
      // console.log("in deductions change");
      return {
        ...state,
        pay_deductions: action.payload,
      };

    // expenses
    case SLIDER_EXPENSES_CHANGE:
      // console.log("in expenses change slider");
      return {
        ...state,
        expenses_slider: action.payload,
      };
    case EXPENSES_CHANGE:
      // console.log("in expenses change");
      return {
        ...state,
        expenses: action.payload,
      };

    // percent income
    case PERCENT_INCOME_CHANGE:
      // console.log("in percent income change");
      return {
        ...state,
        percent_income: action.payload,
      };

    case LEFTOVER_CHANGE:
      // console.log("in leftover change");
      return {
        ...state,
        left_over: action.payload,
      };

    case RENT_AMOUNT_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        rent_amount: action.payload,
      };

    // itemized expenses

    case CELLPHONEBILL_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        cellphonebill: action.payload,
      };

    case INSURANCE_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        insurance: action.payload,
      };

    case GROCERIESANDDINING_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        groceriesanddining: action.payload,
      };

    case UTILITIES_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        utilities: action.payload,
      };

    case TRANSPORTATION_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        transportation: action.payload,
      };

    case OTHEREXPENSES_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        otherexpenses: action.payload,
      };

    case SUBSCRIPTIONSERVICES_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        subscriptionservices: action.payload,
      };

    case MONTHLYITEMIZEDEXPENSES_CHANGE:
      // console.log("in rent amount change");
      return {
        ...state,
        monthlyitemizedexpenses: action.payload,
      };

    default:
      // console.log("in calculator default");
      return state;
  }
};

export default calculatorUIReducer;
