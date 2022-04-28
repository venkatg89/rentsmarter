import {
  C_CELLPHONEBILL_TEXT_CHANGE,
  C_CELLPHONEBILL_EDITABLE_CHANGE,
  C_CELLPHONEBILL_SLIDER_CHANGE,
  C_GROCERIESANDDINING_TEXT_CHANGE,
  C_GROCERIESANDDINING_SLIDER_CHANGE,
  C_GROCERIESANDDINING_EDITABLE_CHANGE,
  C_UTILITIES_TEXT_CHANGE,
  C_UTILITIES_SLIDER_CHANGE,
  C_UTILITIES_EDITABLE_CHANGE,
  C_INSURANCE_TEXT_CHANGE,
  C_INSURANCE_SLIDER_CHANGE,
  C_INSURANCE_EDITABLE_CHANGE,
  C_TRANSPORTATION_TEXT_CHANGE,
  C_TRANSPORTATION_SLIDER_CHANGE,
  C_TRANSPORTATION_EDITABLE_CHANGE,
  C_SUBSCRIPTIONSERVICES_TEXT_CHANGE,
  C_SUBSCRIPTIONSERVICES_SLIDER_CHANGE,
  C_SUBSCRIPTIONSERVICES_EDITABLE_CHANGE,
  C_OTHEREXPENSES_TEXT_CHANGE,
  C_OTHEREXPENSES_SLIDER_CHANGE,
  C_OTHEREXPENSES_EDITABLE_CHANGE,
  C_MONTHLYITEMIZEDEXPENSES_TEXT_CHANGE,
  C_MONTHLYITEMIZEDEXPENSES_SLIDER_CHANGE,
  C_MONTHLYITEMIZEDEXPENSES_EDITABLE_CHANGE,
  C_CV_EXPENSES_SLIDER_CHANGE,
  C_CV_EXPENSES_TEXT_CHANGE,
  C_CV_EXPENSES_EDITABLE_CHANGE,
  C_FIELD,
  C_INIT_INSURANCE_CHANGE,
 
} from "./ExpensesConstants";

export const itemizedExpensesReducer = (state, action) => {
  switch (action.type) {
    case C_CELLPHONEBILL_TEXT_CHANGE:
      return {
        ...state,
        cellphonebilltext: action.payload,
      };

    case C_CELLPHONEBILL_SLIDER_CHANGE:
      return {
        ...state,
        cellphonebillslider: action.payload,
      };

    case C_CELLPHONEBILL_EDITABLE_CHANGE:
      return {
        ...state,
        cellphonebill_editable: action.payload,
      };

    case C_TRANSPORTATION_TEXT_CHANGE:
      return {
        ...state,
        transportationtext: action.payload,
      };
    case C_TRANSPORTATION_SLIDER_CHANGE:
      return {
        ...state,
        transportationslider: action.payload,
      };

    case C_TRANSPORTATION_EDITABLE_CHANGE:
      return {
        ...state,
        transportation_editable: action.payload,
      };

    case C_GROCERIESANDDINING_TEXT_CHANGE:
      return {
        ...state,
        groceriesanddiningtext: action.payload,
      };

    case C_GROCERIESANDDINING_SLIDER_CHANGE:
      return {
        ...state,
        groceriesanddiningslider: action.payload,
      };

    case C_GROCERIESANDDINING_EDITABLE_CHANGE:
      return {
        ...state,
        groceriesanddining_editable: action.payload,
      };

    case C_INSURANCE_TEXT_CHANGE:
      return {
        ...state,
        insurancetext: action.payload,
      };
    case C_INSURANCE_SLIDER_CHANGE:
      //console.log("in slider insurance reducer");
      return {
        ...state,
        insuranceslider: action.payload,
      };

    case C_INIT_INSURANCE_CHANGE:
      //console.log("in init insurance reducer");
      return {
        ...state,
        initinsurance: action.payload,
      };

    case C_INSURANCE_EDITABLE_CHANGE:
      return {
        ...state,
        insurance_editable: action.payload,
      };

    case C_UTILITIES_TEXT_CHANGE:
      return {
        ...state,
        utilitiestext: action.payload,
      };
    case C_UTILITIES_SLIDER_CHANGE:
      return {
        ...state,
        utilitiesslider: action.payload,
      };

    case C_UTILITIES_EDITABLE_CHANGE:
      return {
        ...state,
        utilities_editable: action.payload,
      };

    case C_OTHEREXPENSES_TEXT_CHANGE:
      return {
        ...state,
        otherexpensestext: action.payload,
      };
    case C_OTHEREXPENSES_SLIDER_CHANGE:
      return {
        ...state,
        otherexpensesslider: action.payload,
      };

    case C_OTHEREXPENSES_EDITABLE_CHANGE:
      return {
        ...state,
        otherexpenses_editable: action.payload,
      };

    case C_SUBSCRIPTIONSERVICES_TEXT_CHANGE:
      return {
        ...state,
        subscriptionservicestext: action.payload,
      };
    case C_SUBSCRIPTIONSERVICES_SLIDER_CHANGE:
      return {
        ...state,
        subscriptionservicesslider: action.payload,
      };

    case C_SUBSCRIPTIONSERVICES_EDITABLE_CHANGE:
      return {
        ...state,
        subscriptionservices_editable: action.payload,
      };

    case C_MONTHLYITEMIZEDEXPENSES_TEXT_CHANGE:
      // console.log( "mie text " + String(action.payload))
      return {
        ...state,
        monthlyitemizedexpensestext: action.payload,
      };
    case C_MONTHLYITEMIZEDEXPENSES_SLIDER_CHANGE:
      // console.log( "mie slider " + String(action.payload))
      return {
        ...state,
        monthlyitemizedexpensesslider: action.payload,
      };

    case C_MONTHLYITEMIZEDEXPENSES_EDITABLE_CHANGE:
      return {
        ...state,
        monthlyitemizedexpenses_editable: action.payload,
      };

    case C_CV_EXPENSES_TEXT_CHANGE:
      // console.log( "mie text " + String(action.payload))
      return {
        ...state,
        cv_expensestext: action.payload,
      };
    case C_CV_EXPENSES_SLIDER_CHANGE:
      // console.log( "mie slider " + String(action.payload))
      return {
        ...state,
        cv_expensesslider: action.payload,
      };

    case C_CV_EXPENSES_EDITABLE_CHANGE:
      return {
        ...state,
        cv_expenses_editable: action.payload,
      };

  
    // this is very nice:
    case C_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
  }
  return state;
};
