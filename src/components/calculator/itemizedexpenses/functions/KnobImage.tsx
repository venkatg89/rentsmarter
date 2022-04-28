import { Dimensions, PixelRatio } from "react-native";
import ImageResizer from 'react-native-image-resizer';
import { Base64 } from 'js-base64';

import { ResizeFormat, ResizeMode } from "react-native-image-resizer";

import thumbImage49 from "../../../../../assets/Knob-49px.png";
import thumbImage47 from "../../../../../assets/Knob-47px.png";
import thumbImage44 from "../../../../../assets/Knob-44px.png";
import thumbImage42 from "../../../../../assets/Knob-42px.png";
import thumbImage39 from "../../../../../assets/Knob-39px.png";
import thumbImage37 from "../../../../../assets/Knob-37px.png";
import thumbImage36 from "../../../../../assets/Knob-36px.png";
import thumbImage34 from "../../../../../assets/Knob-34px.png";
import thumbImage32 from "../../../../../assets/Knob-32px.png";
import thumbImage30 from "../../../../../assets/Knob-30px.png";
import thumbImage28 from "../../../../../assets/Knob-28px.png";
import thumbImage26 from "../../../../../assets/Knob-26px.png";
import thumbImage25 from "../../../../../assets/Knob-25px.png";

import thumbImage54 from "../../../../../assets/Knob-54px.png";
import thumbImage52 from "../../../../../assets/Knob-52px.png";
import thumbImage40 from "../../../../../assets/Knob-40px.png";
import thumbImage38 from "../../../../../assets/Knob-38px.png";

// const windowWidth = Dimensions.get("window").width;


export const knobImage = () => {
  

  // let path = "Knob-54px.png"
  // let maxWidth = 24;
  // let maxHeight = 24;
  // let compressFormat = "PNG";
  // let quality = 100; // only used for jpeg
  // let rotation = 0;
  // let outputPath = ".";
  // let options = {};
  // let keepMeta = false;

  // options mode is similar to react-native Image's resizeMode: either contain (the default), 
  // cover, or stretch. contain will fit the image within width and height,
  //  preserving its ratio. cover preserves the aspect ratio, 
  //  and makes sure the image is at least width wide or height tall. 
  // stretch will resize the image to exactly width and height.

  // do a file exists test here.
  // const assetPath = "../../../../../assets/Knob-54px.png" 
  // const pathURI = "file://" + assetPath

  // const uri64 =  Base64.encodeURI(pathURI ); 
  // const import64 =  Base64.encodeURI("file://" + thumbImage54 ); 
  // const image = 'data:image/jpeg;base64,' + import64; 

  // console.log("uri64 ", uri64);
  // console.log("import64 ", import64);
  // console.log("image ", image);
   

  // ImageResizer.createResizedImage(image, maxWidth, maxHeight, 
  //   'PNG', quality, rotation, outputPath)
  //   //, keepMeta = false,
  //   //options = {mode: 'contain'})
  // .then(response => {
  //   console.log("response.uri ", response.uri)
  //   console.log("response.path ", response.path)
  //   console.log("response.name ", response.name)
  //   console.log("response.size ", response.size)

  //   // response.uri is the URI of the new image that can now be displayed, uploaded...
  //   // response.path is the path of the new image
  //   // response.name is the name of the new image with the extension
  //   // response.size is the size of the new image
  // })
  // .catch(err => {
  //   console.log("err on ImageResizer", err)
  //   // Oops, something went wrong. Check that the filename is correct and
  //   // inspect err to get more details.
  // });

   // pxratio =  (14)
  // 39, 37, 28, 26, 25
  // if (pxratio >= 39) { return thumbImage39}
  // if (pxratio >= 32 && pxratio <= 38) {return thumbImage37}
  // if (pxratio >= 29 && pxratio <= 31) {return thumbImage28}
  // if (pxratio >= 26 && pxratio <= 28) {return thumbImage26}
  // if (pxratio >= 20 && pxratio <= 25) {return thumbImage25}


  let pxratio = PixelRatio.getPixelSizeForLayoutSize(16);
    //console.log("pxratio ", pxratio)
   
  //  pxratio = (16)
  // note had it at 54 and 52 for awhile, with success
  // then on build 2.34, suddenly the knobs were big again for
  // pix 3 and 6. don't know why. 
  // 44,42,32,30,28
   if (pxratio >= 44) { return thumbImage39}
   if (pxratio >= 40 && pxratio <= 43) {return thumbImage37}
   if (pxratio >= 32 && pxratio <= 39) {return thumbImage32}
   if (pxratio >= 30 && pxratio <= 31) {return thumbImage30}
   if (pxratio >= 20 && pxratio <= 29) {return thumbImage28}

  // // pxratio = (18)
  // // 49,47,36,34,32
  // if (pxratio >= 49) {
  //   return thumbImage49;
  // }
  // if (pxratio >= 42 && pxratio <= 48) {
  //   return thumbImage47;
  // }
  // if (pxratio >= 36 && pxratio <= 42) {
  //   return thumbImage36;
  // }
  // if (pxratio >= 34 && pxratio <= 35) {
  //   return thumbImage34;
  // }
  // if (pxratio >= 30 && pxratio <= 32) {
  //   return thumbImage32;
  // }


  // pxratio = (20)
  // 54,52,30,38,36
  // console.log("pxratio ", pxratio)
  // console.log("ok")
  // if (pxratio >= 54) {
  //   return thumbImage54;
  // }
  // if (pxratio >= 50 && pxratio <= 53) {
  //   return thumbImage52;
  // }
  // if (pxratio >= 40 && pxratio <= 49) {
  //   return thumbImage40;
  // }
  // if (pxratio >= 37 && pxratio <= 39) {
  //   return thumbImage34;
  // }
  // if (pxratio >= 30 && pxratio <= 36) {
  //   return thumbImage32;  
  // }
};

/*

+5    39 (14) 44 (16) 49 (18) 54 (20) pix 3
+5    37 (14) 42 (16) 47 (18) 52 (20) pix 6
+4    28 (14) 32 (16) 36 (18) 40 (20) sam J (2016)
+4    26 (14) 30 (16) 34 (18) 38 (20) samsung galaxy a12
+3/4  25 (14) 28 (16) 32 (18) 36 (20) moto power

  
 




*/
