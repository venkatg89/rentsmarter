 
 import React from "react";

 // styled-components
 import styled from 'styled-components/native';

 type aColor = '#000000' | '#FFFFFF' ; 

 
 enum appColors {
    // black = '#000000',
    // night = '#333333',
    // charcoal = '#474747',
    // gray = '#7D7D7D',
    // lightishgray = '#9D9D9D',
    // lightgray = '#D6D6D6',
    // smoke = '#EEEEEE',
    // white = '#FFFFFF',
    // ypsDark = '#47546E',
    // yps = '#637599',
    // ypsLight = '#7B92BF',
    // cosmic = '#963D32',

     
    // company
    fannieBlack = `#121212`,
    fannieBlue = `#09639D`,
    fannieWhite =    '#FFFFFF', // F8F8F8

    // rent smarter
    brandColor = `#0A649D`,
    brandText = '#0A6FAD',
    grayNeutral = `#F2F2F7`,


    keyboardGray = `#D4D7DC`,
    messageText = fannieBlack,
    placeholderText = `#979797`,
    textEnter = `#F1F5F8`,
    bubbleGray = `#F2F2F2`,


    // calculator colors
    debtBlue = '#1887CC',
    deductionsAqua = '#75D3E6',
    expensesAqua = '#26A4BD',
    grossIncomeSliderBlueBG = '#0A649D',
    percentIncomeSliderBGGreen = '#008719',

    remainingAmountBlue = '#05314D',
    remainingAmountSliderGreenBG = '#008719',
    rentAmountGreen = '#008719',
    savingsGold = '#CC7B0A',
    spentTooMuchMaroonRed = '#800000',

    calculatorBackGround = `#DEDEDE`,


  };
 export default appColors;


 // instead of enums which are terrible
 // do this:

 const RSCOLORS = {

   
  // company
  fannieBlack : `#121212`,
  fannieBlue : `#09639D`,

  // rent smarter
  brandColor : `#0A649D`,
  brandText : '#0A6FAD',
  grayNeutral : `#F2F2F7`,


} as const;

type RSCOLORS = typeof RSCOLORS[keyof typeof RSCOLORS];

const d1: RSCOLORS = RSCOLORS.brandColor;
let d2: RSCOLORS = RSCOLORS.brandText;

