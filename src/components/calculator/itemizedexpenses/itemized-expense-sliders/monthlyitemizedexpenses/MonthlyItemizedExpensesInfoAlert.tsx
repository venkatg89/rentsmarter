
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const MonthlyItemizedExpensesInfoAlert = () =>
  Alert.alert("Monthly Expenses",  
  "\nYour total financial obligations each month. These can include things such as food, utilities, insurance, and digital subscriptions.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_Slider_InfoBtn_Press", {
        id: 92000006,
        event: "MonthlyExpenses Info Alert",
        description: "display the monthly expenses info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default MonthlyItemizedExpensesInfoAlert;
