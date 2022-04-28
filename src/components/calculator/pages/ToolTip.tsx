import React, { useState, useRef } from "react";

// styled-components
import styled from "styled-components/native";

import appColors from "../../../config/colors";

import fonts from "../../../config/fonts";

// react-native
import {
 
  Dimensions,
  Pressable,

  Animated,
} from "react-native";


let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

const ToolTipView = () => {
  let [pointerEventsBool, setPointerEventsBool] = useState(false); // doesn't work
  let [nativeDriverBool, setNativeDriverBool] = useState(true);
  let opacity2 = useRef(new Animated.Value(1)).current;
  let opacity3 = useRef(new Animated.Value(0)).current;
  let move1 = useRef(new Animated.ValueXY()).current;
  // let opacity = new Animated.Value(1);
  let scale1 = useRef(new Animated.Value(1)).current;

  // for scale:
  const animatedStyles = {
    transform: [
      {
        scale: scale1,
      },
    ],
  };

  // the problem: how to get the tab view reactive to mouse again
  // after tooltip goes away.
  return (
    <ToolTipContainer pointerEvents={pointerEventsBool ? "none" : "auto"}>
      {/* on press animate it */}
      <Pressable
        onPress={() =>
          Animated.sequence([
            Animated.sequence([
              Animated.timing(opacity2, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: nativeDriverBool,
              }),
              Animated.timing(opacity3, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: nativeDriverBool,
              }),
            ]),
            Animated.parallel([
              Animated.timing(opacity2, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: nativeDriverBool,
              }),
              Animated.timing(opacity3, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: nativeDriverBool,
              }),
            ]),
            Animated.timing(opacity3, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: nativeDriverBool,
            }),
            Animated.timing(move1, {
              toValue: 100,
              duration: 3000,
              useNativeDriver: nativeDriverBool,
            }),
            Animated.timing(scale1, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: nativeDriverBool,
            }),
          ]).start(() => {
            // console.log("animation done");
            setPointerEventsBool(false);
            windowHeight = 0;
            windowWidth = 0;
          })
        }
      >
        <BaseToolTip
          pointerEvents={pointerEventsBool ? "none" : "auto"}
          style={[{ opacity: opacity2 }, animatedStyles]}
        ></BaseToolTip>
      </Pressable>
      <AnimatedText
        style={{
          opacity: opacity3,
          transform: move1.getTranslateTransform(),
        }}
      >
        Amazing Text
      </AnimatedText>
    </ToolTipContainer>
  );
};

export default ToolTipView;

const ToolTipContainer = styled.View`
  z-index: 100;
  position: absolute;
  align-self: center;
  /* height: ${windowHeight};
  width: ${windowWidth}; */
`;

const ToolTip = styled.View`
  /* use Dimensions for width and height, also with image on pay deductions */
  width: 300px;
  height: 200px;
  background-color: ${appColors.fannieBlue};
`;

const BaseToolTip = styled(Animated.View)`
  width: 300px;
  height: 200px;
  background-color: ${appColors.fannieBlue};
`;

const AnimatedText = styled(Animated.Text)`
  color: red;
  font-family: ${fonts.sourceSansProBlackItalic};
  font-size: 60px;
`;

const AnimatedImage = styled(Animated.Image)``;
