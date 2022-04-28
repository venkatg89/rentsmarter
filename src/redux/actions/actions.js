import {
  SLIDER_GROSS_INCOME_CHANGE,
  GROSS_INCOME_CHANGE,
  GROSS_INCOME_RANGE_CHANGE,
  SLIDER_EXPENSES_CHANGE,
  EXPENSES_CHANGE,
  SLIDER_PAY_DEDUCTIONS_CHANGE,
  PAY_DEDUCTIONS_CHANGE,
  SLIDER_SAVINGS_CHANGE,
  SAVINGS_CHANGE,
  SLIDER_DEBT_CHANGE,
  DEBT_CHANGE,
  PERCENT_INCOME_CHANGE,
  RENT_AMOUNT_CHANGE,
  LEFTOVER_CHANGE,
  ARC_SEGMENT_1_BEGIN,
  ARC_SEGMENT_1_END,
  ARC_SEGMENT_2_BEGIN,
  ARC_SEGMENT_2_END,
  ARC_SEGMENT_3_BEGIN,
  ARC_SEGMENT_3_END,
  ARC_SEGMENT_4_BEGIN,
  ARC_SEGMENT_4_END,
  ARC_SEGMENT_5_BEGIN,
  ARC_SEGMENT_5_END,
  ARC_SEGMENT_6_BEGIN,
  ARC_SEGMENT_6_END,

  //calculations
  CALC_MONTHLY_EXPENSES,
  CALC_MONTHLY_MANDATORY_DEDUCTIONS,
  CALC_MONTHLY_DEBT,
  CALC_MONTHLY_SAVINGS,
  CALC_MONTHLY_LEFTOVER,
  CALC_RENT_AMOUNT,

  // checklist notes
  ADD_CHECKLIST_NOTE,

  // itemized expenses
  SLIDER_CELLPHONEBILL_CHANGE,
  CELLPHONEBILL_CHANGE,
  SLIDER_MONTHLYITEMIZEDEXPENSES_CHANGE,
  MONTHLYITEMIZEDEXPENSES_CHANGE,
  INSURANCE_CHANGE,
  TRANSPORTATION_CHANGE,
  UTILITIES_CHANGE,
  SUBSCRIPTIONSERVICES_CHANGE,
  GROCERIESANDDINING_CHANGE,
  OTHEREXPENSES_CHANGE,
  
} from "../constants";

// thunks

//======= REAL RENT SMARTER FUNCTIONS ====

// gross income calculator

