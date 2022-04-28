import {
   
    C_UTILITIES_TEXT_CHANGE,
    C_UTILITIES_EDITABLE_CHANGE,
    C_UTILITIES_SLIDER_CHANGE,

    C_TRANSPORTATION_TEXT_CHANGE,
    C_TRANSPORTATION_EDITABLE_CHANGE,
    C_TRANSPORTATION_SLIDER_CHANGE,

    C_SUBSCRIPTIONSERVICES_TEXT_CHANGE,
    C_SUBSCRIPTIONSERVICES_EDITABLE_CHANGE,
    C_SUBSCRIPTIONSERVICES_SLIDER_CHANGE,

    C_OTHEREXPENSES_TEXT_CHANGE,
    C_OTHEREXPENSES_EDITABLE_CHANGE,
    C_OTHEREXPENSES_SLIDER_CHANGE,

    C_INSURANCE_EDITABLE_CHANGE,
    C_INSURANCE_SLIDER_CHANGE,
    C_INSURANCE_TEXT_CHANGE,
    C_INIT_INSURANCE_CHANGE,

    C_CELLPHONEBILL_TEXT_CHANGE,
    C_CELLPHONEBILL_SLIDER_CHANGE,
    C_CELLPHONEBILL_EDITABLE_CHANGE,

    C_GROCERIESANDDINING_TEXT_CHANGE,
    C_GROCERIESANDDINING_SLIDER_CHANGE,
    C_GROCERIESANDDINING_EDITABLE_CHANGE,

    C_MONTHLYITEMIZEDEXPENSES_TEXT_CHANGE,
    C_MONTHLYITEMIZEDEXPENSES_EDITABLE_CHANGE,
    C_MONTHLYITEMIZEDEXPENSES_SLIDER_CHANGE,

    

    C_FIELD,
    C_CV_EXPENSES_TEXT_CHANGE,
    C_CV_EXPENSES_SLIDER_CHANGE,
    C_CV_EXPENSES_EDITABLE_CHANGE,
    // what does cv stand for here?

    C_LAST_SUCCESSFUL_TOTAL,

   

} from './ExpensesConstants'

export function c_changecellphonebilltext(cellphonebilltext) {
    let a = String(cellphonebilltext);
    let cleanedNumber = a.replace(/[^0-9]/g, "");
    if (cleanedNumber == "") {
      cleanedNumber = "0";
    }
    return {
      type: C_CELLPHONEBILL_TEXT_CHANGE,
      payload: Number(cleanedNumber),
    };
  }
  export function c_changecellphonebillslider(cellphonebillslider) {
    let a = String(cellphonebillslider);
    let cleanedNumber = a.replace(/[^0-9]/g, "");
    if (cleanedNumber == "") {
      cleanedNumber = "0";
    }
    // console.log("cellphone slider" + String (cellphonebillslider))
    return {
      type: C_CELLPHONEBILL_SLIDER_CHANGE,
      payload: Number(cleanedNumber),
    };
  }

  export function c_cellphonebillvalueiseditable(cellphonebill_editable) {
    //console.log("cellphone editable: " + String(cellphonebill_editable))
    return {
      type: C_CELLPHONEBILL_EDITABLE_CHANGE,
      payload: cellphonebill_editable,
    };
  }

//=========== groceries and dining

