
import {  Alert } from "react-native";

import analytics from '@react-native-firebase/analytics'

const ExpensesInfoAlert = () =>




  Alert.alert("Monthly Expenses",  
  "\nYour total financial obligations each month. These can include things such as food, utilities, insurance, and digital subscriptions.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("Calcultr_MainPg_Expenses_InfoBtn_Press", {
        id: 80000004,
        event: "Expenses Info Alert",
        description: "display the expenses info alert",
      })
      .catch((err) => console.log(err));



  } },
]);
export default ExpensesInfoAlert;
