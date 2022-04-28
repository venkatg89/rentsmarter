import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import OpenBtns2 from "../OpenBtns2";
import styled from "styled-components/native";
import typography from "../../config/typographyVA";
import appColors from "../../config/colors";
import analytics from "@react-native-firebase/analytics";

export default function ModalA() {
   
  useEffect(() => {
     analytics().logEvent("Settings_ModalPage_Arrived", {
        id: 20000007,
        event: "settings modal screen page - top level",
        description: ["on settings modal screen page"],
      });
  }, []);

  return (
    <View style={styles.container}>
      <TitleText>Settings</TitleText>
      <Spacer />
      <OpenBtns2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.grayNeutral,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Spacer = styled.View`
  flex: 1;
`;

const TitleText = styled(typography.largeTextStyle)`
  padding-left: 16px;
  padding-vertical: 20px;
`;

const RowText2 = styled(typography.mediumTextStyle)`
  padding-right: 16px;
`;
