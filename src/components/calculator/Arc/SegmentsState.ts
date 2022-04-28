
import { valueToNode } from "@babel/types";
import React, { useState } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { useSelector } from "react-redux";
 

import {AppDispatch, RootState, store} from "../../../redux/store/configurePersistentStore"; // this said configureStore before...
 

import { changearcsegment1begin,
          changearcsegment1end,
          changearcsegment2begin,
          changearcsegment2end,
          changearcsegment3begin,
          changearcsegment3end,
          changearcsegment4begin,
          changearcsegment4end,
          changearcsegment5begin,
          changearcsegment5end,
          changearcsegment6begin,
          changearcsegment6end,
} from '../../../redux/actions/actions'

const select = (state, props) => ({
  calculatorUIData: state.calculatorUIData,
  calculatorCalculationsData: state.calculatorCalculationsData,
  arcData: state.arcData,
});

interface ISegmentsState {
  rentAmountValue: number;
  expensesValue: number;
  deductionsValue: number;
  debtValue: number;
  savingsValue: number;
  remainingAmountValue: number;

  // these add up to 100
  rentAmountPercent: number;
  expensesPercent: number;
  deductionsPercent: number;
  debtPercent: number;
  savingsPercent: number;
  remainingAmountPercent: number;

  segment1Start: number;
  segment1End: number;
  segment2Start: number;
  segment2End: number;
  segment3Start: number;
  segment3End: number;

  //save, to stop infinite loop

  save_segment1Start: number;
  save_segment1End: number;
  save_segment2Start: number;
  save_segment2End: number;

  save_segment3Start: number;
  save_segment3End: number;
  save_segment4Start: number;
  save_segment4End: number;

  save_segment5Start: number;
  save_segment5End: number;
  save_segment6Start: number;
  save_segment6End: number;

  segment4Start: number;
  segment4End: number;
  segment5Start: number;
  segment5End: number;
  segment6Start: number;
  segment6End: number;

  rentAmountArcSpan: number;
  expensesArcSpan: number;
  deductionsArcSpan: number;
  debtArcSpan: number;
  savingsArcSpan: number;
  remainingAmountArcSpan: number;

  // methods
  calculateArc(props: any, dispatch: any ): void; //note: passing in props from  redux-connected react component
  calculateArc2(props: any, dispatch: any ): void;
}

// const select = (state, props) => ({
//     calculatorUIData: state.calculatorUIData,
//     calculatorCalculationsData: state.calculatorCalculationsData,
//   });

