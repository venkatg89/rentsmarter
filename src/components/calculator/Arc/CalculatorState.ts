
// import { valueToNode } from "@babel/types";
// import React,   from "react";

import {
  changecalcmonthlyexpenses,
  changesavings,
  changedebt,
  changepaydeductions,
 
  changeexpenses} from "../../../redux/actions/actions";

// import { connect } from "react-redux";

// import { bindActionCreators } from "redux";

// import { useSelector } from "react-redux";
 
 
// import calculatorCalculationsReducer from "../../../redux/reducers/calculatorCalculationsReducer";

 
interface ICalculatorState {
  rentAmount: number;
 
  grossIncomeRange: number;
  halfGrossIncomeRange: number;
  oneFifthGrossIncomeRange: number;

  monthlyGrossIncome: number;
  monthlyDebt: number;
  monthlyExpenses: number;
  monthlyMandatoryDeductions: number;
  monthlySavings: number;

  percentIncome: number;
  monthlyNetIncome: number;
  monthlyLeftOver: number;

  monthlyRent: number;

  // methods
  calculateOptimalRent(props: any): void; //note: passing in props from  redux-connected react component
  constrainMonthlyGrossIncome(props: any): void;
  constrainMonthlyDebt(props: any): void;
  constrainMonthlyExpenses(props: any): void;
  constrainMonthlySavings(props: any): void;
  constrainRentAmount(props: any): void;
  constrainMonthlyMandatoryCosts(props: any): void;

  // itemized

  constrainOtherExpenses(props: any): void;
  constrainUtilities(props: any): void;
  constrainTransportation(props: any): void;
  constrainSubscriptionServices(props: any): void;
  constrainGroceriesAndDining(props: any): void;
  constrainInsurance(props: any): void;
  constrainCellphoneBill(props: any): void;

  // end itemized

  calculateMonthlyNetIncome(props: any): void;
  calculateMonthlyLeftOver(props: any): void;

  
  setMonthlyRent(props: any): void;
   
}