export function changegrossincome(gross_income) {
  let a = String(gross_income);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: GROSS_INCOME_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changegrossincomeslider(gross_income_slider) {
  let a = String(gross_income_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: SLIDER_GROSS_INCOME_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changegrossincomerange(gross_income_range) {
  let a = String(gross_income_range);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: GROSS_INCOME_RANGE_CHANGE,
    payload: Number(cleanedNumber),
  };
}

//Checklist functions

// add checklist note
export function saveChecklistNote({ rootRow, row, rowKey, note }) {
 // console.log("save checklist " + note);
  return {
    type: ADD_CHECKLIST_NOTE,
    payload: {
      rootRow: rootRow,
      row: row,
      rowKey: rowKey,
      notes: note,
    },
  };
}

// pay deductions calculator

export function changepaydeductionsslider(pay_deductions_slider) {
  let a = String(pay_deductions_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: SLIDER_PAY_DEDUCTIONS_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changepaydeductions(pay_deductions) {
  let a = String(pay_deductions);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: PAY_DEDUCTIONS_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// expenses calculator

export function changeexpensesslider(expenses_slider) {
  let a = String(expenses_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: SLIDER_EXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changeexpenses(expenses) {
  let a = String(expenses);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: EXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// debt calculator

export function changedebtslider(debt_slider) {
  let a = String(debt_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: SLIDER_DEBT_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changedebt(debt) {
  let a = String(debt);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: DEBT_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// savings calculator

export function changesavingsslider(savings_slider) {
  let a = String(savings_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_SAVINGS_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changesavings(savings) {
  let a = String(savings);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: SAVINGS_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changepercentincome(percent_income) {
  let a = String(percent_income);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: PERCENT_INCOME_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// leftover and rent amount, calculated

export function changerentamount(rent_amount) {
  let a = String(rent_amount);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: RENT_AMOUNT_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changeleftover(left_over) {
  let a = String(left_over);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }

  return {
    type: LEFTOVER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// arc calculations

export function changearcsegment1begin(arc_segment_1_begin) {
  const value = saveTheNumber(arc_segment_1_begin);
  return {
    type: ARC_SEGMENT_1_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment1end(arc_segment_1_end) {
  const value = saveTheNumber(arc_segment_1_end);
  return {
    type: ARC_SEGMENT_1_END,
    payload: Number(value),
  };
}

// 2

export function changearcsegment2begin(arc_segment_2_begin) {
  // console.log("inside the segment 2 begin action")
  // console.log(arc_segment_2_begin)
  const value = saveTheNumber(arc_segment_2_begin);
  return {
    type: ARC_SEGMENT_2_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment2end(arc_segment_2_end) {
  // console.log("inside the segment 2 end action")
  // console.log(arc_segment_2_end)
  const value = saveTheNumber(arc_segment_2_end);
  return {
    type: ARC_SEGMENT_2_END,
    payload: Number(value),
  };
}

// 3

export function changearcsegment3begin(arc_segment_3_begin) {
  const value = saveTheNumber(arc_segment_3_begin);
  return {
    type: ARC_SEGMENT_3_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment3end(arc_segment_3_end) {
  const value = saveTheNumber(arc_segment_3_end);
  return {
    type: ARC_SEGMENT_3_END,
    payload: Number(value),
  };
}

// 4

export function changearcsegment4begin(arc_segment_4_begin) {
  const value = saveTheNumber(arc_segment_4_begin);
  return {
    type: ARC_SEGMENT_4_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment4end(arc_segment_4_end) {
  const value = saveTheNumber(arc_segment_4_end);
  return {
    type: ARC_SEGMENT_4_END,
    payload: Number(value),
  };
}

// 5

export function changearcsegment5begin(arc_segment_5_begin) {
  const value = saveTheNumber(arc_segment_5_begin);
  return {
    type: ARC_SEGMENT_5_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment5end(arc_segment_5_end) {
  const value = saveTheNumber(arc_segment_5_end);
  return {
    type: ARC_SEGMENT_5_END,
    payload: Number(value),
  };
}

// 6

export function changearcsegment6begin(arc_segment_6_begin) {
  const value = saveTheNumber(arc_segment_6_begin);
  return {
    type: ARC_SEGMENT_6_BEGIN,
    payload: Number(value),
  };
}

export function changearcsegment6end(arc_segment_6_end) {
  const value = saveTheNumber(arc_segment_6_end);
  return {
    type: ARC_SEGMENT_6_END,
    payload: Number(value),
  };
}

// calculations

/* deprecated */
// export function changecalcrentamount(calc_rent_amount) {
//   return {
//     type: CALC_RENT_AMOUNT,
//     payload: Number(calc_rent_amount),
//   };
// }
/* deprecated */

export function changecalcmonthlyexpenses(calc_monthly_expenses) {
  return {
    type: CALC_MONTHLY_EXPENSES,
    payload: Number(calc_monthly_expenses),
  };
}

export function calcmonthlydeductions(calc_monthly_deductions) {
  return {
    type: CALC_MONTHLY_MANDATORY_DEDUCTIONS,
    payload: Number(calc_monthly_deductions),
  };
}

export function calcmonthlydebt(calc_monthly_debt) {
  return {
    type: CALC_MONTHLY_DEBT,
    payload: Number(calc_monthly_debt),
  };
}

export function calcmonthlysavings(calc_monthly_savings) {
  return {
    type: CALC_MONTHLY_SAVINGS,
    payload: Number(calc_monthly_savings),
  };
}

//deprecated
// export function calcmonthlyleftover(calc_monthly_leftover) {
//   return {
//     type: CALC_MONTHLY_LEFTOVER,
//     payload: Number(calc_monthly_leftover),
//   };
// }

const saveTheNumber = (value) => {
  if (value === null || value === undefined) {
    return "0";
  }
  if (isNaN(value)) {
    return "0";
  }
  return value;
};

/// ========= itemized expenses

// groceries and dining calculator

export function changegroceriesanddiningslider(groceriesanddining_slider) {
  let a = String(groceriesanddining_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_GROCERIESANDDINING_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changegroceriesanddining(groceriesanddining) {
  let a = String(groceriesanddining);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: GROCERIESANDDINING_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// utilities calculator

export function changeutilitiesslider(utilities_slider) {
  let a = String(utilities_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_UTILITIES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changeutilities(utilities) {
  let a = String(utilities);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: UTILITIES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// transportation calculator

export function changetransportationslider(transportation_slider) {
  let a = String(transportation_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_TRANSPORTATION_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changetransportation(transportation) {
  let a = String(transportation);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: TRANSPORTATION_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// insurance calculator

export function changeinsuranceslider(insurance_slider) {
  let a = String(insurance_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_INSURANCE_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changeinsurance(insurance) {
  let a = String(insurance);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: INSURANCE_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// other expenses calculator

export function changeotherexpensesslider(otherexpenses_slider) {
  let a = String(otherexpenses_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_OTHEREXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changeotherexpenses(otherexpenses) {
  let a = String(otherexpenses);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: OTHEREXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// subscription servies calculator

export function changesubscriptionservicesslider(subscriptionservices_slider) {
  let a = String(subscriptionservices_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_SUBSCRIPTIONSERVICES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changesubscriptionservices(subscriptionservices) {
  let a = String(subscriptionservices);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: SUBSCRIPTIONSERVICES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// cellphone bill calculator

export function changecellphonebillslider(cellphonebill_slider) {
  let a = String(cellphonebill_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_CELLPHONEBILL_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changecellphonebill(cellphonebill) {
  let a = String(cellphonebill);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: CELLPHONEBILL_CHANGE,
    payload: Number(cleanedNumber),
  };
}

// monthly itemized expenses calculator

export function changemonthlyitemizedexpensesslider(
  monthlyitemizedexpenses_slider
) {
  let a = String(monthlyitemizedexpenses_slider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  return {
    type: SLIDER_MONTHLYITEMIZEDEXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function changemonthlyitemizedexpenses(monthlyitemizedexpenses) {
  let a = String(monthlyitemizedexpenses);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  return {
    type: MONTHLYITEMIZEDEXPENSES_CHANGE,
    payload: Number(cleanedNumber),
  };
}
