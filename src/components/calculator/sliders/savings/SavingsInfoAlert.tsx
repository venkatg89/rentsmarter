import React from "react";
import { Alert } from "react-native";
import analytics from "@react-native-firebase/analytics";

const SavingsInfoAlert = () =>
  Alert.alert(
    "Monthly Savings",
    "\nThe amount of money you save each month, or want to save towards your financial goals.",
    [
      {
        text: "Ok, got it!",
        onPress: () => {
          analytics()
            .logEvent("Calcultr_MainPg_Savings_InfoBtn_Press", {
              id: 80000007,
              event: "Savings Info Alert",
              description: "display the savings alert",
            })
            .catch((err) => console.log(err));
        },
      },
    ]
  );

export default SavingsInfoAlert;
