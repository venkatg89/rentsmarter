/**
 * @providesModule TextStyles
 */
import React from "react";

// styled-components
import styled from "styled-components/native";
import fonts from "../config/fonts";
import appColors from "../config/colors";

const largerText: number = 20;
const largeText: number = 16;
const mediumText: number = 14;
const smallText: number = 12;

// FONTS FOR RENT SMARTER APP
const regularText: string = fonts.sourceSansProRegular;
const semiboldText: string = fonts.sourceSansProSemiBold;
const italicText: string = fonts.sourceSansProItalic;
const boldText: string = fonts.sourceSansProBold;
const boldItalicText: string = fonts.sourceSansProBoldItalic;
const semiboldItalicText: string = fonts.sourceSansProSemiBoldItalic;

const fannieBlack = appColors.fannieBlack;

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

    // larger
  largerTextStyle: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${regularText};
    font-size: ${largerText}px;
  `,

  largerTextSemiBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldText};
    font-size: ${largerText}px;
  `,

  largerTextSemiBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldItalicText};
    font-size: ${largerText}px;
  `,

  largerTextItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${italicText};
    font-size: ${largerText}px;
  `,

  largerTextBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldText};
    font-size: ${largerText}px;
  `,

  largerTextBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldItalicText};
    font-size: ${largerText}px;
  `,


  // large
  largeTextStyle: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${regularText};
    font-size: ${largeText}px;
  `,

  largeTextSemiBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldText};
    font-size: ${largeText}px;
  `,

  largeTextSemiBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldItalicText};
    font-size: ${largeText}px;
  `,

  largeTextItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${italicText};
    font-size: ${largeText}px;
  `,

  largeTextBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldText};
    font-size: ${largeText}px;
  `,

  largeTextBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldItalicText};
    font-size: ${largeText}px;
  `,

  // medium
  mediumTextStyle: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${regularText};
    font-size: ${mediumText}px;
  `,

  mediumTextStyleBlue: styled.Text`
    color: ${appColors.fannieBlue};
    font-family: ${regularText};
    font-size: ${mediumText}px;
  `,

  mediumTextSemiBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldText};
    font-size: ${mediumText}px;
  `,

  mediumTextSemiBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldItalicText};
    font-size: ${mediumText}px;
  `,

  mediumTextItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${italicText};
    font-size: ${mediumText}px;
  `,

  mediumTextBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldText};
    font-size: ${mediumText}px;
  `,

  mediumTextBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldItalicText};
    font-size: ${mediumText}px;
  `,

  // small
  smallTextStyle: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${regularText};
    font-size: ${smallText}px;
  `,

  smallTextSemiBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldText};
    font-size: ${smallText}px;
  `,

  smallTextSemiBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${semiboldItalicText};
    font-size: ${smallText}px;
  `,

  smallTextItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${italicText};
    font-size: ${smallText}px;
  `,

  smallTextBold: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldText};
    font-size: ${smallText}px;
  `,

  smallTextBoldItalic: styled.Text`
    color: ${appColors.fannieBlack};
    font-family: ${boldItalicText};
    font-size: ${smallText}px;
  `,
};

export default typography;
