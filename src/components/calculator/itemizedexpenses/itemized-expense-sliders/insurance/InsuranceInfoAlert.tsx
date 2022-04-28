
import {Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const InsuranceInfoAlert = () =>
  Alert.alert("Monthly Insurance",  
  "\nYour car insurance, health insurance, pet insurance, or other insurance payments.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_Insurance_InfoBtn_Press", {
        id: 92000004,
        event: "Insurance Info Alert",
        description: "display the insurance info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default InsuranceInfoAlert;
