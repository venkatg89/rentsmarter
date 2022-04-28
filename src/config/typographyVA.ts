/**
 * @providesModule TextStyles
 */
 import React from "react";

 // styled-components
 import styled from "styled-components/native";
 import fonts from "../config/fonts";
 
 const largeText: number = 16;
 const mediumText: number = 14;
 const smallText: number = 12;
 const smallerText: number = 8;
 
 // FONTS FOR BOLD 360 VIRTUAL ASSISTANT
 const regularText: string = fonts.openSansRegular;
 const semiboldText: string = fonts.openSansSemibold;
 const italicText: string = fonts.openSansItalic;
 const boldText: string = fonts.openSansBold;
 const boldItalicText: string = fonts.openSansBoldItalic;
 const semiboldItalicText: string = fonts.openSansSemiBoldItalic;
 
 // CURRENT LARGE, MEDIUM, SMALL SPECIFIED
// IF WE NEED DIFFERENT SIZES, WE SHOULD CONFORM
// TO THIS STANDARD: USE LARGE MEDIUM OR SMALL WITH PX SIZE
// ADDED, AS IN:
//
//largeTextStyle20: styled.Text`
// font-family: ${regularText};
// font-size:  20px;
// `,
//

 const typography = {
   // large
   largeTextStyle: styled.Text`
     font-family: ${regularText};
     font-size: ${largeText}px;
   `,
 
   largeTextSemiBold: styled.Text`
     font-family: ${semiboldText};
     font-size: ${largeText}px;
   `,
 
   largeTextSemiBoldItalic: styled.Text`
     font-family: ${semiboldItalicText};
     font-size: ${largeText}px;
   `,
 
   largeTextItalic: styled.Text`
     font-family: ${italicText};
     font-size: ${largeText}px;
   `,
 
   largeTextBold: styled.Text`
     font-family: ${boldText};
     font-size: ${largeText}px;
   `,
 
   largeTextBoldItalic: styled.Text`
     font-family: ${boldItalicText};
     font-size: ${largeText}px;
   `,
 
   // medium
   mediumTextStyle: styled.Text`
     font-family: ${regularText};
     font-size: ${mediumText}px;
   `,
 
   mediumTextSemiBold: styled.Text`
     font-family: ${semiboldText};
     font-size: ${mediumText}px;
   `,
 
   mediumTextSemiBoldItalic: styled.Text`
     font-family: ${semiboldItalicText};
     font-size: ${mediumText}px;
   `,
 
   mediumTextItalic: styled.Text`
     font-family: ${italicText};
     font-size: ${mediumText}px;
   `,
 
   mediumTextBold: styled.Text`
     font-family: ${boldText};
     font-size: ${mediumText}px;
   `,
 
   mediumTextBoldItalic: styled.Text`
     font-family: ${boldItalicText};
     font-size: ${mediumText}px;
   `,
 
   // small
   smallTextStyle: styled.Text`
     font-family: ${regularText};
     font-size: ${smallText}px;
   `,
 
   smallTextSemiBold: styled.Text`
     font-family: ${semiboldText};
     font-size: ${smallText}px;
   `,
 
   smallTextSemiBoldItalic: styled.Text`
     font-family: ${semiboldItalicText};
     font-size: ${smallText}px;
   `,
 
   smallTextItalic: styled.Text`
     font-family: ${italicText};
     font-size: ${smallText}px;
   `,
 
   smallTextBold: styled.Text`
     font-family: ${boldText};
     font-size: ${smallText}px;
   `,
 
   smallTextBoldItalic: styled.Text`
     font-family: ${boldItalicText};
     font-size: ${smallText}px;
   `,
 };
 
 export default typography;
 
 
 