 
import {   Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const OtherExpensesInfoAlert = () =>
  Alert.alert("Monthly Other Expenses",  
  "\nThese are considered \"miscellaneous\" expenses that don't fall into any of the provided itemized categories.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_OtherExp_InfoBtn_Press", {
        id: 92000007,
        event: "Other expenses Info Alert",
        description: "display the other expenses info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default OtherExpensesInfoAlert;
