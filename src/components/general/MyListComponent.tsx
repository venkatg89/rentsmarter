import React from "react";

import styled from "styled-components/native";

import { Text } from "react-native";


function MyListComponent(props) {
  return (
    <View>
      {props.notesData.map((noteBody, index) => {
        return (
          <Text>
            {noteBody.id} {noteBody.note}{" "}
          </Text>
        );
      })}
    </View>
  );
}

// const MyListComponent = (props) => (
//   <View>
//     {props.notesData.map((noteBody, index) => {
//       return (
//         <Text>
//           {noteBody.id} {noteBody.note}{" "}
//         </Text>
//       );
//     })}
//     <Text>hello</Text>
//   </View>
// );

export default MyListComponent;

const View = styled.View`
  flex: 1;
`;
