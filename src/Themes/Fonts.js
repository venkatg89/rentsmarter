/**
 * 
 * Branding - Fonts
 */

import DeviceInfo from  'react-native-device-info'
import Metrics from './Metrics'


const type = {

    //These keys are valid as they are contextually defined. 
    //As long as Components leverage the keys below, the font can be declared here.


    bold: 'OpenSans-Bold',
    boldItalic: 'OpenSans-BoldItalic',
    boldSecondary: 'OpenSans-ExtraBold',
    boldItalicSecondary:  `OpenSans-ExtraBoldItalic`,
    baseItalic: 'OpenSans-Italic',
    light: 'OpenSans-Light',
    lightItalic: 'OpenSans-LightItalic',
    reguler: 'OpenSans-Regular',
    boldTertiary: 'OpenSans-SemiBold',
    openSansSemiBoldItalic: 'OpenSans-SemiBoldItalic',

    base: 'SourceSansPro-Black',
    baseItalicSecondary: 'SourceSansPro-BlackItalic',
    boldText : 'SourceSansPro-Bold',
    boldItalicText: 'SourceSansPro-BoldItalic',
    lightSecondary: 'SourceSansPro-ExtraLight',
    extraLightItalic: 'SourceSansPro-ExtraLightItalic',
    italicText: 'SourceSansPro-Italic',
    proLight: 'SourceSansPro-Light',
    proLightItalic:  'SourceSansPro-LightItalic',
    regularText:  'SourceSansPro-Regular',
    semiboldText:  'SourceSansPro-SemiBold',
    semiboldItalicText:  'SourceSansPro-SemiBoldItalic',
  };

  //sizes need to be updated to reflect the font family used in the branding  
  // Texts that use sizes need to rely on these values in alogorithm form
  // Example: Fonts.size.input *Metrics.baseMargin * 0.00125

  const size = {
      h1: 38,
      h2: 34,
      h3: 30,
      h4: 26,
      h5: 23,
      h6: 20,
      xr: 16,
      input: 18,
      extra: 20,
      reguler: 16,
      medium: 14,
      small: 12,
      tiny: 8.5,
  }

  const weight = {
      light:  '100'
  }

  const style = {
    largeTextStyle: {
        fontFamily: type.regularText,
        fontSize: size.reguler
    }
  }



  export default {
      type, 
      size,
      style,
      weight
  };