export function c_changegroceriesanddiningtext(groceriesanddiningtext) {
  let a = String(groceriesanddiningtext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
 // console.log("groceries text" + String (groceriesanddiningtext))
  return {
    type: C_GROCERIESANDDINING_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changegroceriesanddiningslider(groceriesanddiningslider) {
  let a = String(groceriesanddiningslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("groceries slider" + String(groceriesanddiningslider))
  //console.log(cleanedNumber)
  return {
    type: C_GROCERIESANDDINING_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_groceriesanddiningvalueiseditable(groceriesanddining_editable) {
  //console.log("groceries and dining editable: " + String(groceriesanddining_editable))
  return {
    type: C_GROCERIESANDDINING_EDITABLE_CHANGE,
    payload: groceriesanddining_editable,
  };
}

// ========== other expenses

export function c_changeotherexpensestext(otherexpensestext) {
  let a = String(otherexpensestext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("otherexpenses text" + String (otherexpensestext))
  return {
    type: C_OTHEREXPENSES_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changeotherexpensesslider(otherexpensesslider) {
  let a = String(otherexpensesslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("other expenses slider" + String(otherexpensesslider))
  //console.log(cleanedNumber)
  return {
    type: C_OTHEREXPENSES_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}


export function c_otherexpensesvalueiseditable(otherexpenses_editable) {
  //console.log("otherexpenses editable: " + String(otherexpenses_editable))
  return {
    type: C_OTHEREXPENSES_EDITABLE_CHANGE,
    payload: otherexpenses_editable,
  };
}


// =========== insurance 

export function c_changeinsurancetext(insurancetext) {
  let a = String(insurancetext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
 // console.log("insurance text" + String (insurancetext))
  return {
    type: C_INSURANCE_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changeinsuranceslider(insuranceslider) {
  let a = String(insuranceslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  // console.log("insurance slider" + String(insuranceslider))
  // console.log(cleanedNumber)
  return {
    type: C_INSURANCE_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_changeinitinsurance(initinsurance) {
  // let a = String(initinsurance);
  // // let cleanedNumber = a.replace(/[^0-9]/g, "");
  // // if (cleanedNumber == "") {
  // //   cleanedNumber = "0";
  // // }
  //console.log("init insurance action", initinsurance)
  return {
    type: C_INIT_INSURANCE_CHANGE,
    payload: Number(initinsurance),
  };
}

export function c_insurancevalueiseditable(insurance_editable) {
  //console.log("insurance editable: " + String(insurance_editable))
  return {
    type: C_INSURANCE_EDITABLE_CHANGE,
    payload: insurance_editable,
  };
}


///============== utilities

export function c_changeutilitiestext(utilitiestext) {
  let a = String(utilitiestext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("utilities text" + String (utilitiestext))
  return {
    type: C_UTILITIES_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changeutilitiesslider(utilitiesslider) {
  let a = String(utilitiesslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  // console.log("utilities slider" + String(utilitiesslider))
  // console.log(cleanedNumber)
  return {
    type: C_UTILITIES_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_utilitiesvalueiseditable(utilities_editable) {
  //console.log("utilities editable: " + String(utilities_editable))
  return {
    type: C_UTILITIES_EDITABLE_CHANGE,
    payload: utilities_editable,
  };
}

// ==========  transporatation

export function c_changetransportationtext(transportationtext) {
  let a = String(transportationtext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
 // console.log("transportation text" + String (transportationtext))
  return {
    type: C_TRANSPORTATION_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changetransportationslider(transportationslider) {
  let a = String(transportationslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  // console.log("transportation slider" + String(transportationslider))
  // console.log(cleanedNumber)
  return {
    type: C_TRANSPORTATION_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_transportationvalueiseditable(transportation_editable) {
  //console.log("transportation editable: " + String(transportation_editable))
  return {
    type: C_TRANSPORTATION_EDITABLE_CHANGE,
    payload: transportation_editable,
  };
}

// ============= subscription services

export function c_changesubscriptionservicestext(subscriptionservicestext) {
  let a = String(subscriptionservicestext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("subscriptionservices text" + String (subscriptionservicestext))
  return {
    type: C_SUBSCRIPTIONSERVICES_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changesubscriptionservicesslider(subscriptionservicesslider) {
  let a = String(subscriptionservicesslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  // console.log("subscriptionservices slider" + String(subscriptionservicesslider))
  // console.log(cleanedNumber)
  return {
    type: C_SUBSCRIPTIONSERVICES_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_subscriptionservicesvalueiseditable(subscriptionservices_editable) {
 // console.log("subscriptionservices editable: " + String(subscriptionservices_editable))
  return {
    type: C_SUBSCRIPTIONSERVICES_EDITABLE_CHANGE,
    payload: subscriptionservices_editable,
  };
}

// monthly expenses (total)

export function c_changemonthlyitemizedexpensestext(monthlyitemizedexpensestext) {
  let a = String(monthlyitemizedexpensestext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("monthlyitemizedexpenses text" + String (monthlyitemizedexpensestext))
  return {
    type: C_MONTHLYITEMIZEDEXPENSES_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_changemonthlyitemizedexpensesslider(monthlyitemizedexpensesslider) {
  let a = String(monthlyitemizedexpensesslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("monthlyitemizedexpenses slider" + String(monthlyitemizedexpensesslider))
  //console.log(cleanedNumber)
  return {
    type: C_MONTHLYITEMIZEDEXPENSES_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_monthlyitemizedexpensesvalueiseditable(monthlyitemizedexpenses_editable) {
  //console.log("monthlyitemizedexpenses editable: " + String(monthlyitemizedexpenses_editable))
  return {
    type: C_MONTHLYITEMIZEDEXPENSES_EDITABLE_CHANGE,
    payload: monthlyitemizedexpenses_editable,
  };
}


export function c_cv_changeexpensestext(cv_expensestext) {
  let a = String(cv_expensestext);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("cv expenses text" + String (cv_expensestext))
  return {
    type: C_CV_EXPENSES_TEXT_CHANGE,
    payload: Number(cleanedNumber),
  };
}
export function c_cv_changeexpensesslider(cv_expensesslider) {
  let a = String(cv_expensesslider);
  let cleanedNumber = a.replace(/[^0-9]/g, "");
  if (cleanedNumber == "") {
    cleanedNumber = "0";
  }
  //console.log("cv expenses slider" + String(cv_expensesslider))
  //console.log(cleanedNumber)
  return {
    type: C_CV_EXPENSES_SLIDER_CHANGE,
    payload: Number(cleanedNumber),
  };
}

export function c_cv_expensesvalueiseditable(cv_expenses_editable) {
  //console.log("calculatorview expenses editable: " + String(cv_expenses_editable))
  return {
    type: C_CV_EXPENSES_EDITABLE_CHANGE,
    payload: cv_expenses_editable,
  };
}

 