const SegmentsState: ISegmentsState = {
  rentAmountValue: 1000.0,
  expensesValue: 500.0,
  deductionsValue: 1000.0,
  debtValue: 500.0,
  savingsValue: 1000.0,
  remainingAmountValue: 1000.0,

  // these add up to 100
  rentAmountPercent: 0,
  expensesPercent: 0,
  deductionsPercent: 0,
  debtPercent: 0,
  savingsPercent: 0,
  remainingAmountPercent: 0,

  segment1Start: 0,
  segment1End: 0,
  segment2Start: 0,
  segment2End: 0,
  segment3Start: 0,
  segment3End: 0,

  segment4Start: 0,
  segment4End: 0,
  segment5Start: 0,
  segment5End: 0,
  segment6Start: 0,
  segment6End: 0,

  rentAmountArcSpan: 0,
  expensesArcSpan: 0,
  deductionsArcSpan: 0,
  debtArcSpan: 0,
  savingsArcSpan: 0,
  remainingAmountArcSpan: 0,

  calculateArc(props, dispatch) {
    
    
    const { calculatorCalculationsData, calculatorUIData, arcData } = props;

    const arcEnd = 180

    

// get the percentage of monthly gross incometh for each value
//   rentAmountPercent = ((rentAmountValue) / Double(calculatorState.monthlyGrossIncome)) * 100 WHERE
     
    this.rentAmountPercent = calculatorUIData.percent_income;
    this.expensesPercent =
      (calculatorUIData.expenses / calculatorUIData.gross_income) * 100;
    
      // console.log("gross income : ")
      // console.log(calculatorUIData.gross_income )
      // console.log("expenses : ")
      // console.log(calculatorUIData.expenses )
      // console.log("expensesPercent: ")
      // console.log(this.expensesPercent)
      this.savingsPercent =
      (calculatorUIData.savings / calculatorUIData.gross_income) * 100;
    this.debtPercent = (calculatorUIData.debt / calculatorUIData.gross_income) * 100;
    this.deductionsPercent =
      (calculatorUIData.pay_deductions  / calculatorUIData.gross_income) * 100;

//  remainingAmountPercent = ((remainingAmountValue) / Double(calculatorState.monthlyGrossIncome)) * 100 WHERE

  
// get the arc percentage representing value percentage
// that is, 11 percent of the arc on a 90 degree arc
// = 10 percent of the value (because 90 < 100)

    const arcSpanFactor: number = 56;

    this.rentAmountArcSpan = (this.rentAmountPercent/arcSpanFactor) * 100
    this.expensesArcSpan = (this.expensesPercent / arcSpanFactor) * 100;
    this.savingsArcSpan = (this.savingsPercent / arcSpanFactor) * 100;
    this.debtArcSpan = (this.debtPercent / arcSpanFactor) * 100;
    this.deductionsArcSpan = (this.deductionsPercent / arcSpanFactor) * 100;

//   remainingAmountArcSpan = (remainingAmountPercent/56) * 100 WHERE

    // arc segment setup

    // make the calculation
    // rent percent ======================
    this.segment1Start = 0
    this.segment1End = this.segment1Start + this.rentAmountArcSpan;
    if (this.segment1End > arcEnd) {
      this.segment1End = arcEnd;
    }
  
    // set global state
    
    // if (this.segment1Start != this.save_segment1Start) { dispatch(changearcsegment1begin(this.segment1Start))} ;
    // if (this.segment1End != this.save_segment1End) { dispatch(changearcsegment1end(this.segment1End))};
    // this.save_segment1End = this.segment1End
    // this.save_segment1Start = this.segment1Start
    
    // expenses ============================
    this.segment2Start = this.segment1End
    this.segment2End = this.segment2Start + this.expensesArcSpan;
   
    if (this.segment2End > arcEnd) {
      this.segment2End = arcEnd;
    }

    // if (this.segment2Start != this.save_segment2Start) { dispatch(changearcsegment2begin(this.segment2Start))} ;
    // if (this.segment2End != this.save_segment2End) { dispatch(changearcsegment2end(this.segment2End))};
    // this.save_segment2End = this.segment2End
    // this.save_segment2Start = this.segment2Start
 

        // deductions ============================
    this.segment3Start = this.segment2End
    this.segment3End = this.segment3Start + this.deductionsArcSpan;
    if (this.segment3End > arcEnd) {
      this.segment3End = arcEnd;
    }

    if (this.segment3Start != this.save_segment3Start) { dispatch(changearcsegment3begin(this.segment3Start))} ;
    if (this.segment3End != this.save_segment3End) { dispatch(changearcsegment3end(this.segment3End))};
    this.save_segment3End = this.segment3End
    this.save_segment3Start = this.segment3Start
 
        // debt ============================

    this.segment4Start = this.segment3End
    this.segment4End = this.segment4Start + this.debtArcSpan;
    if (this.segment4End > arcEnd) {
      this.segment4End = arcEnd;
    }

    if (this.segment4Start != this.save_segment4Start) { dispatch(changearcsegment4begin(this.segment4Start))} ;
    if (this.segment4End != this.save_segment4End) { dispatch(changearcsegment4end(this.segment4End))};
    this.save_segment4End = this.segment4End
    this.save_segment4Start = this.segment4Start
 

        // savings ============================
    this.segment5Start = this.segment4End
    this.segment5End = this.segment5Start + this.savingsArcSpan;
    if (this.segment5End > arcEnd) {
      this.segment5End = arcEnd;
    }

    if (this.segment5Start != this.save_segment5Start) { dispatch(changearcsegment5begin(this.segment5Start))} ;
    if (this.segment5End != this.save_segment5End) { dispatch(changearcsegment5end(this.segment5End))};
    this.save_segment5End = this.segment5End
    this.save_segment5Start = this.segment5Start
 

        // leftover ============================
    this.segment6Start = this.segment5End
    this.segment6End = arcEnd

    if (this.segment6Start != this.save_segment6Start) { dispatch(changearcsegment6begin(this.segment6Start))} ;
    if (this.segment6End != this.save_segment6End) { dispatch(changearcsegment6end(this.segment6End))};
    this.save_segment6End = this.segment6End
    this.save_segment6Start = this.segment6Start
    
    // console.log("segment6Start: ")
    // console.log(this.segment6Start )
    // console.log("segment6End: ")
    // console.log(this.segment6End)
  },

// working with 90 degrees
// 180 start to 270 end
  calculateArc2(props, dispatch) {
    
    const { calculatorCalculationsData, calculatorUIData } = props;
 
    //this.rentAmountValue = calculatorUIData.rentAmount; WHERE
    this.expensesValue = calculatorUIData.expenses;
    this.deductionsValue = calculatorUIData.pay_deductions;
    this.debtValue = calculatorUIData.debt;
    this.savingsValue = calculatorUIData.savings;
    //this.remainingAmountValue = calculatorUIData.monthlyLeftOver; WHERE

    // NOTE
    //Double(calculatorState.monthlyGrossIncome - Int(calculatorState.rentAmount))
  },


};


export default  SegmentsState;
 


// example getters and setters in javascript
let o = {
  dataval: 0,

  get accessDataVal() {
    return this.dataval;
  },
  set accessDataVal(value) {
    this.dataval = value;
  },
};

// MPI ASYNC EXAMPLE


// // printDelayed is a 'Promise<void>'
// async function printDelayed(elements: string[]) {
//   for (const element of elements) {
//     await delay(400);
//     // console.log(element);
//   }
// }
// async function delay(milliseconds: number) {
//   return new Promise<void>((resolve) => {
//     setTimeout(resolve, milliseconds);
//   });
// }
// printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
//   // console.log();
//   // console.log("Printed every element!");
// });