const CalculatorState: ICalculatorState = {
  rentAmount: 0,
  monthlyGrossIncome: 0,
  grossIncomeRange: 10000,
  halfGrossIncomeRange: 0,
  oneFifthGrossIncomeRange: 0,
  monthlyDebt: 0,
  monthlyExpenses: 0,
  monthlyMandatoryDeductions: 0,
  monthlySavings: 0,
  percentIncome: 0,
  monthlyNetIncome: 0,
  monthlyLeftOver: 0,
  monthlyRent: 0,

  calculateOptimalRent(props) {
    // this data is pulled from redux state whenever the function is called, and passed
    // in as props.

    
    //console.log(props);
    
    let calculatorUIData = props.calculatorUIData;
    let calculatorCalculationsData = props.calculatorCalculationsData

    // if (calculatorUIData.percent_income == this.percentIncome) {
    //   return
    // }
    
//     let [debt, expenses, expenses_slider, gross_income, gross_income_range, gross_income_slider,
//          pay_deductions, percent_income, savings] = ...calculatorUIData;

    this.monthlyGrossIncome = calculatorUIData.gross_income
    this.grossIncomeRange = 10000; //calculatorUIData.gross_income_range;
    this.halfGrossIncomeRange= this.grossIncomeRange / 2
    this.oneFifthGrossIncomeRange = this.grossIncomeRange / 5 // savings? 1000 originally
    this.monthlyDebt = calculatorUIData.debt;
    this.monthlyExpenses = calculatorUIData.expenses;
    this.monthlyMandatoryDeductions = calculatorUIData.pay_deductions
    this.monthlySavings = calculatorUIData.savings
    //this.percentIncome = calculatorUIData.percent_income

    // console.log("PROP GROSS IS " + String(calculatorUIData.gross_income)) ;
    // console.log("PROP PERCENT IS " + String(calculatorUIData.percent_income)) ;

    // console.log("INIT GROSS IS " + String(this.monthlyGrossIncome)) ;
    // console.log("INIT PERCENT IS " + String(this.percentIncome)) ;

    // console.log("calculateOptimalRent: props");
    // console.log(props)

    this.constrainMonthlyGrossIncome(props);
    this.constrainMonthlyDebt(props);
    this.constrainMonthlyExpenses(props);
    this.constrainMonthlySavings(props);
    this.constrainRentAmount(props);
    this.constrainMonthlyMandatoryCosts(props);

    // itemized

    this.constrainOtherExpenses(props);
    this.constrainUtilities(props);
    this.constrainTransportation(props);
    this.constrainSubscriptionServices(props);
    this.constrainGroceriesAndDining(props);
    this.constrainInsurance(props);
    this.constrainCellphoneBill(props);

    // end itemized

    this.calculateMonthlyNetIncome(props);
    this.calculateMonthlyLeftOver(props);

   

    this.setMonthlyRent(props);

     
     
  },

  constrainMonthlyGrossIncome(props) {
     
    if (this.monthlyGrossIncome > (this.grossIncomeRange + 1)) {
      this.monthlyGrossIncome = this.grossIncomeRange;
    }

    // if (this.monthlyGrossIncome == 0) {
    //     props.dispatch(changeexpenses(0));
    //     props.dispatch(changedebt(0));
    //     props.dispatch(changepaydeductions(0));
    //     props.dispatch(changesavings(0));
    // }
  
  },
  constrainMonthlyDebt(props) {

    // if (this.monthlyDebt > this.halfGrossIncomeRange + 1) {
    //   this.monthlyDebt = this.halfGrossIncomeRange;
    // }
    
  },
  constrainMonthlyExpenses(props) {
    // if (this.monthlyExpenses > this.halfGrossIncomeRange + 1) {
    //   this.monthlyExpenses = this.halfGrossIncomeRange;
    // }
  },
    
  constrainMonthlySavings(props) {
    // if (this.monthlySavings > this.oneFifthGrossIncomeRange + 1) {
    //   this.monthlySavings = this.oneFifthGrossIncomeRange
    // }
    
  },

  constrainRentAmount(props) {
    this.rentAmount = this.monthlyGrossIncome * this.percentIncome * 0.01
    // console.log("INSIDE GROSS IS " + String(this.monthlyGrossIncome)) ;
    // console.log("INSIDE PERCENT IS " + String(this.percentIncome)) ;
    // console.log("INSIDE RENT AMOUNT IS " + String(this.rentAmount)) ;
    if (this.rentAmount < 0) {
      this.rentAmount = 0;
    }
    
   

  },

  constrainMonthlyMandatoryCosts() {
    // if (this.monthlyMandatoryDeductions > this.halfGrossIncomeRange + 1) {
    //   this.monthlyMandatoryDeductions = this.halfGrossIncomeRange
    // }
  
  },

  // itemized

  constrainOtherExpenses() {
    //     if self.otherExpenses > 1001 {
    //     self.otherExpenses = 1000
    // }
  },
  constrainUtilities() {
    //   if self.utilities > 1001 {
    //     self.utilities = 1000
    // }
  },
  constrainTransportation() {
    //   if self.transportation > 1001 {
    //     self.transportation = 1000
    // }
  },
  constrainSubscriptionServices() {
    //   if self.subscriptionServices > 1001 {
    //     self.subscriptionServices = 1000
    // }
  },
  constrainGroceriesAndDining() {
    //   if self.groceriesAndDining > 1001 {
    //     self.groceriesAndDining = 1000
    // }
  },
  constrainInsurance() {
    //   if self.insurance > 1001 {
    //     self.insurance = 1000
    // }
  },

  constrainCellphoneBill() {
    //   if self.cellphoneBill > 1001 {
    //     self.cellphoneBill = 1000
    // }
  },

  // end itemized

  calculateMonthlyNetIncome() {
    this.monthlyNetIncome =  this.monthlyGrossIncome - this.rentAmount
  },

  calculateMonthlyLeftOver(props) {
    // console.log("leftover: gross income " + String(this.monthlyGrossIncome))
    // console.log("leftover:  net income  " + String(this.monthlyNetIncome))
    // console.log("leftover: rentAmount " + String(this.rentAmount))
    // console.log("leftover: percent " + String(this.percentIncome))

    // console.log("leftover: monthly deductions " + String(this.monthlyMandatoryDeductions))
    // console.log("leftover: monthly debt " + String(this.monthlyDebt))
    // console.log("leftover: monthly expenses " + String(this.monthlyExpenses))
    // console.log("leftover: monthly savings " + String(this.monthlySavings))

    this.rentAmount = this.monthlyGrossIncome * this.percentIncome * .01; 

    this.monthlyLeftOver = this.monthlyNetIncome -  (this.monthlyExpenses +
          this.monthlySavings + this.monthlyDebt + this.monthlyMandatoryDeductions)

          
  // console.log("break here")

  },

  

  setMonthlyRent(props) {
    // do anything else you need to process the rent
    // amount here, currently nothing else.
    this.monthlyRent = this.rentAmount
    
  },

 
  disallowNegatives() {
    //   if otherExpenses <= 0 {
    //       otherExpenses = 0
    //       currentOtherExpenses = 0
    //   }
    //   if groceriesAndDining <= 0 {
    //       groceriesAndDining = 0
    //       currentGroceriesAndDining = 0
    //   }
    //   if insurance <= 0 {
    //       insurance = 0
    //       currentInsurance = 0
    //   }
    //   if cellphoneBill <= 0 {
    //       cellphoneBill = 0
    //       currentCellphoneBill = 0
    //   }
    //   if subscriptionServices <= 0 {
    //       subscriptionServices = 0
    //       currentSubscriptionServices = 0
    //   }
    //   if transportation <= 0 {
    //       transportation = 0
    //       currentTransportation = 0
    //   }
    //   if utilities <= 0 {
    //       utilities = 0
    //       currentUtilities = 0
    //   }
  },

  distribute() {
    //   disallowNegatives()
  
    //   print(monthlyExpensesSlideInProgress)
    //   print(itemizedExpenseSlideInProgress)
    //   if currentOtherExpenses + Float(itemizedDistribution) > 0 {
    //       otherExpenses =  currentOtherExpenses +  Float( itemizedDistribution)
    //   } else { otherExpenses = 0}
    //   if currentGroceriesAndDining + Float(itemizedDistribution) > 0 {
    //       groceriesAndDining =  currentGroceriesAndDining +  Float( itemizedDistribution)
    //   } else { groceriesAndDining = 0}
    //   if currentInsurance + Float(itemizedDistribution) > 0 {
    //       insurance =  currentInsurance +  Float( itemizedDistribution)
    //   } else { insurance = 0}
    //   if currentCellphoneBill + Float(itemizedDistribution) > 0 {
    //       cellphoneBill =  currentCellphoneBill +  Float( itemizedDistribution)
    //   } else { cellphoneBill = 0}
    //   if currentSubscriptionServices + Float(itemizedDistribution) > 0 {
    //       subscriptionServices =  currentSubscriptionServices +  Float( itemizedDistribution)
    //   } else { subscriptionServices = 0}
    //   if currentTransportation + Float(itemizedDistribution) > 0 {
    //       transportation =  currentTransportation +  Float( itemizedDistribution)
    //   } else { transportation = 0}
    //   if currentUtilities + Float(itemizedDistribution) > 0 {
    //       utilities =  currentUtilities +  Float( itemizedDistribution)
    //   } else { utilities = 0}
  },

  allExpenses(): number {
    //   return Int(otherExpenses) +
    //       Int(groceriesAndDining) +
    //       Int(insurance) +
    //       Int(cellphoneBill) +
    //       Int(subscriptionServices) +
    //       Int(transportation) +
    //       Int(utilities)
    return 0;
  },

  anySlideInProgress(): boolean {
    //   if itemizedExpenseSlideInProgress || monthlyExpensesSlideInProgress {
    //       return true
    //   } else {
    //       return false
    //   }
    return true;
  },

  settleState() {
    //   performDistributionProcess()
    //   saveItemizedCurrent()
    //   print("CALCULATOR STATE SETTLE STATE")
    //   calculateOptimalRent()
  },

  saveItemizedCurrent() {
    //   currentUtilities = utilities
    //   currentOtherExpenses = otherExpenses
    //   print("SAVE ITEMIZED currentOtherExpenses \(currentOtherExpenses)")
    //   currentGroceriesAndDining = groceriesAndDining
    //   //print("CALCULATOR STATE SET")
    //   currentInsurance = insurance
    //   currentCellphoneBill = cellphoneBill
    //   currentTransportation = transportation
    //   currentSubscriptionServices = subscriptionServices
  },

  performDistributionProcess() {
    //   performPartialDistributionProcess()
    //   currentMonthlyExpenses = monthlyExpenses
  },

  performPartialDistributionProcess() {
    //   difference = monthlyExpenses - currentMonthlyExpenses
    //   itemize()
    //   distribute()
  },

  itemize() {
    //   // decide what the denominator of the fraction is
    //   // based on how many non-zero items there are.
    //   // repeated zeros maybe
    //   // only do this if direction of MEX slider is down
    //   // and a field is equal to 0
    //   // otherwise denominator = numberOfItemizedExpenses
    //   denominator = 0
    //   if monthlyExpensesSlideInProgress && directionIsNegative() {
    //       if utilities > 0 { denominator = denominator + 1 }
    //       if subscriptionServices > 0 { denominator = denominator + 1 }
    //       if otherExpenses > 0 { denominator = denominator + 1 }
    //       if transportation > 0 { denominator = denominator + 1 }
    //       if groceriesAndDining > 0 { denominator = denominator + 1 }
    //       if insurance > 0 { denominator = denominator + 1 }
    //       if cellphoneBill > 0 {denominator = denominator + 1}
    //   } else {
    //       denominator = numberOfItemizedExpenses
    //   }
    //   if denominator != 0 {
    //       itemizedDistribution = Int(difference) / denominator
    //   } else {
    //       itemizedDistribution = 0
    //   }
    //   print("IN ITEMIZE")
    //   print("monthly expenses is \(monthlyExpenses)")
    //   print("DENOMINATOR is \(denominator)")
    //   print("ITEMIZED DIST is \(itemizedDistribution)")
    //   print("GROCERIES \(groceriesAndDining)")
  },

  directionIsNegative(): boolean {
    //   print ("DIRECTION currentMonthlyExpenses \(currentMonthlyExpenses)")
    //   print ("DIRECTION monthlyExpenses \(monthlyExpenses)")
    //   return currentMonthlyExpenses > monthlyExpenses

    return true;
  },

  directionIsPositive(): boolean {
    //   return monthlyExpenses > currentMonthlyExpenses
    return true;
  },

  adjust() {
    //   print("ADJUST")
    //   disallowNegatives()
    //   monthlyExpenses = otherExpenses +
    //       transportation +
    //       utilities +
    //       subscriptionServices +
    //       groceriesAndDining +
    //       insurance +
    //       cellphoneBill
    //   print("ADJUST other expenses \(otherExpenses)")
  },

  allItemizedAreZero(): boolean {
    //   if otherExpenses > 0 {return false}
    //   if utilities > 0 {return false}
    //   if subscriptionServices > 0 {return false}
    //   if groceriesAndDining > 0 {return false}
    //   if transportation > 0 {return false}
    //   if insurance > 0 {return false}
    //   if cellphoneBill > 0 {return false}
    //   return true

    return true;
  },

  calculatetot(): boolean {
    //  calculateTot(currentItemizedExpense: Int, expenseConfigurator: SingleItemizedExpenseConfigurator ): boolean  {
    //   let itemizedExpensesToIncludeInCalculation = expenseConfigurator.itemizedExpensePropertyList.setAllItemizedExpenseProperties
    //   let finalAccumulatedTotal = itemizedExpensesToIncludeInCalculation.reduce(currentItemizedExpense, {
    //       accumulatingTotal, itemizedExpense in
    //       return accumulatingTotal + Int(self[keyPath: expenseConfigurator.calculatorStateMapping[itemizedExpense]!])
    //   })
    //   return finalAccumulatedTotal
  },

  loadFileDataIntoCalculatorModel() {
    // func loadFileDataIntoCalculatorModel(fileData: CalculationsFileContent, calculatorModel: CalculatorState) {
    //   calculatorModel.monthlyGrossIncome = Int(fileData.grossIncome) ?? 0
    //   calculatorModel.monthlyRent = Int(Double(fileData.rent) ?? 0)
    //   calculatorModel.monthlyExpenses = Float(fileData.expenses) ?? 0.0
    //   calculatorModel.monthlySavings = Int(fileData.savings) ?? 0
    //   calculatorModel.monthlyDebt = Int(fileData.debt) ?? 0
    //   calculatorModel.monthlyMandatoryDeductions = Int(fileData.mandatory) ?? 0
    //   calculatorModel.percentageIncome = Double(fileData.percentageOfIncome) ?? 0
    //   calculatorModel.monthlyLeftOver = Int(fileData.leftover) ?? 0
    //   calculatorModel.cellphoneBill = Float(fileData.itemcell) ?? 0
    //   calculatorModel.otherExpenses = Float(fileData.itemother) ?? 0
    //   calculatorModel.groceriesAndDining = Float(fileData.itemgroceries) ?? 0
    //   calculatorModel.insurance = Float(fileData.iteminsurance) ?? 0
    //   calculatorModel.subscriptionServices = Float(fileData.itemsubscriptions) ?? 0
    //   calculatorModel.utilities = Float(fileData.itemutil) ?? 0
    //   calculatorModel.transportation = Float(fileData.itemtranspo) ?? 0
  },

  loadPreviewDataIntoCalculatorModel() {
    // func loadPreviewDataIntoCalculatorModel(previewData: CalculatorState, calculatorModel: CalculatorState) {
    //   calculatorModel.monthlyGrossIncome = previewData.monthlyGrossIncome
    //   calculatorModel.monthlyRent = previewData.monthlyRent
    //   calculatorModel.monthlyExpenses = previewData.monthlyExpenses
    //   calculatorModel.monthlySavings = previewData.monthlySavings
    //   calculatorModel.monthlyDebt = previewData.monthlyDebt
    //   calculatorModel.monthlyMandatoryDeductions = previewData.monthlyMandatoryDeductions
    //   calculatorModel.percentageIncome = previewData.percentageIncome
    //   //calculatorModel.monthlyLeftOver = previewData.monthlyLeftOver
    //   calculatorModel.cellphoneBill = previewData.cellphoneBill
    //   calculatorModel.otherExpenses = previewData.otherExpenses
    //   calculatorModel.groceriesAndDining = previewData.groceriesAndDining
    //   calculatorModel.insurance = previewData.insurance
    //   calculatorModel.subscriptionServices = previewData.subscriptionServices
    //   calculatorModel.utilities = previewData.utilities
    //   calculatorModel.transportation = previewData.transportation
  },
};

export default CalculatorState;

//====================================

//example dictionary in javascript

// interface Person {
//   [id: string]: string | number | boolean;
// }

// const p: Person = {};
// p["id"] = "Michael";
// p["status"] = "vaccinated";
// p["smokes"] = false;
// p["income"] = 20000;

// console.log(p["id"]);
