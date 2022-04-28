import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";

import styled from "styled-components/native";
import appColors from "../../../../config/colors";



const MoveableView = (props) => {
  

  

  let [move2, setMove2] = useState(new Animated.ValueXY());
  move2.setValue({ x: 0, y: 0 }); // notice generic setValue method, passing in object
  let move2Ref = useRef(move2).current;

  const _panResponder = PanResponder.create({
    // asks to be the touch responder for a
    // press on the View

    onMoveShouldSetPanResponder: () => true,

    // actoins taken when the View has begun
    // responding to touch events

    onPanResponderGrant: () => {
      // console.log("grant move2Ref.x._value = " + String(move2Ref.x));
      move2Ref.setOffset({
        x: move2Ref.x._value,
        y: move2Ref.y._value,
      });

      move2Ref.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: (e, gesture) => {
      // console.log("move move2Ref.x._value = " + String(move2Ref.x));
      move2Ref.setValue({
        x: gesture.dx,
        y: gesture.dy,
      });
    },
    onPanResponderRelease: () => {
      // console.log(
      //   "release grant move2Ref.x._value = " + String(move2Ref.x)
      // );
      move2Ref.flattenOffset();
    },
  });

  return (
      <BaseButton {..._panResponder.panHandlers}
                       style={[ move2Ref.getLayout()

      ]} >

      </BaseButton>
  )
};

export default MoveableView;

const SomeView = styled.View``;

const slidingStart = (value: number) => {};

const SliderWrapper = styled.View`
  margin: 0px;
  height: 40px;
  justify-content: center;
`;
//this controls je

 
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderHeader = styled.Text`
  color: blue;
`;

const BaseButton = styled(Animated.View)`
  width:  ${vh(6)};
  height:  ${vh(6)};
  border-radius:  ${vw(100) * 0.5};
  border-width: 1;
  background-color: ${appColors.fannieBlue};
`;