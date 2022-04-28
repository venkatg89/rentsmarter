import React from "react";

import styled from "styled-components/native";
 


import Svg, {
  Circle,
  // Ellipse,
  // G,
  // Text,
  // TSpan,
  // TextPath,
  // Path,
  // Polygon,
  // Polyline,
  // Line,
  // Rect,
  // Use,
  // Image,
  // Symbol,
  // Defs,
  // LinearGradient,
  // RadialGradient,
  // Stop,
  // ClipPath,
  // Pattern,
  // Mask,
} from "react-native-svg";

function DataItemCircle(props) {
  return (
    
      <Svg height="100%" width="15%" viewBox="0 0 100 100">
        <Circle
          cx="40"
          cy="50"
          r="35"
          stroke={props.color}
          strokeWidth="2.5"
          fill={props.color}
        />
      </Svg>
  );
}

export default DataItemCircle;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

const Container = styled.View`
  justify-content: center;
  background-color: white;
`;
