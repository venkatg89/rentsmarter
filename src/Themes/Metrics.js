
/** Branding - Metrics 

This is where the Tennant defines the measurement based metrics used in their branding

*/
import { Dimensions, Platform, PixelRatio } from "react-native";

const {width, height} = Dimensions.get('window')

/**
 * Metrics Context Key System
 * 
 * Individual Styling elements
 * structure: (component)(Attributes)
 * Example : (input)(BorderWidth)
 * Example : marginLeft: Metrics.baseMargin * Metrics.screenHeight * 0.001
 */


const metrics = {
    marginHorizental: 10,
    marginVertical: 10,
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    doubleSetion: 50,
    century: 100,
    doubleCentury: 200,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    aspectRatio: height / width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    inputBorderRadius: 0,
    inputBorderBottomWidth:1,
    inputBorderTopWidth: 0,
    inputBorderLeftWidth: 0,
    inputBorderRightWidth: 0,
    buttonBorderWidth: 1,
    buttonRadius: 0,
    icons:{
        tiny: 25,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        xl: 200
    },
    modal: {
        borderWidth: 1,
        borderTopRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        flex: 0,
        alignSelf: 'center',
    },

};

/* 

wp, hp, & sc are auto scalling for sizes 

wp is a percentage width-based sizing and is used like so : wp('10%')
hp is a percentage height-based sizing and is used like so : hp('10%')
sc is a base scalling that is moderate and is a good baseline if you dont have percentages,
  it uses the pixel/pt/dp size you give it like so: sc(14)

*/


export const wp = (widthPer) => {
    const compWidth = typeof widthPer === 'number' ? widthPer : parseFloat(widthPer);
    return PixelRatio.roundToNearestPixel(metrics.screenWidth * compWidth /100);
};

export const hp = heightPer => {
    const compHeight = typeof heightPer === 'number' ? heightPer : parseFloat(heightPer);
    return PixelRatio.roundToNearestPixel(metrics.screenHeight * compHeight / 100);
};

const baselineWidth = 350;
export const sc = size => {
    const scale = width / baselineWidth * size;
    return size + (scale - size) * 0.5;
};

export default metrics;