import {
   
  CALC_MONTHLY_EXPENSES,
  CALC_MONTHLY_MANDATORY_DEDUCTIONS,
  CALC_MONTHLY_DEBT,
  CALC_MONTHLY_SAVINGS,
  CALC_MONTHLY_LEFTOVER,
} from "../constants";

const initialState = {
  rentAmount: 0,
  monthlyExpenses: 0,
  monthlyMandatoryDeductions: 0,
  monthlyDebt: 0,
  monthlySavings: 0,
  // monthlyLeftOver: 0,
};

const calculatorCalculationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CALC_RENT_AMOUNT:
    //   // console.log("in rent amount calculation");
    //   return {
    //     ...state,
    //     rentAmount: action.payload,
    //   };

    case CALC_MONTHLY_EXPENSES:
      // console.log("in expenses calculation");
      return {
        ...state,
        monthlyExpenses: action.payload,
      };

    case CALC_MONTHLY_MANDATORY_DEDUCTIONS:
      // console.log("in monthly deductions calculation");
      return {
        ...state,
        monthlyMandatoryDeductions: action.payload,
      };

    case CALC_MONTHLY_DEBT:
      // console.log("in debt calculation");
      return {
        ...state,
        monthlyDebt: action.payload,
      };

    case CALC_MONTHLY_SAVINGS:
      // console.log("in savings calculation");
      return {
        ...state,
        monthlySavings: action.payload,
      };

    // case CALC_MONTHLY_LEFTOVER:
    //   // console.log("in monthly leftover calculation");
    //   return {
    //     ...state,
    //     monthlyLeftOver: action.payload,
    //   };

    default:
      // console.log("in calculator calculations default");
      return state;
  }
};

export default calculatorCalculationsReducer;

 
