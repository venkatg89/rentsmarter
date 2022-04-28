import React, { ComponentType, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import useNestedModals, {
  INestedModalsContext,
} from "react-native-nested-modals";
import email from "react-native-email";

import ModalB from "./modals/ModalB";
import ModalC from "./modals/ModalC";
import ModalD from "./modals/ModalD";

import appColors from "../config/colors";
import styled from "styled-components/native";
import analytics from "@react-native-firebase/analytics";

export default function OpenBtns2() {
  const { openModal, closeModal }: INestedModalsContext = useNestedModals();
  const handleEmail = () => {
  
    const to = [
      "rent_smarter@fanniemae.com",
    ]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [""], // string or array of email addresses
      bcc: [""], // string or array of email addresses
      subject: "Let us know how you use Rent Smarter",
      body: "We really want to know how we can help you Rent Smarter!",
    }).catch(console.error);

    

  };

  return (
    <View style={styles.container}>
      <Btn
        backgroundColor={"white"}
        text={"Terms of Use"}
        onPress={() => {
          // analytics
          analytics().logEvent("Settings_ModalPage_TermsofUse_Btn_Press", {
              id: 30000003,
              event: "terms of use",
              description: ["reading terms of use"],
            });

            //console.log("terms of use called!!")
          let newModalBIdx = openModal(<ModalB />, {
            style: { margin: 10 },
            withClickOutside: true,
          });
          //console.log({ newModalBIdx });
        }}
      />
      <Btn
        backgroundColor={"white"}
        text={"Privacy Notice"}
        onPress={() => {
           analytics().logEvent("Settings_ModalPage_PrivacyNoti_Btn_Press", {
              id: 30000004,
              event: "privacy notice",
              description: ["reading privacy notice"],
            });

            //console.log("privacy called!!")

          let newModalCIdx = openModal(<ModalC />, {
            style: { margin: 10 },
            withClickOutside: true,
          });
          //console.log({ newModalCIdx });
        }}
      />

      <Btn
        backgroundColor={"white"}
        text={"Send us Feedback"}
        onPress={handleEmail}
      />

      <IdentityView style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold" }}>Rent Smarter</Text>
        <Text>v2.38</Text>
        <Text>build 53 (Android)</Text>
        <Text>(C) 2022 Fannie Mae</Text>
      </IdentityView>

      <BtnClose
        backgroundColor={appColors.fannieBlue}
        text={"close"}
        onPress={closeModal}
      />
    </View>
  );
}

const Btn: ComponentType<{
  backgroundColor: string;
  text: string;
  onPress: () => void;
}> = ({ backgroundColor, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor }]}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};

const BtnClose: ComponentType<{
  backgroundColor: string;
  text: string;
  onPress: () => void;
}> = ({ backgroundColor, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor }]}
    >
      <Text style={styles.btnTxtClose}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  btn: { borderRadius: 15, height: 50, width: 300, margin: 20 },
  btnTxt: { textAlign: "center", padding: 15 },
  btnTxtClose: { textAlign: "center", padding: 15, color: "white" },
});

const Spacer = styled.View`
  flex: 1;
`;

// const TitleText = styled(typography.largeTextStyle)`
// padding-left: 16px;
// padding-vertical: 20px;
// `

// const RowText2 = styled(typography.mediumTextStyle)`
// padding-right: 16px;
// `

const IdentityView = styled.View`
  padding-vertical: 50px;
`;
